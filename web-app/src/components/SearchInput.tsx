import { Box, Button, InputAdornment, styled, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import React from 'react';
import { theme } from 'themes/default';

const StyledTextField = styled(TextField)({
  border: 'none',
  background: '#EFE6D8',

  '& .MuiFilledInput-underline:before': {
    border: 'none',
  },
  '& .MuiFilledInput-underline:after': {
    border: 'none',
  },
  '& .MuiFilledInput-root:hover': {
    border: 'none',
  },
});

const SearchInput: React.FC = () => {
  return (
    <Box style={{ padding: theme.spacing(1) }}>
      <StyledTextField
        size="small"
        id="input-with-icon-textfield"
        label="Search products..."
        variant="filled"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="outlined"
        style={{ marginLeft: theme.spacing(2), borderRadius: '14px', height: theme.spacing(5) }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchInput;
