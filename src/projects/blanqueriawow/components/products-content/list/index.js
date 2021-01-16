import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ProductItem from '../../product-item';
import { getProducts } from '../../../services/product';
import InfiniteScrollLastElement from '../../../../../components/InfiniteScrollLastElement';

import ProductsLoading from './loading';

const ProductsContent = props => {
  const selectedCategories = useSelector(store => store.filters.categories);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setLoading(true);
    getProducts(props.pageSize, pageNumber, { category: selectedCategories }).then(
      ({ data: newProducts }) => {
        setProducts([...products, ...newProducts]);
        setLoading(false);
      }
    );
  }, [pageNumber, counter]);

  useEffect(() => {
    setLoading(true);
    setProducts([]);
    setPageNumber(1);
    setCounter(counter + 1);
    window.scrollTo(0, 0);
  }, [selectedCategories]);

  const handleChangePageNumber = newPageNumber => {
    setPageNumber(newPageNumber);
  };

  return (
    <>
      <section className="products-list">
        <InfiniteScrollLastElement onPageNumberChange={handleChangePageNumber}>
          {products.map((product, i) => (
            <ProductItem key={i} product={product} />
          ))}
        </InfiniteScrollLastElement>
      </section>
      {loading && <ProductsLoading />}
    </>
  );
};

ProductsContent.propTypes = {
  pageSize: PropTypes.number.isRequired
};

export default ProductsContent;
