import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// so Vercel cold/warm invocations don't spin up 10 mongo clients
const globalForMongoose = globalThis;

const READY_CONNECTED = 1;

async function connectDB() {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not set");
    }

    const existing = globalForMongoose.__mongooseConn;
    if (existing && existing.readyState === READY_CONNECTED) {
        return existing;
    }

    // still handshaking, don't start another connect
    if (existing && existing.readyState === 2 && globalForMongoose.__mongoosePromise) {
        return globalForMongoose.__mongoosePromise;
    }

    if (existing && (existing.readyState === 0 || existing.readyState === 3)) {
        globalForMongoose.__mongoosePromise = null;
        globalForMongoose.__mongooseConn = null;
        try {
            await existing.close();
        } catch {
            // ignore
        }
    }

    if (!globalForMongoose.__mongoosePromise) {
        globalForMongoose.__mongoosePromise = mongoose
            .connect(process.env.MONGODB_URI, {
                maxPoolSize: 10,
                bufferCommands: false,
            })
            .then((m) => {
                globalForMongoose.__mongooseConn = m.connection;
                console.log("mongodb up");
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
