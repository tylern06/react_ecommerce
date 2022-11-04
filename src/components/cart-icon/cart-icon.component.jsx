import React, { useContext, useCallback } from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';

function CardIcon() {
  const { cartItems, isCartOpen, setIsCartOpen } =
    useContext(CartContext);

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  const itemCount = useCallback(() => {
    return cartItems.reduce((total, currentItem) => {
      return total + currentItem.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount()}</span>
    </div>
  );
}

export default CardIcon;
