import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../models/movie.models';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  genres: string[] = [];
  languages: string[] = [];

  selectedGenre: string = '';
  selectedLanguage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Movie[]>('http://localhost:8080/movies').subscribe({
      next: (data) => {
        this.movies = data;
        this.filteredMovies = data;
        this.extractFilterOptions();
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      },
    });
  }

  extractFilterOptions() {
    this.genres = [...new Set(this.movies.map((movie) => movie.genre))];
    this.languages = [...new Set(this.movies.map((movie) => movie.language))];
  }

  applyFilters() {
    this.filteredMovies = this.movies.filter(
      (movie) =>
        (this.selectedGenre === '' || movie.genre === this.selectedGenre) &&
        (this.selectedLanguage === '' ||
          movie.language === this.selectedLanguage)
    );
  }
  getShowTimes(showTimes: string | string[]): string {
    return Array.isArray(showTimes) ? showTimes.join(', ') : '';
  }
}
