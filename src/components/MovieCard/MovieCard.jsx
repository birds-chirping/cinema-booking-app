import React from "react";
import TMDB from "../../api/TMDB/tmdb";
import "./style.css";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div
        className="poster-wrapper"
        style={{
          backgroundImage: `url(${TMDB.getPhotoPath(movie.poster_path, "w342")})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <img className="movie-poster" src={TMDB.getPhotoPath(movie.poster_path, "w342")} /> */}
      </div>
      <div className="movie-card-details">
        <div className="movie-title">{movie.title}</div>
        <div className="genre">Genre: {movie.genres.split(",").join(", ")}</div>
        <Link className="details-link" to={`/details/${movie.id}`}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
