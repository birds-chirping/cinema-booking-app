import React, { useEffect, useRef, useState } from "react";
import Mock from "../../api/MockAPI/mock";
import "./style.css";
import { emptyTheaterLayout } from "../../theaterModel/theaterModel";
import Theater from "../Theater";

const Showtimes = ({ movie, showtimes, setShowtimes, closeShowtimes, mode, setMode }) => {
  const showtimeForm = useRef();

  const updateShowtime = async (newShowtimeData) => {
    const url = `${Mock.BASE_URL}showtimes/1`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShowtimeData),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      setShowtimes(newShowtimeData.showtimes);
    }
    return false;
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

    const addMoviesToSchedule = async (showtimeIDsToBeAdded, movieID, showtimesCopy) => {
      for (const showtime of showtimesCopy) {
        if (showtimeIDsToBeAdded.includes(showtime.id)) {
          showtime.movieID = movieID;
        } else {
          if (showtime.movieID == movieID) {
            showtime.movieID = null;
            showtime.theaterLayout = emptyTheaterLayout;
          }
        }
      }
      updateShowtime({ id: 1, showtimes: showtimesCopy });
    };

    addMoviesToSchedule(showtimeIDsToBeAdded, movie.id, showtimesCopy);
  };

  return showtimes ? (
    <div className="showtimes">
      {mode.schedule && (
        <form ref={showtimeForm} className="showtimes-form">
          {showtimes.map((showtime) => {
            const date = new Date(showtime.timestamp * 1000);
            const locked = showtime.movieID != null && showtime.movieID != movie.id;
            const alreadyBooked = showtime.movieID == movie.id;
            return (
              <div key={showtime.id}>
                <div className={`showtime-label ${locked ? "locked" : alreadyBooked ? "alreadyBooked" : "available"}`}>
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
                {showtime.movieID === movie.id && (
                  <button onClick={() => setMode({ schedule: false, showtime: showtime })} className="edit-showtime">
                    {showtime.id}
                  </button>
                )}
              </div>
            );
          })}
          <button
            onClick={(e) => {
              onSubmit(e, movie);
              closeShowtimes();
            }}
          >
            Submit
          </button>
          <button onClick={() => closeShowtimes()}>Cancel</button>
        </form>
      )}
      {mode.showtime && (
        <div>
          <Theater showtime={mode.showtime} editMode={true} callback={(...args) => console.log(args)} />

          <button onClick={() => setMode({ schedule: true, showtime: false })}>Back</button>
        </div>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Showtimes;
