import React, { useEffect, useState } from "react";
import Mock from "../api/MockAPI/mock.js";
import MovieCard from "../components/MovieCard/MovieCard.jsx";
import "./home.css";
import bg from "../assets/img/banner.png";

const Home = () => {
  const [data, setData] = useState({
    now: [],
    soon: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const movies = await Mock.getMovies();
      if (typeof movies !== "string") {
        const moviesToShow = getMoviesToShow(movies);
        setData({ now: moviesToShow.now, soon: moviesToShow.soon });
      }
    };
    fetchData();
  }, []);

  const getMoviesToShow = (movies) => {
    const moviesToShow = {
      now: [],
      soon: [],
    };
    movies.forEach((movie) => {
      if (movie.status === "now") moviesToShow.now.push(movie);
      if (movie.status === "soon") moviesToShow.soon.push(movie);
    });
    return moviesToShow;
  };

  return (
    <div className="home-wrapper">
      <div className="home-content-wrapper">
        <div className="home-banner">
          <img src={bg} alt="" />
        </div>
        <div className="showing-now header">
          <div className="title">SHOWING NOW</div>
          <div className="line"></div>
        </div>

        {data.now.length && (
          <div className="movies">
            {data.now.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        <div className="coming-soon header">
          <div className="title">COMING SOON</div>
          <div className="line"></div>
        </div>

        {data.soon.length && (
          <div className="movies">
            {data.soon.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
