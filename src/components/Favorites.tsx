'use client'

import { observer } from 'mobx-react-lite';
import { Grid, Container, Typography } from '@mui/material';
import { favoriteStore } from '../stores/favoriteStore';
import { MovieCard } from './MovieCard';

export const Favorites = observer(() => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>Favorite Movies</Typography>
      {favoriteStore.favorites.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No favorite movies yet. Add some movies to your favorites!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favoriteStore.favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
});

