import React, { use, useEffect, useState } from "react";
import { Calendar as Calendarpack } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import API from "../utils/api";

const Calendar = ({ addCamper }) => {
  const [markedDates, setMarkedDates] = useState([]);
  const [campers, setCampers] = useState([]);
  const [selectedDate, setSelectedDate] = useState();

  const getCampers = async () => {
    try {
      const campersAPI = await API.get("/getCampers", {
        withCredentials: true,
      });
      // console.log(campers.data.campers);
      setCampers(campersAPI.data.campers);
      return campersAPI.data.campers;
    } catch (err) {
      console.error(
        "Error fetching campers:",
        err.response?.data || err.message,
      );
      alert(err.response?.data?.error || "Failed to fetch campers");
    }
  };

  useEffect(() => {
    getCampers();
  }, [campers]);

  // useEffect(() => {
  //   console.log(selectedDate);
  // }, [selectedDate]);

  useEffect(() => {
    const dates = campers.map((camper) => new Date(camper.date));
    setMarkedDates(dates);
  }, [campers]);

  const tileClassName = ({ date, view }) => {
    // Only apply class in 'month' view
    if (view === "month") {
      // Check if the current calendar tile's date matches any of our marked dates
      const hasCamperEntry = markedDates.some(
        (markedDate) =>
          date.getFullYear() === markedDate.getFullYear() &&
          date.getMonth() === markedDate.getMonth() &&
          date.getDate() === markedDate.getDate(),
      );
      if (hasCamperEntry) {
        return "has-camper-entry"; // Custom class to highlight the date
      }
    }
    return null;
  };

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Calendarpack
        maxDate={new Date()}
        tileClassName={tileClassName}
        onClickDay={(value, event) => {
          setSelectedDate(value);
          console.log(value);
        }}
      />

      {selectedDate && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-semibold">
            Selected Date: {selectedDate.toDateString()}
          </h2>
          <div className="text-lg">
            {markedDates.some(
              (date) =>
                date.getFullYear() === selectedDate.getFullYear() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getDate() === selectedDate.getDate(),
            ) ? (
              "Camper is present on this date."
            ) : (
              <>
                <p>No camper entry for this date.</p>
                <button
                  onClick={() => addCamper(formatDateToYYYYMMDD(selectedDate))}
                  className="analog-btn rounded-m mt-4 cursor-pointer bg-[#FFD6BA] px-3 py-1 text-2xl hover:bg-[#ffcdac]"
                >
                  Add Camper for this date
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
