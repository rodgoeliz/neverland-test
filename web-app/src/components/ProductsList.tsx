import React, { useCallback, useEffect } from 'react';

import { Box } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, nextPage, previousPage } from 'redux/ProductSlice';
import { RootState } from 'redux/Store';
import { LoadingStates } from 'types/global';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();

  const { products, loading, error, pageSize, currentPage, isLastPage } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ pageNo: currentPage, pageSize, isNextPage: false }));
  }, []);

  const loadMoreItems = useCallback(
    (event: React.UIEvent<HTMLElement>) => {
      const element = event.target as HTMLElement;
      if (loading !== LoadingStates.IDLE) return;

      if ((element.scrollHeight - element.scrollTop) / element.clientHeight < 1 && !isLastPage) {
        dispatch(nextPage());
        dispatch(fetchProducts({ pageNo: currentPage + 1, pageSize, isNextPage: true }));
      }
      if (products.length > 0 && element.scrollTop === 0 && currentPage > 1) {
        dispatch(previousPage());
        dispatch(fetchProducts({ pageNo: currentPage - 1, pageSize, isNextPage: false }));
      }
    },
    [currentPage, pageSize, loading]
  );

  if (loading === LoadingStates.FAILED || error) return <div>Error..</div>;

  return (
    <Box>
      <Box
        onScroll={loadMoreItems}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          height: '63rem',
          overflowY: 'scroll',
          paddingTop: '1rem',
        }}
      >
        {products.map(({ price, plant, _id }) => (
          <ProductCard
            key={`product-card${_id}`}
            price={price}
            plant={{
              title: plant.title,
              subtitle: plant.subtitle,
              imageURL: plant.imageURLs[0],
              difficulty: plant.difficulty[0],
              petToxicity: plant.petToxicity,
              light: plant.light[0],
            }}
          />
        ))}
      </Box>
      {loading === LoadingStates.PENDING && <div>Loading..</div>}
    </Box>
  );
};

export default ProductList;
