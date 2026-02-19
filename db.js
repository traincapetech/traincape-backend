import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

// Fix for ECONNREFUSED on some networks by forcing Google DNS
try {
  dns.setServers(['8.8.8.8']);
} catch (error) {
  console.warn("Could not set DNS servers:", error);
}

dotenv.config();

const connectDB = async () => {
  try {
    // Use MongoDBURI environment variable, or fall back to MONGO_URI
    const uri = process.env.MongoDBURI || process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MongoDB URI is not defined in environment variables. Please set MongoDBURI or MONGO_URI.");
    }

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export { connectDB };