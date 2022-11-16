import { createSelector } from 'reselect';

export const selectCategoriesReducer = (state) => state.categories;

// Note: memomizes the selectorCategory dependent on the categories array
export const selectCategories = createSelector(
  [selectCategoriesReducer], // first input parammeter, outputs to the second parameter.
  (categoriesSlice) => {
    console.log('selector for categories');
    return categoriesSlice.categories;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log('selector for categories map');
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
