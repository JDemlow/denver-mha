import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

export async function handler(event, context) {
  try {
    if (!client.isConnected()) await client.connect();
    const db = client.db("your-database-name");
    const collection = db.collection("your-collection-name");
    const buildings = await collection.find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(buildings),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
}
