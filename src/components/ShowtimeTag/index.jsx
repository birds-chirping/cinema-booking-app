import React, { useEffect, useState } from "react";
import Mock from "../../api/MockAPI/mock";

const ShowtimeTag = ({ id }) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const showtime = await Mock.getShowtimeData(id);
      const date = new Date(showtime.timestamp * 1000);
      setDate(date);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  return (
    date && (
      <div>
        <div>
          {date.getDate()}.{date.getMonth() + 1}
        </div>{" "}
        <div>
          {date.getHours()}:{date.getMinutes()}
        </div>
      </div>
    )
  );
};

export default ShowtimeTag;
