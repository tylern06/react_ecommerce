import { createContext, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
});

const addCartItem = (cartItems, productToAdd) => {
  let existingItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingItem) {
    return cartItems.map((item) => {
      return item.id === existingItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  let existingItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (existingItem && existingItem.quantity === 1) {
    // return everything that is not equal to product id
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  if (existingItem) {
    console.log({ existingItem });
    return cartItems.map((item) => {
      return item.id === existingItem.id
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    });
  }
  return cartItems.filter((item) => item.id === productToRemove.id);
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
