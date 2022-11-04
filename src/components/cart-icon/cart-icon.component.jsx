import React, { useContext } from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';

function CardIcon() {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="cart-icon-container">
      <ShoppingIcon
        className="shopping-icon"
        onClick={toggleIsCartOpen}
      />
      <span className="item-count">0</span>
    </div>
  );
}

export default CardIcon;
