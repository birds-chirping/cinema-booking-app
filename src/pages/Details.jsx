import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Mock from "../api/MockAPI/mock.js";
import TMDB from "../api/TMDB/tmdb.js";
import Theater from "../components/Theater/index.jsx";
import ShowtimeButton from "../components/ShowtimeButton/index.jsx";
import "./details.css";
import generic_bg from "../assets/img/generic_bg.jpg";

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
        background: data.movie.backdrop_path
          ? `linear-gradient(90deg, rgba(255, 255, 255, 0.9), transparent 40%), url(${TMDB.getPhotoPath(
              data.movie.backdrop_path,
              "w1280"
            )})`
          : `linear-gradient(90deg, rgba(255, 255, 255, 0.9),  transparent 40%), url(${generic_bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="details-movie-wrapper">
        <div className="details-movie">
          <div className="poster-wrapper" style={{ backgroundColor: !data.movie.poster_path && `rgb(232, 232, 232)` }}>
            {data.movie.poster_path ? (
              <img className="movie-poster" src={TMDB.getPhotoPath(data.movie.poster_path, "w500")} />
            ) : (
              <>
                <i className="fa-regular fa-image noposter"></i>
                <div>No image available</div>
              </>
            )}
          </div>

          <div className="movie-title">{data.movie.title}</div>
          <div className="genre">Genre: {data.movie.genres}</div>
          <div className="description">{data.movie.description}</div>
          <div className="price">
            Price: {data.movie.price} {(data.movie.price && "RON") || "-"}
          </div>
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
        {theater.showtime && <Theater showtime={theater.showtime} />}
        {theater.showtime && <div className="selected-seats">Selected seats</div>}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Details;
