import React from "react";
import TMDB from "../../api/TMDB/tmdb";
import "./style.css";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="poster-wrapper" style={{ backgroundColor: !movie.poster_path && `rgb(232, 232, 232)` }}>
        <img className="movie-poster" src={TMDB.getPhotoPath(movie.poster_path, "w185")} />
      </div>
      <div className="movie-card-details">
        <div className="movie-title">{movie.title}</div>
        <div className="genre">Genre: {movie.genres.split(",").join(", ")}</div>
        <Link to={`/details/${movie.id}`}>Details</Link>
      </div>
    </div>
  );
};

export default MovieCard;
