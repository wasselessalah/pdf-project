import mongoose, { Mongoose } from "mongoose";

const MONGO_URL = process.env.MONGO_URI!;

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseConn | undefined;
}

let cached: MongooseConn = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, {
      dbName: 'helllo',
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};
