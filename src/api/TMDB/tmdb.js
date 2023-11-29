import MDB_KEY from "./key.js";

class TMDB {
  static KEY = MDB_KEY;
  static BASE_URL = "https://image.tmdb.org/t/p/";
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

  static getPhotoPath(file_path, size = "w500") {
    return `${this.BASE_URL}${size}${file_path}`;
  }

  static getGenreNameByGenreId(genre_id) {
    return TMDB.genres.find((item) => item.id == genre_id).name;
  }
}

export default TMDB;
