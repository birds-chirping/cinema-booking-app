import React, { useState, useEffect } from "react";
import Mock from "../api/MockAPI/mock.js";
import AddMovieForm from "../components/AddMovieForm/index.jsx";
import MovieTable from "../components/MovieTable/index.jsx";
import "./style.css";

const Admin = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await Mock.getMovies();
      setMovies(data);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  const handleMovieAdd = async (newMovie) => {
    try {
      const url = Mock.MOVIES_URL;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      };
      await fetch(url, options);
      fetchMovies();
    } catch (error) {
      console.error("error adding movie:", error);
    }
  };

  const handleOnDelete = async (id) => {
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

  const handleSaveChanges = async (id, newMovieData) => {
    // console.log("changes!!!!", id, newMovieData);

    const url = `${Mock.MOVIES_URL}/${id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovieData),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      fetchMovies();
    }
  };

  return (
    <div className="admin">
      <div className="Header">
        <button className="add-movie">Add new movie</button>
        <button className="schedule-movie">Schedule</button>
      </div>
      <AddMovieForm onMovieAdd={handleMovieAdd} />
      <MovieTable
        key={movies.length}
        movieData={movies}
        onDeleteMovie={handleOnDelete}
        onSaveChanges={handleSaveChanges}
      />
    </div>
  );
};

export default Admin;
