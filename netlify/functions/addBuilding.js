import mongoose from "mongoose";
import Building from "../../models/building.js";
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

export async function handler(event, context) {
  await connectToDatabase();

  try {
    const building = new Building(JSON.parse(event.body));
    await building.save();
    return {
      statusCode: 200,
      body: JSON.stringify(building),
    };
  } catch (err) {
    console.error("Error adding building:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
