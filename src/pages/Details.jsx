import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Mock from "../api/MockAPI/mock.js";
import TMDB from "../api/TMDB/tmdb.js";

const Details = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await Mock.getMovie(movieId);
      setMovie(response);
    };

    fetchMovie();
  }, []);

  return movie ? (
    <div>
      <Link to="../">Back home</Link>
      <div className="details-movie">
        <img className="details-movie-poster" src={TMDB.getPhotoPath(movie.poster_path, "w500")} />
        <div className="details-movie-title">{movie.title}</div>
        <div className="details-genre">
          Genre: {movie.genre_ids.map((id) => TMDB.getGenreNameByGenreId(id)).join(", ")}
        </div>
        <div className="details-description">{movie.description}</div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Details;
