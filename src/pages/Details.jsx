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
  const [movie, setMovie] = useState(null);
  const [room, setTheater] = useState({
    theaterLayout: [],
  });

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await Mock.getMovie(movieId);
      setMovie(response);
    };

    fetchMovie();
  }, []);

  // console.log(movie);

  const handleOnClick = async (id) => {
    const data = await Mock.getShowtimeData(id);
    setTheater({ theaterLayout: data.theaterLayout });
  };

  return movie ? (
    <div
      className="details"
      style={{ backgroundImage: `url(${TMDB.getPhotoPath(movie.backdrop_path, "w1280")})`, backgroundSize: "cover" }}
    >
      <div className="details-movie-wrapper">
        <div className="details-movie">
          <div>
            <img className="details-movie-poster" src={TMDB.getPhotoPath(movie.poster_path, "w500")} />
          </div>

          <div className="details-movie-title">{movie.title}</div>
          <div className="details-genre">Genre: {movie.genres}</div>
          <div className="details-description">{movie.description}</div>
          <div className="details-price">Price: {movie.price} RON</div>
          <Link to="../">Back home</Link>
        </div>
      </div>

      <div className="booking-section">
        {movie.showtimeIDs.map((showtimeID) => {
          return <ShowtimeButton onClick={handleOnClick} key={`${showtimeID}`} showtimeID={showtimeID} />;
        })}
        {room.theaterLayout.length > 0 && <Theater className={"theater"} data={room} />}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Details;
