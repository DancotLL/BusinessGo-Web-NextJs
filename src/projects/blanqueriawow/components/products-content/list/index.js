import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ProductItem from '../../product-item';
import { getProducts } from '../../../services/product';
import InfiniteScrollLastElement from '../../../../../components/InfiniteScrollLastElement';

import ProductsLoading from './loading';

const ProductsContent = props => {
  const selectedCategories = useSelector(store => store.filters.categories);
  const project = useSelector(store => store.project);
  const queryParams = useSelector(store => store.queryParams);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [counter, setCounter] = useState(0);
  const search = selectedCategories.length ? '' : queryParams.search;
  const searchRef = useRef();
  searchRef.current = search;

  useEffect(() => {
    setLoading(true);
    if (!project) return;
    const currentSearch = search;

    getProducts(project, props.pageSize, pageNumber, { category: selectedCategories }, search).then(
      ({ data: newProducts }) => {
        if (searchRef.current !== currentSearch) return;
        setProducts([...products, ...newProducts]);
        setLoading(false);
      }
    );
  }, [queryParams, pageNumber, counter, project]);

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
        {!loading && !products.length && queryParams.search && (
          <div>
            No encontramos productos para la búsqueda <b>{queryParams.search}</b>
          </div>
        )}
        {!!products.length && (
          <InfiniteScrollLastElement onPageNumberChange={handleChangePageNumber}>
            {products.map((product, i) => (
              <ProductItem key={i} product={product} />
            ))}
          </InfiniteScrollLastElement>
        )}
      </section>
      {loading && <ProductsLoading />}
    </>
  );
};

ProductsContent.propTypes = {
  pageSize: PropTypes.number.isRequired
};

export default ProductsContent;
