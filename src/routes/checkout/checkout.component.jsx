import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.styles.scss';

function CheckOut() {
  const cartItems = useSelector(selectCartItems);
  console.log('cart items in checkout', cartItems);
  // const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((total, currentItem) => {
    return total + currentItem.quantity;
  }, 0);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((item) => {
        return <CheckoutItem key={item.id} cartItem={item} />;
      })}

      <span className="total">Total: {totalQuantity}</span>
    </div>
  );
}

export default CheckOut;
