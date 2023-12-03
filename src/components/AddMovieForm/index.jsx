import React from "react";
import { useState } from "react";
import { useRef } from "react";
import TMDB from "../../api/TMDB/tmdb";
import Mock from "../../api/MockAPI/mock";

const AddMovieForm = ({ addNewMovie }) => {
  const movieCode = useRef();
  const autocompleteBtn = useRef();

  const title = useRef();
  const backdrop = useRef();
  const poster = useRef();
  const genres = useRef();
  const description = useRef();
  const runtime = useRef();

  function handleNewMovie() {
    const movie = {
      title: title.current.value,
      backdrop_path: backdrop.current.value,
      poster_path: poster.current.value,
      genres: genres.current.value,
      description: description.current.value,
      runtime: runtime.current.value,
      status: "",
      showtimeIDs: [],
    };

    addNewMovie(movie);
    resetFields();
  }

  const resetFields = () => {
    movieCode.current.value = "";
    title.current.value = "";
    backdrop.current.value = "";
    poster.current.value = "";
    genres.current.value = "";
    description.current.value = "";
    runtime.current.value = "";
  };

  const handleAutocomplete = async () => {
    const data = await TMDB.getMovieData(movieCode.current.value);
    title.current.value = data.title;
    backdrop.current.value = data.backdrop_path;
    poster.current.value = data.poster_path;
    genres.current.value = TMDB.getGenres(data.genres);
    description.current.value = data.overview;
    runtime.current.value = data.runtime;
  };

  console.log("add movie form");

  return (
    <div className="admin-inputs">
      <div className="admin-input-moviecode">
        <label htmlFor="moviecode">TMDB Movie Code: </label>
        <input ref={movieCode} className="input-moviecode" type="text" id="moviecode" />
      </div>

      <button ref={autocompleteBtn} onClick={handleAutocomplete}>
        Autocomplete
      </button>

      <div className="admin-input-title">
        <label htmlFor="title">Title</label>
        <input ref={title} className="input-title" type="text" id="title" />
      </div>

      <div className="admin-input-backdrop">
        <label htmlFor="backdropPath">Backdrop Path</label>
        <input ref={backdrop} type="text" id="backdropPath" className="input-backdrop" />
      </div>
      <div className="admin-input-poster">
        <label htmlFor="poster">Poster path</label>
        <input ref={poster} type="text" id="poster" className="input-poster" />
      </div>
      <div className="admin-input-genres">
        <label htmlFor="genres">Genres</label>
        <input ref={genres} type="text" id="genres" className="input-genres" />
      </div>

      <div className="admin-input-description">
        <label htmlFor="description">Description</label>
        <input
          ref={description}
          type="text"
          id="description"
          className="input-description"
          // value={movie.description}
          // onChange={(e) => {
          //   const movieDescription = e.target.value;
          //   setMovie({ ...movie, description: movieDescription });
          // }}
        />
      </div>
      <div className="admin-input-runtime">
        <label htmlFor="runtime">Runtime (minutes) </label>
        <input ref={runtime} type="text" id="runtime" className="input-runtime" />
      </div>

      <button onClick={handleNewMovie} className="admin-save-button">
        Add new movie
      </button>
    </div>
  );
};

export default AddMovieForm;
