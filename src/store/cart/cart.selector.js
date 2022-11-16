import { createSelector } from 'reselect';

export const selectCartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSlice) => {
    return cartSlice.isCartOpen;
  }
);
