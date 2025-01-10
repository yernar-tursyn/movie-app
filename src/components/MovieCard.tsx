'use client'

import { observer } from 'mobx-react-lite';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Movie } from '../types/movie';
import { favoriteStore } from '../stores/favoriteStore';
import Link from 'next/link';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = observer(({ movie }: MovieCardProps) => {
  const isFavorite = favoriteStore.isFavorite(movie.imdbID);

  return (
    <Card 
      sx={{ cursor: 'pointer' }}
      component={Link}
      href={`/movie/${movie.imdbID}`}
    >
      <CardMedia
        component="img"
        height="300"
        image={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
        alt={movie.Title}
      />
      <CardContent>
        <Typography variant="h6" noWrap>
          {movie.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.Year}
        </Typography>
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            favoriteStore.toggleFavorite(movie);
          }}
        >
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </CardContent>
    </Card>
  );
});

