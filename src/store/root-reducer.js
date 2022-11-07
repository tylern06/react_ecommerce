import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';

// NOTE: action get passed to every reducer
export const rootReducer = combineReducers({
  user: userReducer,
});
