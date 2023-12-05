import React from "react";
import TMDB from "../../api/TMDB/tmdb.js";
import { useState } from "react";
import EditMovieForm from "../EditMovieForm/index.jsx";
import { Fragment } from "react";
import Showtimes from "../EditShowtimes/index.jsx";

const MovieTable = ({ movieData, onDeleteMovie, onSaveChanges }) => {
  const [editForm, setEditForm] = useState(null);
  const [showtimeRow, setShowtimeRow] = useState(null);

  const editMovie = (e) => {
    setShowtimeRow(null);
    setEditForm(e.target.id);
  };

  const showShowtimes = (e) => {
    setShowtimeRow(e.target.id);
    setEditForm(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Poster</th>
          <th>Title</th>
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
                <button id={movie.id} onClick={(e) => onDeleteMovie(e.target.id)} className="admin-delete-button">
                  Delete
                </button>
              </td>
            </tr>
            {editForm === movie.id && (
              <tr key={`editrow_${movie.id}`} className="edit-row">
                <td colSpan={4}>
                  <EditMovieForm
                    movieToBeEdited={movie}
                    onSaveChanges={(newMovieData) => {
                      onSaveChanges(movie.id, newMovieData);
                      setEditForm(null);
                    }}
                  />
                </td>
              </tr>
            )}
            {showtimeRow === movie.id && (
              <tr key={`showtimerow_${movie.id}`} className="edit-row">
                <td colSpan={4}>
                  <Showtimes
                    movie={movie}
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
