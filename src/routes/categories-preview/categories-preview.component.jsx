import { useSelector } from 'react-redux';
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';
import './categories-preview.styles.scss';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

export default function CategoriesPreview() {
  let isLoading = useSelector(selectCategoriesIsLoading);
  const categoriesMap = useSelector(selectCategoriesMap);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          return (
            <CategoryPreview
              key={title}
              title={title}
              products={categoriesMap[title]}
            />
          );
        })
      )}
    </>
  );
}
