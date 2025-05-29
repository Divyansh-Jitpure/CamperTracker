import React from "react";
import API from "../utils/api";
import Calendar from "../components/Calendar";

const Home = () => {
  const today = new Date();
  console.log(today);

  const addCamper = () => {
    API.post("/addCamper", { date: today })
      .then((response) => {
        console.log("Camper added successfully:", response.data);
        alert("Camper added successfully!");
      })
      .catch((error) => {
        console.log(
          "Error adding camper:",
          error.response?.data || error.message,
        );
        alert(error.response?.data?.error || "Failed to add camper");
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-[#FFF2EB]">
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-semibold text-[#E5989B]">
          Camper Tracker
        </h1>

        <p className="my-10 text-3xl">Today is {today.toDateString()}</p>

        <button
          onClick={addCamper}
          className="analog-btn cursor-pointer rounded-md bg-[#FFD6BA] px-3 py-1 text-2xl hover:bg-[#ffcdac]"
        >
          Add Camper
        </button>
      </section>
      <Calendar />
    </div>
  );
};

export default Home;
