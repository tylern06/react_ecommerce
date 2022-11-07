import { createAction } from '../../utils/reducer/reducer.utils';
import { USER_ACTION_TYPES } from './user.types';
// define actual type and payload for action
export const setCurrentUser = (currentUser) => {
  return createAction(
    USER_ACTION_TYPES.SET_CURRENT_USER,
    currentUser
  );
};
