import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const buildingSchema = new mongoose.Schema({
  id: String,
  buildingName: String,
  type: String,
  description: String,
  location: String,
  rent: String,
  company: Object,
});

const Building = mongoose.model("Building", buildingSchema);

app.get("/api/buildings", async (req, res) => {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/buildings/:id", async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    res.json(building);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/buildings", async (req, res) => {
  try {
    const building = await new Building({
      id: req.body.id,
      buildingName: req.body.buildingName,
      type: req.body.type,
      description: req.body.description,
      location: req.body.location,
      rent: req.body.rent,
      company: req.body.company,
    })
    await building.save()
    res.json(building);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});
app.put("/api/buildings/:id", async (req, res) => {
  try {
    const building = await Building.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(building);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
