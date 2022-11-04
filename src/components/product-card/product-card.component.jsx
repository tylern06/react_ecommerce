import React, { useContext, useCallback } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import './product-card.styles.scss';

function ProductCard({ product }) {
  const { addItemToCart } = useContext(CartContext);
  const { name, price, imageUrl } = product;
  const addProductToCart = useCallback(
    () => addItemToCart(product),
    [product, addItemToCart]
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
