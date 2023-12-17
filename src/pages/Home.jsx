import React, { useEffect, useState } from "react";
import Mock from "../api/MockAPI/mock.js";
import MovieCard from "../components/MovieCard/MovieCard.jsx";
import "./home.css";

const Home = () => {
  const [data, setData] = useState({
    movies: [],
    showtimes: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const movies = await Mock.getMovies();
      const showtimes = await Mock.getShowtimes();
      if (typeof movies !== "string" && typeof showtimes !== "string") {
        setData({ movies: movies, showtimes: showtimes });
      }
    };
    fetchData();
  }, []);

  return data.movies.length > 0 ? (
    <div className="home-wrapper">
      <div className="home-content-wrapper">
        <div className="home-banner">BANNER</div>
        <div className="movies">
          {data.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showtimes={data.showtimes} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Home;
