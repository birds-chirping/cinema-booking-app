import React, { useState, useEffect } from "react";
import Mock from "../api/MockAPI/mock.js";
import AddMovieForm from "../components/AddMovieForm/index.jsx";
import MovieTable from "../components/MovieTable/index.jsx";
import "./style.css";

const Admin = () => {
  const [newMovie, setNewMovie] = useState(null);
  const [movies, setMovies] = useState(null);
  // const [currentMovieId, setCurrentMovieId] = useState("");

  const addNewMovie = (movie) => {
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

  useEffect(() => {
    if (newMovie) addNewMovie(newMovie);
    const fetchMovies = async () => {
      const response = await Mock.getMovies();
      setMovies(response);
    };
    fetchMovies();
    return setNewMovie(null);
  }, [newMovie]);

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

  console.log("Admin");

  return (
    <div className="admin">
      <AddMovieForm addNewMovie={setNewMovie} />
      {movies && <MovieTable deleteMovie={deleteMovie} movies={movies} />}
    </div>
  );
};

export default Admin;
