import mongoose from "mongoose";
import Building from "../../models/building";
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
};
