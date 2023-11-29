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

  static async getRoom() {
    const response = await fetch(`${this.BASE_URL}room`);
    const room = await response.json();
    return room;
  }
}

export default Mock;
