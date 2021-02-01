import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import ProductsPage from 'pages/ProductsPage';

const PATHS = {
  products: '/products',
};

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={PATHS.products} component={ProductsPage} />
      <Redirect to={PATHS.products} />
    </Switch>
  );
};
