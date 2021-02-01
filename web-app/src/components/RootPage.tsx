import React from 'react';
import { Box, Container } from '@material-ui/core';

export interface PageProps {
  children: JSX.Element[];
}

const RootPage: React.FC<PageProps> = ({ children }) => {
  return (
    <Box>
      <Container component="main" maxWidth="lg" style={{ maxHeight: '100vh', overflow: 'scroll' }}>
        {children}
      </Container>
    </Box>
  );
};

export default RootPage;
