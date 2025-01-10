'use client'

import { observer } from 'mobx-react-lite';
import { TextField, Box } from '@mui/material';
import { movieStore } from '../stores/movieStore';
import { useCallback } from 'react';
import debounce from 'lodash/debounce';

export const SearchBar = observer(() => {
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value) {
        movieStore.searchMovies(value);
      }
    }, 500),
    []
  );

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Search movies"
        variant="outlined"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </Box>
  );
});

