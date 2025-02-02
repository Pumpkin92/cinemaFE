import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../models/movie.models';
import { Cinema } from '../../models/cinema.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  movieId!: number;
  numberOfTickets: number = 1;
  selectedShowtime: string = '';
  totalPrice: number | null = null;
  selectedCinema: number | null = null;
  availableCinemas: Cinema[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));

    this.http
      .get<Movie>(`http://localhost:8080/movies/${this.movieId}`)
      .subscribe({
        next: (data) => {
          this.movie = data;

          this.http.get<Cinema[]>('http://localhost:8080/cinemas').subscribe({
            next: (cinemas) => {
              this.availableCinemas = cinemas.filter((cinema) =>
                cinema.movies.some((m) => m.id === this.movieId)
              );

              if (this.availableCinemas.length > 0) {
                this.selectedCinema = this.availableCinemas[0].id;
              }
            },
          });

          if (this.showTimesArray.length > 0) {
            this.selectedShowtime = this.showTimesArray[0];
          }
        },
        error: (err) => {
          console.error('Error fetching movie:', err);
          this.router.navigate(['/movies']);
        },
      });
  }

  get showTimesArray(): string[] {
    if (!this.movie || !this.movie.showTimes) {
      return [];
    }
    return Array.isArray(this.movie.showTimes)
      ? this.movie.showTimes
      : this.movie.showTimes.split(',').map((time) => time.trim());
  }

  buyTicket() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.id) {
      alert('You must be logged in to buy a ticket!');
      this.router.navigate(['/auth']);
      return;
    }

    if (!this.selectedShowtime) {
      alert('Please select a showtime!');
      return;
    }

    if (!this.selectedCinema) {
      alert('Please select a cinema!');
      return;
    }

    const bookingRequest = {
      tickets: this.numberOfTickets,
      showTime: this.selectedShowtime,
    };

    this.http
      .post(
        `http://localhost:8080/bookings/user/${user.id}/movie/${this.movieId}`,
        bookingRequest
      )
      .subscribe({
        next: (response: any) => {
          this.totalPrice = response.totalPrice;
          alert(
            ` ${this.numberOfTickets} ticket(s) booked for ${this.movie.title} at ${this.selectedShowtime}!\nTotal Price: £${this.totalPrice}\nPlease pay on arrival.`
          );
        },
        error: () => alert(' Ticket booking failed'),
      });
  }
}
