export interface Movie {
  id: number;
  title: string;
  genre: string;
  language: string;
  showDate: string;
  showTimes: string | string[];
  price: number;
}
