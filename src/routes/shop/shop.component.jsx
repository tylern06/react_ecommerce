import { useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import './shop.styles.scss';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import ProductCard from '../../components/product-card/product-card.component';
export default function Shop() {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        return (
          <CategoryPreview
            key={title}
            title={title}
            products={categoriesMap[title]}
          />
        );
      })}
    </>
  );
}
