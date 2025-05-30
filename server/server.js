import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CamperData from "./models/CamperData.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.post("/api/addCamper", async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    const existingDate = await CamperData.findOne({ date: date.slice(0, 10) });
    if (existingDate) {
      return res
        .status(400)
        .json({ error: "Camper for this date already exists" });
    }

    const newCamper = new CamperData({ date: date.slice(0, 10) });

    await newCamper.save();

    res.status(201).json({ message: "Camper added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add camper", details: err });
  }
});

app.delete("/api/removeCamper", async (req, res) => {
  try {
    const { date } = req.body;
    console.log(date);

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    const deletedCamper = await CamperData.findOneAndDelete({
      date: date.slice(0, 10),
    });

    if (!deletedCamper) {
      return res.status(404).json({ error: "Camper not found for this date" });
    }

    res.status(200).json({ message: "Camper removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove camper", details: err });
  }
});

app.get("/api/getCampers", async (req, res) => {
  try {
    const campers = await CamperData.find();
    res.status(200).json({ campers });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch campers", details: err });
  }
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
