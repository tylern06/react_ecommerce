import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
// NOTE: action get passed to every reducer
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
