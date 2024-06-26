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
    const building = await Building.findById(event.pathParameters.id);
    return {
      statusCode: 200,
      body: JSON.stringify(building),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
}
