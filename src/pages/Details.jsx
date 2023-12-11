import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Mock from "../api/MockAPI/mock.js";
import TMDB from "../api/TMDB/tmdb.js";
import Theater from "../components/Theater/index.jsx";
import ShowtimeButton from "../components/ShowtimeButton/index.jsx";
import "./details.css";

const Details = () => {
  const { movieId } = useParams();
  const [theater, setTheater] = useState({
    showtime: null,
  });
  const [data, setData] = useState({
    movie: null,
    showtimes: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const movie = await Mock.getMovie(movieId);
      const showtimes = await Mock.getShowtimesByMovieID(movieId);
      if (typeof movie !== "string" && typeof showtimes !== "string") {
        setData({ movie: movie, showtimes: showtimes });
      }
    };
    fetchData();
  }, []);

  const handleOnClick = (showtimeID) => {
    const showtime = data.showtimes.find((showtime) => showtime.id == showtimeID);
    setTheater({ showtime: showtime });
  };

  return data.movie ? (
    <div
      className="details"
      style={{
        backgroundImage: `url(${TMDB.getPhotoPath(data.movie.backdrop_path, "w1280")})`,
        backgroundSize: "cover",
      }}
    >
      <div className="details-movie-wrapper">
        <div className="details-movie">
          <div>
            <img className="details-movie-poster" src={TMDB.getPhotoPath(data.movie.poster_path, "w500")} />
          </div>

          <div className="details-movie-title">{data.movie.title}</div>
          <div className="details-genre">Genre: {data.movie.genres}</div>
          <div className="details-description">{data.movie.description}</div>
          <div className="details-price">Price: {data.movie.price} RON</div>
          <Link to="../">Back home</Link>
        </div>
      </div>

      <div className="booking-section">
        {data.showtimes.length > 0 &&
          data.showtimes.map((showtime) => {
            return (
              <ShowtimeButton
                onClick={handleOnClick}
                key={`${showtime.id}`}
                showtimeID={showtime.id}
                showtimeDate={new Date(showtime.timestamp * 1000)}
              />
            );
          })}
        {theater.showtime && <Theater className={"theater"} showtime={theater.showtime} />}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Details;
