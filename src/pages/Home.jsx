import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Details from "./Details.jsx";
import TMDB from "../api/TMDB/tmdb.js";
import Mock from "../api/MockAPI/mock.js";
import MovieCard from "../components/Movies/MovieCard.jsx";
import "./style.css";

const Home = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await Mock.getMovies();
      setMovies(response);
    };

    fetchMovies();
  }, []);

  // console.log(movies);

  return movies ? (
    <div className="movies">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Home;
