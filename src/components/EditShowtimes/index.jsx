import React, { useEffect, useRef, useState } from "react";
import Mock from "../../api/MockAPI/mock";
import "./style.css";
import { emptyTheaterLayout } from "../../theaterModel/theaterModel";
import Theater from "../Theater";

const Showtimes = ({ movie, showtimes, setShowtimes, closeShowtimes, mode, setMode }) => {
  const showtimeForm = useRef();
  const selectedSeats = useRef({
    toAdd: new Set(),
    toRemove: new Set(),
  });

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
    // const showtimesCopy = showtimes.map((prop) => {
    //   return { ...prop };
    // });
    const showtimesCopy = JSON.parse(JSON.stringify(showtimes));
    const form = new FormData(showtimeForm.current);

    const showtimeIDsToBeAdded = [];
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

  const handleSeatClick = (row, index, checked, booked) => {
    const seat = `${row}_${index}`;

    if (checked) {
      if (!booked) {
        selectedSeats.current.toAdd.add(seat);
      }
      selectedSeats.current.toRemove.delete(seat);
    } else {
      selectedSeats.current.toAdd.delete(seat);
      if (booked) {
        selectedSeats.current.toRemove.add(seat);
      }
    }
  };

  const handleSaveSeats = async () => {
    const dict = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
    };
    const newShowtimes = JSON.parse(JSON.stringify(showtimes));
    const newShowtime = JSON.parse(JSON.stringify(mode.showtime));

    selectedSeats.current.toAdd.forEach((seat) => {
      seat = seat.split("_");
      newShowtime.theaterLayout[dict[seat[0]]].seats[seat[1]] = false;
    });
    selectedSeats.current.toRemove.forEach((seat) => {
      seat = seat.split("_");
      newShowtime.theaterLayout[dict[seat[0]]].seats[seat[1]] = true;
    });

    const index = newShowtimes.findIndex((elem) => {
      return elem.id == newShowtime.id;
    });
    newShowtimes[index] = newShowtime;

    await updateShowtime({ id: 1, showtimes: newShowtimes });
    selectedSeats.current.toAdd.clear();
    selectedSeats.current.toRemove.clear();
    setMode({ schedule: true, showtime: false });
  };

  return showtimes ? (
    <div className="showtimes-form-wrapper">
      {mode.schedule && (
        <form ref={showtimeForm} className="showtimes-form">
          <div className="showtimes-list">
            {showtimes.map((showtime) => {
              const date = new Date(showtime.timestamp * 1000);
              const locked = showtime.movieID != null && showtime.movieID != movie.id;

              const alreadyBooked = showtime.movieID == movie.id;
              // <div className={`showtime-label ${locked ? "locked" : alreadyBooked ? "alreadyBooked" : "available"}`}>

              return (
                <div className="showtime-wrapper" key={showtime.id}>
                  <div className="showtime-tag">
                    <input
                      value={showtime.id}
                      type="checkbox"
                      name="showtime"
                      id={`showtime_${showtime.id}`}
                      disabled={locked}
                      defaultChecked={showtime.movieID}
                    />
                    <label
                      className={`showtime-label ${alreadyBooked && "already-booked"}`}
                      htmlFor={`showtime_${showtime.id}`}
                    >
                      <div>
                        {date.getDate()}.{date.getMonth() + 1}
                      </div>{" "}
                      <div>
                        {date.getHours()}:{date.getMinutes()}
                      </div>
                    </label>
                  </div>
                  {/* <div>{showtime.id}</div>
            <div>{showtime.timestamp}</div>
          <div>{showtime.movieID}</div> */}
                  {showtime.movieID === movie.id && (
                    <button onClick={() => setMode({ schedule: false, showtime: showtime })} className="edit-showtime">
                      {/* {showtime.id} */}
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="showtimes-form-buttons">
            <button
              className="submit"
              onClick={(e) => {
                onSubmit(e, movie);
                closeShowtimes();
              }}
            >
              Submit
            </button>
            <button className="cancel" onClick={() => closeShowtimes()}>
              Cancel
            </button>
          </div>
        </form>
      )}
      {mode.showtime && (
        <div className="showtime-bookings">
          <Theater showtime={mode.showtime} editMode={true} callback={handleSeatClick} />
          <button className="submit" onClick={handleSaveSeats}>
            Save changes
          </button>
          <button className="back-button" onClick={() => setMode({ schedule: true, showtime: false })}>
            Cancel
          </button>
        </div>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Showtimes;
