import { createSelector } from 'reselect';

export const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => {
    return cartSlice.cartItems;
  }
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSlice) => {
    return cartSlice.isCartOpen;
  }
);
