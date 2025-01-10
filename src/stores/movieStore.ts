import { makeAutoObservable, runInAction } from 'mobx';
import { Movie, MovieDetails, SearchResponse } from '../types/movie';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com';

class MovieStore {
    movies: Movie[] = [];
    loading = false;
    searchQuery = '';
    currentMovie: MovieDetails | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async searchMovies(query: string) {
        if (!API_KEY) {
            console.error('NEXT_PUBLIC_OMDB_API_KEY is not set');
            return;
        }
        this.loading = true;
        this.searchQuery = query;

        try {
            const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${query}`);
            const data: SearchResponse = await response.json();

            runInAction(() => {
                this.movies = data.Search || [];
            });
        } catch (error) {
            console.error('Error searching movies:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async fetchMovieDetails(id: string) {
        this.loading = true;

        try {
            const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`);
            const details: MovieDetails = await response.json();

            runInAction(() => {
                this.currentMovie = details;
            });
        } catch (error) {
            console.error('Error fetching movie details:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async fetchRandomMovies() {
        this.loading = true;
        try {
            const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=star wars`);
            const data: SearchResponse = await response.json();
            runInAction(() => {
                this.movies = data.Search || [];
            });
        } catch (error) {
            console.error('Error fetching random movies:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}

export const movieStore = new MovieStore();
