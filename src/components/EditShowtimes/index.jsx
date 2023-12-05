import React, { useEffect, useRef, useState } from "react";
import Mock from "../../api/MockAPI/mock";
import "./style.css";

const Showtimes = ({ movie }) => {
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

  const updateShowtime = async (newData) => {
    console.log("changes!!!!", newData.id);

    const url = `${Mock.BASE_URL}showtimes/${newData.id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      fetchShowtimes();
    }
  };

  const updateMovie = async (movie, showtimeList) => {
    const newMovie = { ...movie, showtimeIDs: showtimeList };

    const url = `${Mock.MOVIES_URL}/${movie.id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      fetchShowtimes();
    }
  };

  //   const url = `${Mock.MOVIES_URL}/${id}`;
  //   const options = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newMovieData),
  //   };
  //   const response = await fetch(url, options);
  //   if (response.ok) {
  //     fetchMovies();
  //   }

  const onSubmit = (e, movie) => {
    e.preventDefault();

    const newShowtimes = showtimes.map((prop) => {
      return { ...prop };
    });

    const form = new FormData(showtimeForm.current);
    let showtimesList = [];

    form.forEach((showtimeID) => {
      showtimesList.push(showtimeID);
      let showtimeToBeEdited = newShowtimes.find((time) => time.id == showtimeID);
      showtimeToBeEdited.movieID = movie.id;
      updateShowtime(showtimeToBeEdited);
    });

    let toUnbook = movie.showtimeIDs.filter((t) => !showtimesList.includes(t));

    toUnbook.forEach((id) => {
      let showtimeToBeEdited = newShowtimes.find((time) => time.id == id);
      if (showtimeToBeEdited) showtimeToBeEdited.movieID = null;
      updateShowtime(showtimeToBeEdited);
    });

    updateMovie(movie, showtimesList);
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
