import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(
  cors(
    { origin: "http://localhost:5173" } // Replace with your frontend URL}
  )
);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
