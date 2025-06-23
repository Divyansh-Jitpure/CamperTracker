import { useContext } from "react";
import Calendar from "../components/Calendar";
import { CamperContext } from "../context/camperContext";
import { useNavigate } from "react-router";

const Home = () => {
  const today = new Date();
  const { addCamper, loading, campers } = useContext(CamperContext);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center pb-10">
        <div className="mx-auto h-20 w-20 animate-spin rounded-full border-6 border-dashed border-[#E5989B]"></div>
        <section className="text-center">
          <h2 className="mt-4 text-3xl text-zinc-700">Hold on</h2>
          <p className="text-2xl text-zinc-500">
            Camper Tracker is starting...
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-15 bg-[#FFF2EB]">
      <section className="flex flex-col items-center justify-center gap-2">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-5xl font-semibold text-[#E5989B]"
        >
          Camper Tracker
        </h1>

        <p className="text-xl">Total Campers: {campers.length}</p>
        <p className="text-xl">Total Campers paid: 8 (200₹)</p>

        <p className="text-3xl">Today is {today.toDateString()}</p>

        <button
          onClick={() => addCamper(today)}
          className="analog-btn cursor-pointer bg-[#FFD6BA] px-3 py-1 text-2xl hover:bg-[#ffcdac]"
        >
          Add Camper For Today
        </button>
      </section>
      <Calendar addCamper={addCamper} />
      <button
        onClick={() => navigate("/bills")}
        className="analog-btn cursor-pointer bg-[#FFD6BA] px-3 py-1 text-2xl hover:bg-[#ffcdac]"
      >
        See Biils
      </button>
    </div>
  );
};

export default Home;
