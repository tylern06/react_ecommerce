import { takeLatest, all, call, put } from 'redux-saga/effects';
import { CATEGORIES_ACTION_TYPES } from './category.types';
import {
  fetchCategoriesSuccess,
  fetchCategoriesFail,
} from './category.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

// fetch categories saga
export function* fetchCategoriesAsync() {
  try {
    // replace async/await with yield in generator fn
    // pass in function and parameters to call method
    const categories = yield call(
      getCategoriesAndDocuments,
      'categories'
    );
    // dispatch(fetchCategoriesSuccess(categories));
    // replace dispatch with put
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    // dispatch(fetchCategoriesFail(error));
    yield put(fetchCategoriesFail(error));
  }
}

// listen to fetch category start action in category saga
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // All container array of generators function. Wait until all function in array are done before moving on
  yield all([call(onFetchCategories)]);
}
