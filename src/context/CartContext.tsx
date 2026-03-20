
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
    const cartRef = doc(db, 'users', user.uid, 'cart', 'active');
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

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
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
  };

  const removeFromCart = (id: string) => {
    if (user && db) {
      const itemRef = doc(db, 'users', user.uid, 'cart', 'active', 'items', id);
      deleteDoc(itemRef);
    } else {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    const item = cart.find(i => i.id === id);
    if (!item) return;

    if (user && db) {
      const itemRef = doc(db, 'users', user.uid, 'cart', 'active', 'items', id);
      updateDocumentNonBlocking(itemRef, { quantity });
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = async () => {
    if (user && db) {
      const itemsRef = collection(db, 'users', user.uid, 'cart', 'active', 'items');
      const snapshot = await getDocs(itemsRef);
      const batch = writeBatch(db);
      snapshot.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    } else {
      setCart([]);
    }
  };

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
