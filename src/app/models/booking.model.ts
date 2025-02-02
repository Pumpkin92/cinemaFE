import { Cinema } from './cinema.model';

export interface Booking {
  id: number;
  movie: { title: string };
  cinema: Cinema;
  showTime: string;
  numberOfTickets: number;
  totalPrice: number;
}
