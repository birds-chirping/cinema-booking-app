import React, { useEffect, useRef } from "react";
import TMDB from "../../api/TMDB/tmdb.js";
import { useState } from "react";
import EditMovieForm from "../EditMovieForm/index.jsx";
import { Fragment } from "react";
import Showtimes from "../EditShowtimes/index.jsx";
import "./style.css";

const MovieTable = ({ movies, onDeleteMovie, showtimes, setShowtimes, onEdit }) => {
  const [mode, setMode] = useState({
    edit: false,
    showtimes: false,
    blockDelete: false,
    alertDelete: false,
    fieldsAlert: false,
  });
  const [showtimeMode, setShowtimeMode] = useState({
    schedule: true,
    showtime: false,
  });

  const editForm = useRef();
  const blockDeleteRow = useRef();
  const alertDeleteRow = useRef();
  const showtimesRow = useRef();
  const fieldsAlertRow = useRef();

  useEffect(() => {
    if (editForm.current && editForm.current.getBoundingClientRect().bottom > window.innerHeight)
      editForm.current.scrollIntoView(false);
    if (blockDeleteRow.current && blockDeleteRow.current.getBoundingClientRect().bottom > window.innerHeight)
      blockDeleteRow.current.scrollIntoView(false);
    if (alertDeleteRow.current && alertDeleteRow.current.getBoundingClientRect().bottom > window.innerHeight)
      alertDeleteRow.current.scrollIntoView(false);
    if (showtimesRow.current && showtimesRow.current.getBoundingClientRect().bottom > window.innerHeight)
      showtimesRow.current.scrollIntoView(false);
    if (fieldsAlertRow.current && fieldsAlertRow.current.getBoundingClientRect().bottom > window.innerHeight)
      fieldsAlertRow.current.scrollIntoView(false);
  }, [mode, showtimeMode]);

  const showEditForm = (e) => {
    setMode({ edit: e.target.id, showtimes: false, blockDelete: false, alertDelete: false, fieldsAlert: false });
  };

  const showShowtimes = (e, movie) => {
    if (movie.title && movie.poster_path && movie.genres && movie.price && movie.runtime && movie.description) {
      setMode({ edit: false, showtimes: e.target.id, blockDelete: false, alertDelete: false, fieldsAlert: false });
      setShowtimeMode({
        schedule: true,
        showtime: false,
      });
    } else {
      let fields = [];
      if (!movie.title) fields.push('"Title"');
      if (!movie.poster_path) fields.push('"Poster path"');
      if (!movie.description) fields.push('"Description"');
      if (!movie.genres) fields.push('"Genres"');
      if (!movie.runtime) fields.push('"Runtime"');
      if (!movie.price) fields.push('"Price"');
      setMode({
        edit: false,
        showtimes: false,
        blockDelete: false,
        alertDelete: false,
        fieldsAlert: { id: e.target.id, missingFields: fields },
      });
    }
  };

  const showDeleteErrorAlert = (id) => {
    setMode({ edit: false, showtimes: false, blockDelete: id, alertDelete: false, fieldsAlert: false });
  };

  const showDeleteAlert = (id) => {
    setMode({ edit: false, showtimes: false, blockDelete: false, alertDelete: id, fieldsAlert: false });
  };

  return (
    <table className="movie-table">
      <thead>
        <tr>
          <th className="th-poster"></th>
          <th className="movie">Movie</th>
          <th className="th-delete">Delete</th>
        </tr>
      </thead>
      <tbody>
        {movies.toReversed().map((movie) => (
          <Fragment key={movie.id}>
            <tr
              key={`row_${movie.id}`}
              style={{
                backgroundColor: `${
                  mode.edit === movie.id ||
                  mode.blockDelete === movie.id ||
                  mode.alertDelete === movie.id ||
                  mode.showtimes === movie.id ||
                  mode.fieldsAlert.id === movie.id
                    ? "rgb(205 229 252)"
                    : "white"
                }`,
              }}
            >
              <td>
                <div className="poster-wrapper" style={{ backgroundColor: !movie.poster_path && `rgb(232, 232, 232)` }}>
                  {movie.poster_path ? (
                    <img className="movie-poster" src={TMDB.getPhotoPath(movie.poster_path, "w92")} alt="" />
                  ) : (
                    <>
                      <i className="fa-regular fa-image noposter"></i>
                      <div>No image available</div>
                    </>
                  )}
                </div>
              </td>

              <td className="td-movie">
                <div className="td-movie-wrapper">
                  <div className="title">{movie.title}</div>

                  <div className="price">
                    Price: {movie.price} {(movie.price && "RON") || "-"}
                  </div>
                  <div className="showtimes-wrapper">
                    <div className="showtimes">
                      {showtimes
                        .filter((showtime) => {
                          return showtime.movieID == movie.id;
                        })
                        .map((showtime) => {
                          const showtimeDate = new Date(showtime.timestamp * 1000);
                          return (
                            <div className="tag-wrapper" key={showtime.timestamp}>
                              <div className="tag-date">
                                {showtimeDate.getDate()}.{showtimeDate.getMonth() + 1}
                              </div>{" "}
                              <div className="tag-hour">
                                {showtimeDate.getHours()}:{showtimeDate.getMinutes()}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="buttons">
                    <div className={`status ${movie.status}`}>
                      <i className="fa-solid fa-circle"></i>
                      {movie.status === "now" ? "Showing now" : movie.status === "soon" ? "Coming soon" : "Unlisted"}
                    </div>
                    <button id={movie.id} onClick={showEditForm} className="admin-edit-button">
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button
                      className="change-showtimes-btn"
                      onClick={(e) => {
                        showShowtimes(e, movie);
                      }}
                      id={movie.id}
                    >
                      <i className="fa-regular fa-calendar-days"></i>
                    </button>
                  </div>
                </div>
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
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </td>
            </tr>
            {mode.fieldsAlert.id === movie.id && (
              <tr
                ref={fieldsAlertRow}
                key={`errorfieldrow_${movie.id}`}
                className="errorfield-row"
                style={{ borderTop: "none", backgroundColor: "rgb(205 229 252)" }}
              >
                <td colSpan={3}>
                  <div className="field-error">
                    <div className="field-error-message">
                      Access blocked. Please complete the following field
                      {mode.fieldsAlert.missingFields.length > 1 ? "s" : ""}:{" "}
                      {[...mode.fieldsAlert.missingFields].join(", ")}.
                    </div>
                    <button
                      className="field-error-ok-button"
                      onClick={() => {
                        setMode({ ...mode, fieldsAlert: false });
                      }}
                    >
                      OK
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {mode.blockDelete === movie.id && (
              <tr
                ref={blockDeleteRow}
                key={`errordeleterow_${movie.id}`}
                className="errordelete-row"
                style={{ borderTop: "none", backgroundColor: "rgb(205 229 252)" }}
              >
                <td colSpan={3}>
                  <div className="block-alert">
                    <div className="block-alert-message">Please remove movie from schedule first.</div>
                    <button
                      className="block-alert-ok-button"
                      onClick={() => {
                        setMode({ ...mode, blockDelete: false });
                      }}
                    >
                      OK
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {mode.alertDelete === movie.id && (
              <tr
                ref={alertDeleteRow}
                key={`alertdeleterow_${movie.id}`}
                className="alertdelete-row"
                style={{ borderTop: "none", backgroundColor: "rgb(205 229 252)" }}
              >
                <td colSpan={3}>
                  <div className="delete-alert">
                    <div className="delete-alert-message">
                      The movie <span>"{movie.title}"</span> will be <span>permanently deleted</span>. Continue?
                    </div>
                    <button
                      className="delete-alert-yes-button"
                      onClick={() => {
                        onDeleteMovie(movie.id);
                        setMode({ ...mode, alertDelete: false });
                      }}
                    >
                      Delete movie
                    </button>
                    <button
                      className="delete-alert-no-button"
                      onClick={() => {
                        setMode({ ...mode, alertDelete: false });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {mode.edit === movie.id && (
              <tr
                ref={editForm}
                key={`editrow_${movie.id}`}
                className="edit-row"
                style={{ borderTop: "none", backgroundColor: "rgb(205 229 252)" }}
              >
                <td colSpan={3}>
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
              <tr
                ref={showtimesRow}
                key={`showtimerow_${movie.id}`}
                className="showtime-row"
                style={{ borderTop: "none", backgroundColor: "rgb(205 229 252)" }}
              >
                <td colSpan={3}>
                  <Showtimes
                    movie={movie}
                    showtimes={showtimes}
                    setShowtimes={setShowtimes}
                    closeShowtimes={() => setMode({ ...mode, showtimes: false })}
                    mode={showtimeMode}
                    setMode={setShowtimeMode}
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
