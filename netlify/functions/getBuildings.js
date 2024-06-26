import mongoose from "mongoose";
import Building from "../../models/building.js";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {});
      console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
      console.error("COULD NOT CONNECT TO DATABASE:", error.message);
    }
  }
};

export const handler = async (event, context) => {
  const startTime = Date.now(); // Capture the start time

  await connectToDatabase();

  const limit = parseInt(event.queryStringParameters.limit) || 10;
  const skip = parseInt(event.queryStringParameters.skip) || 0;

  try {
    const buildings = await Building.find().limit(limit).skip(skip);
    const total = await Building.countDocuments();

    const endTime = Date.now(); // Capture the end time
    const duration = endTime - startTime; // Calculate the duration

    console.log(`Function execution time: ${duration} ms`);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ buildings, total, duration }), // Include duration in the response
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Failed to fetch buildings" }),
    };
  }
};
