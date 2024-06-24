import mongoose from "mongoose";
import Building from "./models/building"; // Adjust the path to your models
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
    const building = await Building.findByIdAndUpdate(
      event.pathParameters.id,
      JSON.parse(event.body),
      {
        new: true,
      }
    );
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
