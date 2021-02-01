import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { Routes } from './Routes';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/Store';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from 'themes/default';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Switch>
            <Routes />
          </Switch>
        </BrowserRouter>
      </ReduxProvider>
    </ThemeProvider>
  );
};
