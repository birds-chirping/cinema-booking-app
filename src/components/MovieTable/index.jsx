import React from "react";
import TMDB from "../../api/TMDB/tmdb.js";
import { useState } from "react";
import EditMovieForm from "../EditMovieForm/index.jsx";
import { Fragment } from "react";
import Showtimes from "../EditShowtimes/index.jsx";

const MovieTable = ({ movieData, onDeleteMovie, onSaveChanges }) => {
  const [editForm, setEditForm] = useState(null);
  const [showtimeRow, setShowtimeRow] = useState(null);
  const [allowDelete, setAllowDelete] = useState(null);

  const editMovie = (e) => {
    setShowtimeRow(null);
    setEditForm(e.target.id);
    setAllowDelete(null);
  };

  const showShowtimes = (e) => {
    setShowtimeRow(e.target.id);
    setEditForm(null);
    setAllowDelete(null);
  };

  const showDeleteAlert = (id) => {
    setAllowDelete(id);
    setEditForm(null);
    setShowtimeRow(null);
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
                {movie.showtimeIDs.join(" ")}{" "}
                <button onClick={showShowtimes} id={movie.id}>
                  Change showtimes
                </button>
              </td>
              <td>
                <button id={movie.id} onClick={editMovie} className="admin-edit-button">
                  Edit
                </button>
              </td>
              <td>
                <button
                  id={movie.id}
                  onClick={(e) => {
                    if (movie.showtimeIDs.length > 0) {
                      showDeleteAlert(movie.id);
                    } else {
                      onDeleteMovie(e.target.id);
                    }
                  }}
                  className="admin-delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
            {allowDelete === movie.id && (
              <tr key={`errordeleterow_${movie.id}`} className="edit-row">
                <td colSpan={5}>
                  <div>Please remove movie from schedule first.</div>
                </td>
              </tr>
            )}
            {editForm === movie.id && (
              <tr key={`editrow_${movie.id}`} className="edit-row">
                <td colSpan={5}>
                  <EditMovieForm
                    movieToBeEdited={movie}
                    onSaveChanges={(newMovieData) => {
                      onSaveChanges(newMovieData);
                      setEditForm(null);
                    }}
                  />
                </td>
              </tr>
            )}
            {showtimeRow === movie.id && (
              <tr key={`showtimerow_${movie.id}`} className="edit-row">
                <td colSpan={5}>
                  <Showtimes
                    movie={movie}
                    onSaveSchedule={(newMovieData) => {
                      onSaveChanges(newMovieData);
                      setShowtimeRow(null);
                    }}
                    // onSaveChanges={(newMovieData) => {
                    //   onSaveChanges(movie.id, newMovieData);
                    //   setShowtimeRow(null);
                    // }}
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
