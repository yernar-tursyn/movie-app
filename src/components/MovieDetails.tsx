'use client';

import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'next/navigation';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { movieStore } from '../stores/movieStore';

export const MovieDetails = observer(() => {
    const params = useParams();
    const id = params.id as string;
    const [videoTime, setVideoTime] = useState(0);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        if (id) {
            movieStore.fetchMovieDetails(id);
            const savedTime = localStorage.getItem(`video-time-${id}`);
            if (savedTime) {
                setVideoTime(parseInt(savedTime, 10));
            }
        }
    }, [id]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current) {
                const currentTime = Math.floor(playerRef.current.getCurrentTime());
                localStorage.setItem(`video-time-${id}`, currentTime.toString());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [id]);

    if (movieStore.loading) return <CircularProgress />;
    if (!movieStore.currentMovie) return null;

    const movie = movieStore.currentMovie;

    return (
        <Container>
            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
                    alt={movie.Title}
                    style={{ maxWidth: 300 }}
                />
                <Box>
                    <Typography variant="h4" gutterBottom>{movie.Title}</Typography>
                    <Typography variant="body1" paragraph>{movie.Plot}</Typography>
                    <Typography><strong>Director:</strong> {movie.Director}</Typography>
                    <Typography><strong>Genre:</strong> {movie.Genre}</Typography>
                    <Typography><strong>Runtime:</strong> {movie.Runtime}</Typography>
                    <Typography><strong>Rating:</strong> {movie.imdbRating}</Typography>
                    <Typography><strong>Actors:</strong> {movie.Actors}</Typography>
                </Box>
            </Box>
            <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden', paddingTop: '56.25%' }}>
                <iframe
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                    src={`https://www.youtube.com/embed/dQw4w9WgXcQ?start=${videoTime}&autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </Box>
        </Container>
    );
});

