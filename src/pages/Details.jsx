import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Mock from "../api/MockAPI/mock.js";
import TMDB from "../api/TMDB/tmdb.js";
import Booking from "../components/Booking/index.jsx";
import "./details.css";
import generic_bg from "../assets/img/generic_bg.jpg";

const Details = ({ setTicketsInCart }) => {
  const { movieId } = useParams();
  const [theater, setTheater] = useState({
    showtime: null,
  });
  const [data, setData] = useState({
    movie: null,
    showtimes: [],
  });
  const [addedTickets, setAddedTickets] = useState(0);
  const [mode, setMode] = useState("details");

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

  const handleOnClickShowtime = (showtimeID) => {
    const showtime = data.showtimes.find((showtime) => showtime.id == showtimeID);
    setTheater({ showtime: showtime });
    setMode("booking");
  };

  return data.movie ? (
    <div
      className="details"
      style={{
        background: data.movie.backdrop_path
          ? // ? `linear-gradient(90deg, rgba(15, 15, 15, 0.7),rgba(27, 31, 33, 0.95), rgba(20, 20, 20, 0.85)), url(${TMDB.getPhotoPath(
            `linear-gradient(90deg, rgba(15, 15, 15, 0.8), 10%, rgba(0, 0, 0, 0.8), rgba(15, 15, 15, 0.8)),
            radial-gradient(farthest-side at bottom left, rgba(255, 0, 255, 0.5), transparent), 
            radial-gradient(farthest-corner at bottom right, rgba(255, 50, 50, 0.7), transparent 400px),
            radial-gradient(farthest-corner at top right, rgba(36, 103, 86, 0.7), transparent ),
            url(${TMDB.getPhotoPath(data.movie.backdrop_path, "w1280")})`
          : `linear-gradient(90deg, rgba(15, 15, 15, 0.8), 10%, rgba(0, 0, 0, 0.8), rgba(15, 15, 15, 0.8)),
          radial-gradient(farthest-side at bottom left, rgba(255, 0, 255, 0.5), transparent), 
          radial-gradient(farthest-corner at bottom right, rgba(255, 50, 50, 0.7), transparent 400px),
          radial-gradient(farthest-corner at top right, rgba(36, 103, 86, 0.7), transparent ), url(${generic_bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="details-content">
        <div className="details-left">
          <Link to="../">
            <i className="fa-solid fa-arrow-left-long"></i>
          </Link>
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
        </div>

        <div className="details-right">
          {mode === "details" && (
            <div className="details-movie-data">
              <div className="movie-title">{data.movie.title}</div>
              <div className="genre">
                <span className="label">Genre: </span>
                <span className="data">{data.movie.genres.split(",").join(", ")}</span>
              </div>
              <div className="description">{data.movie.description}</div>
              <div className="price">
                <span className="label">Price: </span>
                <span className="data">
                  {data.movie.price} {(data.movie.price && "RON") || "-"}
                </span>
              </div>
            </div>
          )}

          <div className="booking-section">
            <div className="buttons">
              {mode === "booking" && (
                <button className="back-to-details-button" onClick={() => setMode("details")}>
                  <i className="fa-solid fa-arrow-left-long"></i>
                </button>
              )}
              {data.showtimes.length > 0 &&
                data.showtimes.map((showtime) => {
                  const showtimeDate = new Date(showtime.timestamp * 1000);
                  return (
                    <button
                      className="showtime-button"
                      key={`${showtime.id}`}
                      onClick={() => handleOnClickShowtime(showtime.id)}
                    >
                      <div>
                        {showtimeDate.getDate()}.{showtimeDate.getMonth() + 1}
                      </div>
                      <div>
                        {showtimeDate.getHours()}:{showtimeDate.getMinutes()}
                      </div>
                    </button>
                    /* </div> */
                  );
                })}
            </div>
            {mode === "booking" && theater.showtime && (
              <Booking
                key={addedTickets}
                setAddedTickets={setAddedTickets}
                showtime={theater.showtime}
                movie={data.movie}
                setTicketsInCart={setTicketsInCart}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Details;
