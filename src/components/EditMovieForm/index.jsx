import React from "react";
import { useRef } from "react";

const EditMovieForm = ({ movieToBeEdited, onSaveChanges }) => {
  const title = useRef();
  const backdrop_path = useRef();
  const poster_path = useRef();
  const genres = useRef();
  const description = useRef();
  const runtime = useRef();
  const price = useRef();

  const saveChanges = () => {
    const newMovieData = {
      ...movieToBeEdited,
      title: title.current.value,
      backdrop_path: backdrop_path.current.value,
      poster_path: poster_path.current.value,
      genres: genres.current.value,
      description: description.current.value,
      runtime: runtime.current.value,
      price: price.current.value,
    };
    onSaveChanges(newMovieData);
  };

  return (
    <div className="edit-inputs">
      <div className="edit-input-title">
        <label htmlFor="editTitle">Title</label>
        <input ref={title} defaultValue={movieToBeEdited.title} className="input-title" type="text" id="editTitle" />
      </div>
      <div className="edit-input-backdrop">
        <label htmlFor="editBackdropPath">Backdrop Path</label>
        <input
          ref={backdrop_path}
          defaultValue={movieToBeEdited.backdrop_path}
          type="text"
          id="editBackdropPath"
          className="input-backdrop"
        />
      </div>
      <div className="edit-input-poster">
        <label htmlFor="editPoster">Poster path</label>
        <input
          ref={poster_path}
          defaultValue={movieToBeEdited.poster_path}
          type="text"
          id="editPoster"
          className="input-poster"
        />
      </div>
      <div className="edit-input-genres">
        <label htmlFor="editGenres">Genres</label>
        <input
          ref={genres}
          defaultValue={movieToBeEdited.genres}
          type="text"
          id="editGenres"
          className="input-genres"
        />
      </div>
      <div className="edit-input-description">
        <label htmlFor="editDescription">Description</label>
        <input
          ref={description}
          defaultValue={movieToBeEdited.description}
          type="text"
          id="editDescription"
          className="input-description"
        />
      </div>
      <div className="edit-input-runtime">
        <label htmlFor="editRuntime">Runtime (minutes) </label>
        <input
          ref={runtime}
          defaultValue={movieToBeEdited.runtime}
          type="text"
          id="editRuntime"
          className="input-runtime"
        />
      </div>
      <div className="edit-input-price">
        <label htmlFor="editPrice">Price (RON) </label>
        <input ref={price} defaultValue={movieToBeEdited.price} type="text" id="editPrice" className="input-price" />
      </div>
      <button onClick={saveChanges} className="edit-save-button">
        Save changes
      </button>
    </div>
  );
};

export default EditMovieForm;
