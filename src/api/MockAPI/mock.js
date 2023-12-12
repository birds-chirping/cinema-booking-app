import MOCK_KEY from "./key.js";

class Mock {
  static KEY = MOCK_KEY;
  static BASE_URL = `https://${this.KEY}.mockapi.io/`;
  static MOVIES_URL = `${this.BASE_URL}movies`;

  static async getMovies() {
    const response = await fetch(this.MOVIES_URL);
    const movies = await response.json();
    return movies;
  }

  static async getMovie(id) {
    const response = await fetch(`${this.BASE_URL}movies/${id}`);
    const movie = await response.json();
    return movie;
  }

  static async getShowtimes() {
    const response = await fetch(`${this.BASE_URL}showtimes/1`);
    const theater = await response.json();
    return theater.showtimes;
  }

  static async getShowtimesByMovieID(id) {
    const response = await fetch(`${this.BASE_URL}showtimes/1`);
    const showtimes = await response.json();
    return showtimes.showtimes.filter((showtime) => showtime.movieID === id);
  }
}

export default Mock;
