import React, { useState, useEffect } from "react";
import Mock from "../api/MockAPI/mock.js";
import AddMovieForm from "../components/AddMovieForm/index.jsx";
import MovieTable from "../components/MovieTable/index.jsx";
import "./admin.css";

const Admin = () => {
  const [data, setData] = useState({
    movies: [],
    showtimes: [],
  });
  const [addMovieForm, setAddMovieForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await Mock.getMovies();
      const showtimes = await Mock.getShowtimes();
      if (typeof movies !== "string" && typeof showtimes !== "string") {
        setData({ movies: movies, showtimes: showtimes });
      }
    };
    fetchData();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await Mock.getMovies();
      setData({ ...data, movies: response });
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
      const updatedMovies = data.movies.filter((movie) => movie.id != id);
      setData({ ...data, movies: updatedMovies });
    }
  };

  const handleEditMovie = async (newMovieData) => {
    const url = `${Mock.MOVIES_URL}/${newMovieData.id}`;
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
      <button onClick={() => setAddMovieForm(!addMovieForm)} className="add-movie-button">
        {addMovieForm && "Hide"} {!addMovieForm && "Add new movie"}
      </button>
      {addMovieForm && <AddMovieForm onMovieAdd={handleMovieAdd} />}
      <MovieTable
        key={data.movies.length}
        movies={data.movies}
        showtimes={data.showtimes}
        setShowtimes={(newShowtimes) => setData({ ...data, showtimes: newShowtimes })}
        onDeleteMovie={handleOnDelete}
        onEdit={handleEditMovie}
      />
    </div>
  );
};

export default Admin;
