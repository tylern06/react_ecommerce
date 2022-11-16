import React, { useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import {
  selectCartItems,
  selectIsCartOpen,
} from '../../store/cart/cart.selector';

import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
// import { CartContext } from '../../contexts/cart.context';

function CardIcon() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleIsCartOpen = () => {
    // setIsCartOpen(!isCartOpen);
    console.log('toggle', isCartOpen);
    dispatch(setIsCartOpen(!isCartOpen));
  };

  // memoize quantity count to prevent recompute when cart dropdown is open
  const itemCount = useMemo(
    () =>
      cartItems.reduce((total, currentItem) => {
        return total + currentItem.quantity;
      }, 0),
    [cartItems]
  );

  // const itemCount = cartItems.reduce((total, currentItem) => {
  //   console.log('compute', total);
  //   return total + currentItem.quantity;
  // }, 0);
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
}

export default CardIcon;
