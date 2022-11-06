import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../../components/button/button.component';
import './checkout.styles.scss';

function CheckOut() {
  const { cartItems, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  const decrement = (item) => () => {
    removeItemFromCart(item);
  };
  const increment = (item) => () => {
    addItemToCart(item);
  };
  return (
    <div>
      CheckOut
      <div>
        {cartItems.map((item) => {
          const { id, name, quantity } = item;
          return (
            <div key={id}>
              <h2>{name}</h2>
              <span>{quantity}</span>
              <Button
                buttonType={'inverted'}
                onClick={decrement(item)}
              >
                -
              </Button>
              <Button
                buttonType={'inverted'}
                onClick={increment(item)}
              >
                +
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CheckOut;
