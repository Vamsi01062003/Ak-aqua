
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "ak-aqua-cart";

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // The cart can still work for the current session.
    }
  }, [items]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || product.id == null) return;

    const amount = Math.max(1, Math.floor(Number(quantity) || 1));
    const id = String(product.id);
    const name = String(product.name || product.title || "Product");
    const price = Number(product.price) || 0;
    const image = product.image_url || product.image || "";

    setItems((current) => {
      const existing = current.find((item) => item.id === id);

      if (existing) {
        return current.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      }

      return [
        ...current,
        { id, name, price, image, quantity: amount },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    const id = String(productId);
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    const id = String(productId);
    const amount = Math.floor(Number(quantity));

    if (!Number.isFinite(amount) || amount < 1) {
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: amount } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      itemCount,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
