import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { theme } from 'themes/default';

export interface PageProps {
  children: JSX.Element[];
}

const RootPage: React.FC<PageProps> = ({ children }) => {
  return (
    <Box>
      <Box style={{ position: 'absolute', top: theme.spacing(4), left: theme.spacing(4) }}>
        <Typography align="center" component="h1" variant="h5">
          NeverLand
        </Typography>
      </Box>
      <Container component="main" maxWidth="lg" style={{ maxHeight: '100vh', overflow: 'scroll' }}>
        {children}
      </Container>
    </Box>
  );
};

export default RootPage;
