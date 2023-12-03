import React from "react";
import TMDB from "../../api/TMDB/tmdb.js";

const MovieTable = ({ movies, deleteMovie }) => {
  console.log("movieTable");

  return (
    <table>
      <thead>
        <tr>
          <th>Poster</th>
          <th>Title</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {movies &&
          movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <img src={TMDB.getPhotoPath(movie.poster_path, "w92")} width={"80"} alt="" />{" "}
              </td>
              <td>{movie.title}</td>
              <td>
                <button
                  id={movie.id}
                  //   onClick={(e) => {
                  //     const movieId = e.target.id;
                  //     setCurrentMovieId(movieId);
                  //     const movieToBeEdited = movies.find((movie) => movie.id === movieId);
                  //     setMovie(movieToBeEdited);
                  //   }}
                  className="admin-edit-button"
                >
                  Edit
                </button>
              </td>
              <td>
                <button id={movie.id} onClick={(e) => deleteMovie(e.target.id)} className="admin-delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
