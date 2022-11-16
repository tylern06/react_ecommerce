import React, { useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartReducer } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import Button from '../button/button.component';
import './product-card.styles.scss';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCartReducer);

  const { name, price, imageUrl } = product;
  const addProductToCart = useCallback(
    () => dispatch(addItemToCart(cartItems, product)),
    [cartItems, product, dispatch]
  );

  return (
    <div className="product-card-container">
      <img alt={`${name}`} src={imageUrl} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to card
      </Button>
    </div>
  );
}

export default ProductCard;
