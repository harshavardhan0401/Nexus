
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { doc, onSnapshot, updateDoc, setDoc, deleteDoc, collection, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { updateDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isSyncing: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const db = useFirestore();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Debounce timers for Firestore quantity updates
  const debounceTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Cleanup debounce timers on unmount
  useEffect(() => {
    const timers = debounceTimers.current;
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  // Sync with Firestore if logged in
  useEffect(() => {
    if (!user || !db) {
      // Load from localStorage for anonymous users
      const localCart = localStorage.getItem('neo-step-cart');
      if (localCart) {
        try {
          setCart(JSON.parse(localCart));
        } catch (e) {
          console.error("Failed to parse local cart", e);
        }
      }
      return;
    }

    setIsSyncing(true);
    const itemsRef = collection(db, 'users', user.uid, 'cart', 'active', 'items');

    const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
      const remoteItems = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as CartItem[];
      setCart(remoteItems);
      setIsSyncing(false);
    });

    return () => unsubscribe();
  }, [user, db]);

  // Merge local cart to Firestore on login
  useEffect(() => {
    if (user && db) {
      const localCart = localStorage.getItem('neo-step-cart');
      if (localCart) {
        const parsed = JSON.parse(localCart) as CartItem[];
        const batch = writeBatch(db);
        parsed.forEach(item => {
          const itemRef = doc(db, 'users', user.uid, 'cart', 'active', 'items', item.id);
          batch.set(itemRef, item, { merge: true });
        });
        batch.commit().then(() => {
          localStorage.removeItem('neo-step-cart');
        });
      }
    }
  }, [user, db]);

  // Persist to localStorage for anonymous
  useEffect(() => {
    if (!user) {
      localStorage.setItem('neo-step-cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    const existingItem = cart.find((i) => i.id === item.id);
    const newQuantity = existingItem ? existingItem.quantity + 1 : 1;
    const newItem = { ...item, quantity: newQuantity };

    if (user && db) {
      const itemRef = doc(db, 'users', user.uid, 'cart', 'active', 'items', item.id);
      setDocumentNonBlocking(itemRef, newItem, { merge: true });
    } else {
      setCart(prev => existingItem 
        ? prev.map(i => i.id === item.id ? newItem : i)
        : [...prev, newItem]
      );
    }
  }, [cart, user, db]);

  const removeFromCart = useCallback((id: string) => {
    // Clear any pending debounced update for this item
    const existing = debounceTimers.current.get(id);
    if (existing) {
      clearTimeout(existing);
      debounceTimers.current.delete(id);
    }

    if (user && db) {
      const itemRef = doc(db, 'users', user.uid, 'cart', 'active', 'items', id);
      deleteDoc(itemRef);
    } else {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }
  }, [user, db]);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    // Always update local state immediately for responsive UI
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

    // Debounce Firestore writes for rapid quantity changes
    if (user && db) {
      const existing = debounceTimers.current.get(id);
      if (existing) {
        clearTimeout(existing);
      }

      const timer = setTimeout(() => {
        const itemRef = doc(db, 'users', user.uid, 'cart', 'active', 'items', id);
        updateDocumentNonBlocking(itemRef, { quantity });
        debounceTimers.current.delete(id);
      }, 300);

      debounceTimers.current.set(id, timer);
    }
  }, [user, db, removeFromCart]);

  const clearCart = useCallback(async () => {
    // Clear all pending debounce timers
    debounceTimers.current.forEach(timer => clearTimeout(timer));
    debounceTimers.current.clear();

    if (user && db) {
      const itemsRef = collection(db, 'users', user.uid, 'cart', 'active', 'items');
      const snapshot = await getDocs(itemsRef);
      const batch = writeBatch(db);
      snapshot.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    } else {
      setCart([]);
    }
  }, [user, db]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isSyncing
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
