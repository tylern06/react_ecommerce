import { useSelector, useDispatch } from 'react-redux';
import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../../store/cart/cart.action';
import './checkout-item.styles.scss';
import { selectCartItems } from '../../store/cart/cart.selector';
function CheckoutItem({ cartItem }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price, quantity } = cartItem;
  // const {
  //   cartItems,
  //   setCartItems,
  //   addItemToCart,
  //   removeItemFromCart,
  // } = useContext(CartContext);

  const decrement = (item) => () => {
    dispatch(removeItemFromCart(cartItems, item));
  };
  const increment = (item) => () => {
    dispatch(addItemToCart(cartItems, item));
  };

  const removeItem = (item) => () => {
    dispatch(clearItemFromCart(cartItems, item));
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
