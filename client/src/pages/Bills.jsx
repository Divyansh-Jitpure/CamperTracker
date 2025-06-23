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
    <div className="flex min-h-[100dvh] flex-col items-center justify-between bg-[#FFF2EB]">
      <div className="my-10 flex flex-col gap-4">
        <h1 className="text-center text-5xl font-semibold text-[#E5989B]">
          Camper Bills
        </h1>
        <section className="flex flex-col">
          <h2 className="text-2xl">Upload Bills</h2>
          <div className="flex gap-2">
            <input
              type="file"
              name=""
              onChange={(e) => setBill(e.target.files[0])}
              className="file-input block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 file:border-r-2 file:pr-1 file:font-bold focus:outline-none"
            />

            <button
              className="analog-btn cursor-pointer bg-[#FFD6BA] px-3 py-1 text-2xl hover:bg-[#ffcdac]"
              onClick={() => {
                uploadBill(bill);
              }}
            >
              Upload
            </button>
          </div>
        </section>
      </div>
      <div className="">
        
      </div>
    </div>
  );
};

export default Bills;
