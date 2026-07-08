'use client';

import { useEffect, useRef, useCallback } from 'react';
import {
  DocumentReference,
  CollectionReference,
  Query,
  onSnapshot,
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot,
  setDoc,
} from 'firebase/firestore';

// ─── Listener Hook ────────────────────────────────────────────────────────────

export function useFirestoreListener(
  ref: DocumentReference<DocumentData> | CollectionReference<DocumentData> | Query<DocumentData> | null | undefined,
  callback: (snapshot: any) => void,
  onError?: (error: Error) => void
): void {
  useEffect(() => {
    if (!ref) return;

    const unsubscribe = onSnapshot(
      ref as any,
      callback,
      (error) => {
        console.error('Firestore listener error:', error);
        onError?.(error);
      }
    );

    return () => unsubscribe();
  }, [ref]); // eslint-disable-line react-hooks/exhaustive-deps
}

// ─── Debounced Write Hook ─────────────────────────────────────────────────────

export function useDebouncedFirestoreWrite() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const write = useCallback(
    (
      ref: DocumentReference,
      data: Record<string, unknown>,
      delayMs = 500,
      merge = true
    ) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(async () => {
        try {
          await setDoc(ref, data, { merge });
        } catch (err) {
          console.error('Debounced Firestore write failed:', err);
        }
      }, delayMs);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return write;
}
