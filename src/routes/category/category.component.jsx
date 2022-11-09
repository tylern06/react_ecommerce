import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import './category.styles.scss';

function Category() {
  console.log('render category');
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  console.log({ category, categoriesMap });
  const [products, setProducts] = useState([]);
  console.log({ products });
  useEffect(() => {
    if (categoriesMap) {
      setProducts(categoriesMap[category]);
    }
  }, [category, categoriesMap]);
  return (
    <div className="category-container">
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}

export default Category;
