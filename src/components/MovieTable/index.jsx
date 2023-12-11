import React from "react";
import TMDB from "../../api/TMDB/tmdb.js";
import { useState } from "react";
import EditMovieForm from "../EditMovieForm/index.jsx";
import { Fragment } from "react";
import Showtimes from "../EditShowtimes/index.jsx";

const MovieTable = ({ movieData, onDeleteMovie, showtimes, setShowtimes, onEdit }) => {
  const [mode, setMode] = useState({
    edit: false,
    showtimes: false,
    blockDelete: false,
    alertDelete: false,
  });

  const showEditForm = (e) => {
    setMode({ edit: e.target.id, showtimes: false, blockDelete: false, alertDelete: false });
  };

  const showShowtimes = (e) => {
    setMode({ edit: false, showtimes: e.target.id, blockDelete: false, alertDelete: false });
  };

  const showDeleteErrorAlert = (id) => {
    setMode({ edit: false, showtimes: false, blockDelete: id, alertDelete: false });
  };

  const showDeleteAlert = (id) => {
    setMode({ edit: false, showtimes: false, blockDelete: false, alertDelete: id });
  };

  return (
    <table style={{ width: "800px" }}>
      <thead>
        <tr>
          <th>Poster</th>
          <th>Title</th>
          <th>Price</th>
          <th>Showtimes</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {movieData.map((movie) => (
          <Fragment key={movie.id}>
            <tr key={`row_${movie.id}`}>
              <td>
                <img src={TMDB.getPhotoPath(movie.poster_path, "w92")} width={"80"} alt="" />{" "}
              </td>
              <td>{movie.title}</td>
              <td>{movie.price} RON</td>
              <td>
                {showtimes
                  .filter((showtime) => {
                    return showtime.movieID == movie.id;
                  })
                  .map((showtime) => showtime.id)
                  .join(" ")}
                <button onClick={showShowtimes} id={movie.id}>
                  Change showtimes
                </button>
              </td>
              <td>
                <button id={movie.id} onClick={showEditForm} className="admin-edit-button">
                  Edit
                </button>
              </td>
              <td>
                <button
                  id={movie.id}
                  onClick={(e) => {
                    const showtimesList = showtimes.filter((showtime) => showtime.movieID === movie.id);
                    if (showtimesList.length > 0) {
                      showDeleteErrorAlert(movie.id);
                    } else {
                      showDeleteAlert(movie.id);
                    }
                  }}
                  className="admin-delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
            {mode.blockDelete === movie.id && (
              <tr key={`errordeleterow_${movie.id}`} className="errordelete-row">
                <td colSpan={5}>
                  <div>Please remove movie from schedule first.</div>
                </td>
              </tr>
            )}
            {mode.alertDelete === movie.id && (
              <tr key={`alertdeleterow_${movie.id}`} className="alertdelete-row">
                <td colSpan={5}>
                  <div>The movie "{movie.title}" will be permanently deleted. Continue?</div>
                  <button
                    onClick={() => {
                      onDeleteMovie(movie.id);
                      setMode({ ...mode, alertDelete: false });
                    }}
                  >
                    Delete movie
                  </button>
                  <button
                    onClick={() => {
                      setMode({ ...mode, alertDelete: false });
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            )}
            {mode.edit === movie.id && (
              <tr key={`editrow_${movie.id}`} className="edit-row">
                <td colSpan={5}>
                  <EditMovieForm
                    movieToBeEdited={movie}
                    onSaveChanges={(newMovieData) => {
                      onEdit(newMovieData);
                      setMode({ ...mode, edit: false });
                    }}
                    closeEditForm={() => setMode({ ...mode, edit: false })}
                  />
                </td>
              </tr>
            )}
            {mode.showtimes === movie.id && (
              <tr key={`showtimerow_${movie.id}`} className="showtime-row">
                <td colSpan={5}>
                  <Showtimes
                    movie={movie}
                    showtimes={showtimes}
                    setShowtimes={setShowtimes}
                    closeShowtimes={() => setMode({ ...mode, showtimes: false })}
                  />
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
