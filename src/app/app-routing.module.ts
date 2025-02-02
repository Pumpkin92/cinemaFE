import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { AuthComponent } from './components/auth/auth.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { CinemasComponent } from './components/cinemas/cinemas.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'cinemas', component: CinemasComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: '', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
