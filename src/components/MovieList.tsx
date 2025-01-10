'use client';

import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid, Container, CircularProgress } from '@mui/material';
import { movieStore } from '../stores/movieStore';
import { MovieCard } from './MovieCard';
import { SearchBar } from './SearchBar';

export const MovieList = observer(() => {
  useEffect(() => {
    if (!movieStore.movies.length) {
      movieStore.fetchRandomMovies();
    }
  }, []);

  return (
    <Container>
      <SearchBar />
      {movieStore.loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {movieStore.movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
});
