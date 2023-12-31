import React from "react";
import { useRef, useState } from "react";
import "./style.css";

const EditMovieForm = ({ movieToBeEdited, onSaveChanges, closeEditForm }) => {
  const title = useRef();
  const backdrop_path = useRef();
  const poster_path = useRef();
  const genres = useRef();
  const description = useRef();
  const runtime = useRef();
  const price = useRef();
  const [status, setStatus] = useState(movieToBeEdited.status);

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
      status: status,
    };
    onSaveChanges(newMovieData);
  };

  const onOptionChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="edit-inputs-wrapper">
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
        <div className="edit-inp-status">
          <div className="radio-label">Status</div>
          <div className="radio-group">
            <div>
              <input
                type="radio"
                id="statusNow"
                name="status"
                value="now"
                onChange={onOptionChange}
                checked={status === "now"}
              />
              <label htmlFor="statusNow">Now showing</label>
            </div>

            <div>
              <input
                type="radio"
                id="statusSoon"
                name="status"
                value="soon"
                onChange={onOptionChange}
                checked={status === "soon"}
              />
              <label htmlFor="statusSoon">Coming soon</label>
            </div>

            <div>
              <input
                type="radio"
                id="statusUnlisted"
                name="status"
                value=""
                onChange={onOptionChange}
                checked={!status}
              />
              <label htmlFor="statusUnlisted">Unlisted</label>
            </div>
          </div>
        </div>
        <div className="edit-form-buttons-wrapper">
          <button onClick={saveChanges} className="edit-save-button">
            Save changes
          </button>
          <button className="edit-cancel-button" onClick={() => closeEditForm()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMovieForm;
