import React, { useState, useEffect } from "react";
import Mock from "../api/MockAPI/mock.js";

const Admin = () => {
  const [movie, setMovie] = useState({
    title: "",
    backdrop_path: "",
    poster_path: "",
    genre_ids: [],
    description: "",
    runtime: null,
    status: "",
    days: [],
  });

  const [currentMovieId, setCurrentMovieId] = useState("");
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await Mock.getMovies();
      setMovies(response);
    };

    fetchMovies();
  }, []);

  const addNewMovie = () => {
    const url = Mock.MOVIES_URL;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    };
    fetch(url, options);
  };

  const deleteMovie = async (id) => {
    const url = `${Mock.MOVIES_URL}/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const updatedMovies = movies.filter((movie) => movie.id != id);
      setMovies(updatedMovies);
    }
  };

  return (
    <div className="admin">
      <div className="admin-inputs">
        <div className="admin-input-title">
          <label htmlFor="title">Title</label>
          <input
            className="input-title"
            type="text"
            id="title"
            value={movie.title}
            onChange={(e) => {
              const movieName = e.target.value;
              setMovie({ ...movie, title: movieName });
            }}
          />
        </div>
        <div className="admin-input-image">
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="text"
            id="imageURL"
            className="input-image"
            value={movie.poster_path}
            onChange={(e) => {
              const imageURL = e.target.value;
              setMovie({ ...movie, poster_path: imageURL });
            }}
          />
        </div>

        <div className="admin-input-description">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            className="input-description"
            value={movie.description}
            onChange={(e) => {
              const movieDescription = e.target.value;
              setMovie({ ...movie, description: movieDescription });
            }}
          />
        </div>
        <button onClick={addNewMovie} className="admin-save-button">
          Save
        </button>
      </div>
      <div>
        {movies && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image URL</th>
                {/* <th>Description</th> */}
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>
                    <img src={movie.poster_path} width={80} alt="" />{" "}
                  </td>
                  {/* <td>{movie.description}</td> */}
                  <td>
                    <button
                      id={movie.id}
                      onClick={(e) => {
                        const movieId = e.target.id;
                        setCurrentMovieId(movieId);
                        const movieToBeEdited = movies.find((movie) => movie.id === movieId);
                        setMovie(movieToBeEdited);
                      }}
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
        )}
      </div>
    </div>
  );
};

export default Admin;

// title: "",
//     backdrop_path: "",
//     poster_path: "",
//     genre_ids: [],
//     description: "",
//     runtime: null,
//     status: "",
//     days: [
//       {
//         date: 1701273461,
//         availableIntervals: [
//           i2
//         ],
//         booked: [
//           A_10,
//           A_11,
//           C_7,
//           C_8,
//           C_9
//         ]
//       },
//       {
//         date: 1701273401,
//         availableIntervals: [
//           i3
//         ],
//         booked: [
//           B_10,
//           B_11,
//           C_7,
//           C_8,
//           C_9
//         ]
//       }
//     ],
//   }
