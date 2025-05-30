import React, { useEffect, useState } from "react";
import API from "../utils/api";
import Calendar from "../components/Calendar";

const Home = () => {
  const today = new Date();
  console.log(today);

  const addCamper = async (day) => {
    await API.post("/addCamper", { date: day })
      .then((response) => {
        console.log("Camper added successfully:", response.data);
        alert("Camper added successfully!");
      })
      .catch((error) => {
        console.error(
          "Error adding camper:",
          error.response?.data || error.message,
        );
        alert(error.response?.data?.error || "Failed to add camper");
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-15 bg-[#FFF2EB]">
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-semibold text-[#E5989B]">
          Camper Tracker
        </h1>

        <p className="my-5 text-3xl">Today is {today.toDateString()}</p>

        <button
          onClick={() => addCamper(today)}
          className="analog-btn cursor-pointer rounded-md bg-[#FFD6BA] px-3 py-1 text-2xl hover:bg-[#ffcdac]"
        >
          Add Camper For Today
        </button>
      </section>
      <Calendar addCamper={addCamper} />
    </div>
  );
};

export default Home;
