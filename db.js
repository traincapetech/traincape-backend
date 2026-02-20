import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

// Force IPv4 and set DNS resolution order to help with SRV record lookups
dns.setDefaultResultOrder('ipv4first');

dotenv.config();

const connectDB = async () => {
  try {
    // Use MongoDBURI environment variable, or fall back to MONGO_URI
    const uri = process.env.MongoDBURI || process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MongoDB URI is not defined in environment variables. Please set MongoDBURI or MONGO_URI.");
    }

    console.log("Attempting to connect to MongoDB...");

    // Enhanced connection options to handle DNS and connection issues
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of 30s
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);

    // Provide helpful diagnostics
    if (error.message.includes('querySrv') || error.message.includes('ECONNREFUSED')) {
      console.error("\n🔍 DNS/Network Issue Detected:");
      console.error("  - Check your internet connection");
      console.error("  - Verify MongoDB Atlas cluster is running");
      console.error("  - Check if your IP is whitelisted in MongoDB Atlas");
      console.error("  - Try using a standard connection string instead of SRV format");
    }

    process.exit(1);
  }
};

export { connectDB };