import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';
function CheckoutItem({ cartItem }) {
  const { name, imageUrl, price, quantity } = cartItem;
  const {
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
  } = useContext(CartContext);
  const decrement = (item) => () => {
    removeItemFromCart(item);
  };
  const increment = (item) => () => {
    addItemToCart(item);
  };

  const removeItem = (item) => () => {
    const removedItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(removedItems);
  };
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <button className="arrow" onClick={decrement(cartItem)}>
          &#10094;
        </button>
        <span className="value">{quantity}</span>
        <button className="arrow" onClick={increment(cartItem)}>
          &#10095;
        </button>
      </span>
      <span className="price">{price}</span>
      <button
        className="remove-button"
        onClick={removeItem(cartItem)}
      >
        &#10005;
      </button>
    </div>
  );
}

export default CheckoutItem;
