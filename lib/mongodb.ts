import mongoose, { Connection } from "mongoose";

// MongoDB connection string from environment variables
const MONGODB_URI = process?.env?.MONGODB_URI;

// Validate that MONGODB_URI is defined
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Define the shape of the cached connection object
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global type to include our mongoose cache
declare global {
  var mongoose: MongooseCache | undefined;
}

// Use cached connection if available, otherwise initialize a new cache object
// This prevents multiple connections during hot reloads in development
const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

// Store the cache in the global object for persistence across module reloads
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connects to MongoDB using Mongoose with connection caching.
 * Returns the cached connection if available, otherwise creates a new one.
 */
async function connectToDatabase(): Promise<Connection> {
  // Return cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create a new connection
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable buffering for better error handling
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  // Wait for the connection to resolve and cache it
  const mongooseInstance = await cached.promise;
  cached.conn = mongooseInstance.connection;

  return cached.conn;
}

export default connectToDatabase;
