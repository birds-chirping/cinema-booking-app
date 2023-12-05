import React, { useEffect, useRef, useState } from "react";
import Mock from "../../api/MockAPI/mock";
import "./style.css";
import TheaterModel from "../../theaterModel/theaterModel";

const Showtimes = ({ movie, onSaveSchedule }) => {
  const [showtimes, setShowtimes] = useState([]);
  const showtimeForm = useRef();

  useEffect(() => {
    fetchShowtimes();
  }, []);

  const fetchShowtimes = async () => {
    try {
      const data = await Mock.getShowtimes();
      setShowtimes(data);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  const updateShowtime = async (newShowtimeData) => {
    const url = `${Mock.BASE_URL}showtimes/${newShowtimeData.id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShowtimeData),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      return true;
    }
    return false;
  };

  const updateMovie = async (movie, showtimeIDs) => {
    const newMovie = { ...movie, showtimeIDs: showtimeIDs };

    onSaveSchedule(newMovie);
  };

  const onSubmit = async (e, movie) => {
    e.preventDefault();

    const showtimesCopy = showtimes.map((prop) => {
      return { ...prop };
    });
    const form = new FormData(showtimeForm.current);

    let showtimeIDsToBeAdded = [];
    form.forEach((showtimeID) => {
      showtimeIDsToBeAdded.push(showtimeID);
    });
    let toUnbook = movie.showtimeIDs.filter((t) => !showtimeIDsToBeAdded.includes(t));

    let addResponse = await addMoviesToSchedule(showtimeIDsToBeAdded, movie, showtimesCopy);
    let deleteResponse = await removeMoviesFromSchedule(toUnbook, showtimesCopy);

    if (addResponse && deleteResponse) updateMovie(movie, showtimeIDsToBeAdded);
  };

  const addMoviesToSchedule = async (showtimeIDsToBeAdded, movie, showtimesCopy) => {
    for (const showtimeID of showtimeIDsToBeAdded) {
      if (!movie.showtimeIDs.includes(showtimeID)) {
        let showtimeToBeEdited = showtimesCopy.find((showtime) => showtime.id == showtimeID);
        showtimeToBeEdited.movieID = movie.id;
        const response = await updateShowtime(showtimeToBeEdited);
        if (response === false) return false;
      }
    }
    return true;
  };

  const removeMoviesFromSchedule = async (toUnbook, showtimesCopy) => {
    for (const id of toUnbook) {
      let showtimeToBeEdited = showtimesCopy.find((showtime) => showtime.id == id);
      if (showtimeToBeEdited) {
        showtimeToBeEdited.movieID = null;
        showtimeToBeEdited.theaterLayout = TheaterModel.getNewLayout();
      }
      const response = await updateShowtime(showtimeToBeEdited);
      if (response === false) return false;
    }
    return true;
  };

  return showtimes ? (
    <div className="showtimes">
      <form ref={showtimeForm} className="showtimes-form">
        {showtimes.map((showtime) => {
          const date = new Date(showtime.timestamp * 1000);
          const locked = showtime.movieID != null && showtime.movieID != movie.id;
          const alreadyBooked = showtime.movieID == movie.id;
          return (
            <div
              className={`showtime-label ${locked ? "locked" : alreadyBooked ? "alreadyBooked" : "available"}`}
              key={showtime.id}
            >
              <label htmlFor={`showtime_${showtime.id}`}>
                <div>
                  {date.getDate()}.{date.getMonth() + 1}
                </div>{" "}
                <div>
                  {date.getHours()}:{date.getMinutes()}
                </div>
              </label>
              <input
                value={showtime.id}
                type="checkbox"
                name="showtime"
                id={`showtime_${showtime.id}`}
                className="showtime"
                disabled={locked}
                defaultChecked={showtime.movieID}
              />
              {/* <div>{showtime.id}</div>
            <div>{showtime.timestamp}</div>
            <div>{showtime.movieID}</div> */}
            </div>
          );
        })}
        <button
          onClick={(e) => {
            onSubmit(e, movie);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Showtimes;
