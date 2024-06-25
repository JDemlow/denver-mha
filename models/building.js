import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema({
  buildingId: String,
  streetAddress: String,
  buildingSize: String,
  propertyUse1st: String,
  propertyUse2nd: String,
  propertyUse3rd: String,
  benchmarkingStatus: String,
  currentSiteEUI: Number,
  baseline2019EUI: Number,
  firstTarget2025EUI: Number,
  secondTarget2027EUI: Number,
  finalTarget2030EUI: Number,
});

const Building = mongoose.model("Building", buildingSchema);

export default Building;
