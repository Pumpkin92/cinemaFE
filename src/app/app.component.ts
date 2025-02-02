import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cinema-frontend';

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getUsername(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.username || '';
  }
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return user.role === 'ADMIN';
  }
}
