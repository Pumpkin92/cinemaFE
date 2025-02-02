import { Movie } from './movie.models';

export interface Cinema {
  id: number;
  name: string;
  location: string;
  movies: Movie[];
}
