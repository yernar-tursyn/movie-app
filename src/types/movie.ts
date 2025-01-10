export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
  }
  
  export interface MovieDetails extends Movie {
    Plot: string;
    Director: string;
    Genre: string;
    Runtime: string;
    imdbRating: string;
    Actors: string;
  }
  
  export interface SearchResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
  }
  
  