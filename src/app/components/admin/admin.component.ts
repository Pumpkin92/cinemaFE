import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  isAdmin: boolean = false;
  newCinema = { name: '', location: '' };
  newMovie = {
    title: '',
    genre: '',
    language: '',
    showDate: '',
    showTimes: '',
    price: 0,
    cinemaId: null,
  };
  cinemas: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || user.role !== 'ADMIN') {
      alert('Access denied. Admins only.');
      this.router.navigate(['/movies']);
      return;
    }
    this.isAdmin = true;

    this.http.get<any[]>('http://localhost:8080/cinemas').subscribe({
      next: (data) => (this.cinemas = data),
      error: () => alert('Failed to load cinemas'),
    });
  }

  addCinema() {
    this.http
      .post('http://localhost:8080/cinemas/admin', this.newCinema)
      .subscribe({
        next: () => {
          alert('Cinema added successfully!');
          this.newCinema = { name: '', location: '' };
        },
        error: () => alert('Failed to add cinema'),
      });
  }

  addMovie() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || user.role !== 'ADMIN') {
      alert('Access denied.');
      return;
    }

    if (!this.newMovie.cinemaId) {
      alert('Please select a cinema for the movie.');
      return;
    }

    this.http
      .post(
        `http://localhost:8080/movies/admin?cinemaId=${this.newMovie.cinemaId}`,
        this.newMovie
      )
      .subscribe({
        next: () => {
          alert('Movie added successfully!');
          this.newMovie = {
            title: '',
            genre: '',
            language: '',
            showDate: '',
            showTimes: '',
            price: 0,
            cinemaId: null,
          };
        },
        error: (err) => {
          alert('Failed to add movie');
        },
      });
  }
}
