import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.id) {
      alert('You must be logged in to view your bookings!');
      this.router.navigate(['/auth']);
      return;
    }

    this.http
      .get<Booking[]>(`http://localhost:8080/bookings/user/${user.id}`)
      .subscribe({
        next: (data) => {
          this.bookings = data;
        },
        error: () => {
          alert('Failed to fetch bookings');
        },
      });
  }

  cancelBooking(bookingId: number) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    this.http.delete(`http://localhost:8080/bookings/${bookingId}`).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(
          (booking) => booking.id !== bookingId
        );
        alert('Booking canceled successfully.');
      },
      error: () => {
        alert('Failed to cancel booking.');
      },
    });
  }
}
