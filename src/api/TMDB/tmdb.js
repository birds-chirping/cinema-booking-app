import MDB_KEY from "./key.js";

class TMDB {
  static KEY = MDB_KEY;
  static genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  // static imageSizes = {
  //   backdrop_sizes: ["w300", "w780", "w1280", "original"],
  //   logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  //   poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
  //   profile_sizes: ["w45", "w185", "h632", "original"],
  //   still_sizes: ["w92", "w185", "w300", "original"],
  // };

  static async getMovieData(movieID) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.KEY}`);
    const movie = await response.json();
    return response.ok ? movie : movie.status_message;
  }

  static getPhotoPath(file_path, size = "w500") {
    return `https://image.tmdb.org/t/p/${size}${file_path}`;
  }

  static getGenreNameByGenreId(genre_id) {
    return TMDB.genres.find((item) => item.id == genre_id).name;
  }

  static getGenres(data) {
    const arr = [];
    data.forEach((genre) => arr.push(this.getGenreNameByGenreId(genre.id)));
    return arr;
  }
}

export default TMDB;
