import { makeAutoObservable } from 'mobx';
import { Movie } from '../types/movie';

class FavoriteStore {
  favorites: Movie[] = [];

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== 'undefined') {
      this.loadFavorites();
    }
  }

  loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favorites = JSON.parse(saved);
    }
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  toggleFavorite(movie: Movie) {
    const index = this.favorites.findIndex(f => f.imdbID === movie.imdbID);
    if (index === -1) {
      this.favorites.push(movie);
    } else {
      this.favorites.splice(index, 1);
    }
    this.saveFavorites();
  }

  isFavorite(id: string) {
    return this.favorites.some(f => f.imdbID === id);
  }
}

export const favoriteStore = new FavoriteStore();

