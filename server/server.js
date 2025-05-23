import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CamperData from "./models/CamperData.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.post("/api/addCamper", (req, res) => {
  const { date } = req.body;
  console.log("Received date:", date);

  if (!date) {
    return res.status(400).json({ error: "Date is required" });
  }
  const newCamper = new CamperData({ date });
  newCamper
    .save()
    .then(() => res.status(201).json({ message: "Camper added successfully" }))
    .catch((err) =>
      res.status(500).json({ error: "Failed to add camper", details: err })
    );
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
