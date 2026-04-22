import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartEntry } from "../types/models";
import { uuid } from "../utils/uuid";

const STORAGE_KEY = "cf-konfigurator-cart-v1";

interface CartContextValue {
  entries: CartEntry[];
  totalItems: number;
  totalQuantity: number;
  addEntry: (entry: Omit<CartEntry, "id" | "createdAt">) => void;
  updateEntry: (id: string, patch: Partial<Omit<CartEntry, "id">>) => void;
  removeEntry: (id: string) => void;
  clear: () => void;
  badgePulseKey: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadFromStorage(): CartEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as CartEntry[];
    return [];
  } catch {
    return [];
  }
}

function saveToStorage(entries: CartEntry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage voll oder blockiert – ignorieren
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CartEntry[]>(() => loadFromStorage());
  const [badgePulseKey, setBadgePulseKey] = useState(0);

  useEffect(() => {
    saveToStorage(entries);
  }, [entries]);

  const addEntry: CartContextValue["addEntry"] = useCallback((entry) => {
    setEntries((prev) => [
      ...prev,
      { ...entry, id: uuid(), createdAt: new Date().toISOString() },
    ]);
    setBadgePulseKey((k) => k + 1);
  }, []);

  const updateEntry: CartContextValue["updateEntry"] = useCallback((id, patch) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clear = useCallback(() => {
    setEntries([]);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      entries,
      totalItems: entries.length,
      totalQuantity: entries.reduce((sum, e) => sum + e.quantity, 0),
      addEntry,
      updateEntry,
      removeEntry,
      clear,
      badgePulseKey,
    }),
    [entries, addEntry, updateEntry, removeEntry, clear, badgePulseKey]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
