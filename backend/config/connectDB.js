import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const globalForMongoose = globalThis;

/** Reuse connection across Vercel serverless invocations */
async function connectDB() {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not set");
    }

    if (globalForMongoose.__mongooseConn) {
        return globalForMongoose.__mongooseConn;
    }

    if (!globalForMongoose.__mongoosePromise) {
        globalForMongoose.__mongoosePromise = mongoose
            .connect(process.env.MONGODB_URI, {
                maxPoolSize: 10,
                bufferCommands: false,
            })
            .then((m) => {
                globalForMongoose.__mongooseConn = m.connection;
                console.log("connect DB");
                return m.connection;
            })
            .catch((err) => {
                globalForMongoose.__mongoosePromise = null;
                throw err;
            });
    }

    return globalForMongoose.__mongoosePromise;
}

export default connectDB;
