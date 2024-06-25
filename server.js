import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Building from "./models/building.js"; // Import the model

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
    console.error("COULD NOT CONNECT TO DATABASE:", error.message);
  }
};

connectToDatabase();

// API ROUTES

// GET ALL BUILDINGS
app.get("/api/getBuildings", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;
  try {
    const buildings = await Building.find().limit(limit).skip(skip);
    const total = await Building.countDocuments();
    res.json({ buildings, total });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch buildings" });
  }
});

// GET SINGLE BUILDING
app.get("/api/buildings/:id", async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    res.json(building);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET BUILDING COUNT
app.get("/api/buildings/count", async (req, res) => {
  try {
    const count = await Building.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch building count" });
  }
});

// UPDATE BUILDING
app.patch("/api/buildings/:id", async (req, res) => {
  try {
    const building = await Building.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(building);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ADD BUILDING
app.post("/api/buildings", async (req, res) => {
  try {
    const building = new Building(req.body);
    await building.save();
    res.json(building);
  } catch (err) {
    console.error("Error adding building:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
