import React from "react";
import { CamperContext } from "../context/camperContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";

const Bills = () => {
  const { loading, uploadBill } = useContext(CamperContext);
  const [bill, setBill] = useState();

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
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-10 bg-[#FFF2EB]">
      <h1>Upload Biils</h1>
      <input
        type="file"
        name=""
        onChange={(e) => setBill(e.target.files[0])}
        className=""
      />
      <button
        className="analog-btn"
        onClick={() => {
          uploadBill(bill);
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default Bills;
