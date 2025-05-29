import React from "react";
import { Calendar as Calendarpack } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import API from "../utils/api";

const Calendar = () => {
  return (
    <div>
      <Calendarpack
        maxDate={new Date()}
        onClickDay={(value, event) => console.log("Clicked day:", value)}
      />
    </div>
  );
};

export default Calendar;
