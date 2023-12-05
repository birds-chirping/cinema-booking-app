import React from "react";
import { useState } from "react";
import { useRef } from "react";
import TMDB from "../../api/TMDB/tmdb";

const AddMovieForm = ({ onMovieAdd }) => {
  const movieCode = useRef();
  const autocompleteBtn = useRef();
  const [movieInput, setMovieInput] = useState({
    title: "",
    backdrop_path: "",
    poster_path: "",
    genres: "",
    description: "",
    runtime: "",
    price: "",
    showtimeIDs: [],
  });
  const [error, setError] = useState(null);

  async function handleNewMovie() {
    const newMovie = movieInput;
    resetFields();
    onMovieAdd(newMovie);
  }

  const handleAutocomplete = async () => {
    const data = await TMDB.getMovieData(movieCode.current.value);
    if (typeof data === "string") {
      resetFields();
      setError(data);
    } else {
      setMovieInput({
        ...movieInput,
        title: data.title || "",
        backdrop_path: data.backdrop_path || "",
        poster_path: data.poster_path || "",
        genres: TMDB.getGenres(data.genres).join(",") || "",
        description: data.overview || "",
        runtime: data.runtime || "",
        price: "",
        showtimeIDs: [],
        // TODO: make input fields required
      });
      setError(null);
    }
  };

  const resetFields = () => {
    setMovieInput({
      ...movieInput,
      title: "",
      backdrop_path: "",
      poster_path: "",
      genres: "",
      description: "",
      runtime: "",
      price: "",
      showtimeIDs: [],
    });
  };

  return (
    <div className="admin-inputs">
      <div className="admin-input-moviecode">
        <label htmlFor="moviecode">TMDB Movie Code: </label>
        <input ref={movieCode} className="input-moviecode" type="text" id="moviecode" />
      </div>

      {error && <div>{error}</div>}
      <button ref={autocompleteBtn} onClick={handleAutocomplete}>
        Autocomplete
      </button>
      <div className="admin-input-title">
        <label htmlFor="title">Title</label>
        <input
          value={movieInput.title}
          onChange={(e) => setMovieInput({ ...movieInput, title: e.target.value })}
          className="input-title"
          type="text"
          id="title"
        />
      </div>
      <div className="admin-input-backdrop">
        <label htmlFor="backdropPath">Backdrop Path</label>
        <input
          value={movieInput.backdrop_path}
          onChange={(e) => setMovieInput({ ...movieInput, backdrop_path: e.target.value })}
          type="text"
          id="backdropPath"
          className="input-backdrop"
        />
      </div>
      <div className="admin-input-poster">
        <label htmlFor="poster">Poster path</label>
        <input
          value={movieInput.poster_path}
          onChange={(e) => setMovieInput({ ...movieInput, poster_path: e.target.value })}
          type="text"
          id="poster"
          className="input-poster"
        />
      </div>
      <div className="admin-input-genres">
        <label htmlFor="genres">Genres</label>
        <input
          value={movieInput.genres}
          onChange={(e) => setMovieInput({ ...movieInput, genres: e.target.value })}
          type="text"
          id="genres"
          className="input-genres"
        />
      </div>
      <div className="admin-input-description">
        <label htmlFor="description">Description</label>
        <input
          value={movieInput.description}
          onChange={(e) => setMovieInput({ ...movieInput, description: e.target.value })}
          type="text"
          id="description"
          className="input-description"
        />
      </div>
      <div className="admin-input-runtime">
        <label htmlFor="runtime">Runtime (minutes) </label>
        <input
          value={movieInput.runtime}
          onChange={(e) => setMovieInput({ ...movieInput, runtime: e.target.value })}
          type="text"
          id="runtime"
          className="input-runtime"
        />
      </div>
      <div className="admin-input-price">
        <label htmlFor="price">Price (RON) </label>
        <input
          value={movieInput.price}
          onChange={(e) => setMovieInput({ ...movieInput, price: e.target.value })}
          type="text"
          id="price"
          className="input-runtime"
        />
      </div>
      <button onClick={handleNewMovie} className="admin-save-button">
        Add new movie
      </button>
    </div>
  );
};

export default AddMovieForm;
