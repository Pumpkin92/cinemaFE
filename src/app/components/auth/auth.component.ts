import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  username: string = '';
  password: string = '';

  isLoginMode = true;

  constructor(private http: HttpClient, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  authenticate() {
    const url = this.isLoginMode
      ? 'http://localhost:8080/auth/login'
      : 'http://localhost:8080/auth/register';

    const userPayload = {
      username: this.username,
      password: this.password,
      ...(this.isLoginMode ? {} : { role: 'USER' }),
    };

    this.http.post<User>(url, userPayload).subscribe({
      next: (response: User) => {
        if (this.isLoginMode) {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/movies']);
        } else {
          alert('Registration successful! Please log in.');
          this.isLoginMode = true;
        }
      },
      error: (err) => {
        alert(
          this.isLoginMode
            ? 'Invalid username or password'
            : 'Username already exists'
        );
      },
    });
  }
}
