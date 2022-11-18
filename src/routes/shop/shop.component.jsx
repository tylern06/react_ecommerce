import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import {
  fetchCategoriesAsync,
  fetchCategoriesStart,
} from '../../store/categories/category.action';

import Category from '../category/category.component';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import './shop.styles.scss';

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchCategoriesAsync());
    // replace thunk with saga by dispatching fetchCategoryStart (initial action for fetching data)
    dispatch(fetchCategoriesStart());
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
