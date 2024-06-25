import mongoose from "mongoose";
import Building from "./models/building.js";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

export async function handler(event) {
  // Removed context parameter
  await connectToDatabase();

  const limit = parseInt(event.queryStringParameters.limit) || 10;
  const skip = parseInt(event.queryStringParameters.skip) || 0;

  try {
    const buildings = await Building.find().limit(limit).skip(skip);
    const total = await Building.countDocuments();
    return {
      statusCode: 200,
      body: JSON.stringify({ buildings, total }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch buildings" }),
    };
  }
}
