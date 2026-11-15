import { useState, useMemo, useCallback } from "react";

function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === product.id);

      if (index !== -1) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, quantity),
            }
          : item,
      ),
    );
  }, []);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  };
}

export default useCart;
