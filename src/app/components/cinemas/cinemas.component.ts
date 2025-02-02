import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cinema } from '../../models/cinema.model';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrl: './cinemas.component.css',
})
export class CinemasComponent implements OnInit {
  cinemas: Cinema[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Cinema[]>('http://localhost:8080/cinemas').subscribe({
      next: (data) => {
        this.cinemas = data;
      },
      error: (err) => {
        console.error('Error fetching cinemas:', err);
      },
    });
  }
}
