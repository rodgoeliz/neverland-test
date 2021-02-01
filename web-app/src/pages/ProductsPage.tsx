import React from 'react';

import ProductsList from 'components/ProductsList';
import RootPage from 'components/RootPage';
import SearchInput from 'components/SearchInput';
import { Container, Toolbar } from '@material-ui/core';
import { theme } from 'themes/default';

const ProductsPage: React.FC = () => {
  return (
    <RootPage>
      <Toolbar style={{ padding: 0 }}>
        <Container
          maxWidth="lg"
          style={{
            margin: 'auto',
            top: 0,
            width: '100%',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <SearchInput />
        </Container>
      </Toolbar>

      <ProductsList />
    </RootPage>
  );
};

export default ProductsPage;
