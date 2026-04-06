import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { CartItem, CartState } from '@/types';

// Composite key for cart items: same product + different size = different cart line
function cartKey(productId: string, variantId: string | null): string {
  return variantId ? `${productId}:${variantId}` : productId;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantId: string | null } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; variantId: string | null; quantity: number } }
  | { type: 'CLEAR' };

interface CartContextValue extends CartState {
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string | null) => void;
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'sparkling-bear-cart';

function loadCart(): CartState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as CartState;
      // Backward compatibility: add variantId and size if missing
      const items = parsed.items.map((item) => ({
        ...item,
        variantId: item.variantId ?? null,
        size: item.size ?? null,
      }));
      return { items };
    }
  } catch {}
  return { items: [] };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = cartKey(action.payload.productId, action.payload.variantId);
      const existing = state.items.find(
        (i) => cartKey(i.productId, i.variantId) === key
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            cartKey(i.productId, i.variantId) === key
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM': {
      const key = cartKey(action.payload.productId, action.payload.variantId);
      return { items: state.items.filter((i) => cartKey(i.productId, i.variantId) !== key) };
    }
    case 'UPDATE_QUANTITY': {
      const key = cartKey(action.payload.productId, action.payload.variantId);
      if (action.payload.quantity <= 0) {
        return { items: state.items.filter((i) => cartKey(i.productId, i.variantId) !== key) };
      }
      return {
        items: state.items.map((i) =>
          cartKey(i.productId, i.variantId) === key ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value: CartContextValue = {
    ...state,
    itemCount,
    subtotal,
    addItem: (item, quantity = 1) =>
      dispatch({ type: 'ADD_ITEM', payload: { ...item, variantId: item.variantId ?? null, size: item.size ?? null, quantity } }),
    removeItem: (productId, variantId = null) =>
      dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId: variantId ?? null } }),
    updateQuantity: (productId, variantId, quantity) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, variantId, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
