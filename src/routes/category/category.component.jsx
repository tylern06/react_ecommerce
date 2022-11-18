import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

import Spinner from '../../components/spinner/spinner.component';
import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';

function Category() {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);
  let isLoading = useSelector(selectCategoriesIsLoading);

  useEffect(() => {
    if (categoriesMap) {
      setProducts(categoriesMap[category]);
    }
  }, [category, categoriesMap]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  );
}

export default Category;
