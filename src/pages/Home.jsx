import React, { useEffect, useState } from "react";
import Mock from "../api/MockAPI/mock.js";
import MovieCard from "../components/MovieCard/MovieCard.jsx";
import "./home.css";
import bg from "../assets/img/banner.png";

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
        const scheduledMovies = getScheduledMovies(movies, showtimes);
        // console.log(scheduledMovies);
        setData({ movies: scheduledMovies, showtimes: showtimes });
      }
    };
    fetchData();
  }, []);

  const getScheduledMovies = (movies, showtimes) => {
    const scheduledMovies = new Set();
    showtimes.forEach((showtime) => {
      if (showtime.movieID) scheduledMovies.add(movies.find((movie) => movie.id == showtime.movieID));
    });
    return [...scheduledMovies];
  };

  return data.movies.length > 0 ? (
    <div className="home-wrapper">
      <div className="home-content-wrapper">
        <div className="home-banner">
          <img src={bg} alt="" />
        </div>
        <div className="showing-now header">
          <div className="title">SHOWING NOW</div>
          <div className="line"></div>
        </div>
        <div className="movies">
          {data.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showtimes={data.showtimes} />
          ))}
        </div>
        <div className="coming-soon header">
          <div className="title">COMING SOON</div>
          <div className="line"></div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Home;
