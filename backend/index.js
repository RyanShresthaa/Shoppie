import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './route/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import connectDB from './config/connectDB.js';
import categoryRouter from './route/category.route.js';
import uploadRouter from './route/upload.route.js';
import subCategoryRouter from './route/subcategory.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import addressRouter from './route/address.route.js';
import orderRouter from './route/order.route.js';
import paymentRouter from './route/payment.route.js';
import adminRouter from './route/admin.route.js';

const app = express();

// Vercel sends /_/backend/api/...; express only knows /api, so we strip the prefix
app.use((req, res, next) => {
    const prefix = "/_/backend";
    const raw = req.url || "/";
    const q = raw.indexOf("?");
    const pathPart = q === -1 ? raw : raw.slice(0, q);
    const query = q === -1 ? "" : raw.slice(q);
    if (pathPart === prefix || pathPart.startsWith(prefix + "/")) {
        const rest = pathPart.slice(prefix.length) || "/";
        req.url = rest + query;
    }
    next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb', parameterLimit: 50000 }));
// creds + reflect origin (works on preview domains)
app.use(
    cors({
        credentials: true,
        origin: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)
const PORT = process.env.PORT || 5000;

app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({ message: 'API is working properly' });
});

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("MongoDB:", err?.message || err);
        return res.status(503).json({
            message: err?.message || "Database unavailable",
            error: true,
            success: false,
        });
    }
});

app.get("/api/health", (req, res) => {
    res.json({
        ok: true,
        db: mongoose.connection.readyState,
    });
});

app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/file', uploadRouter)
app.use('/api/subcategory', subCategoryRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/admin', adminRouter)

app.use((req, res) => {
    return res.status(404).json({
        message: "API route not found",
        error: true,
        success: false,
    });
});

app.use((error, req, res, next) => {
    console.error("Unhandled error:", error?.stack || error?.message || error);
    return res.status(error?.status || 500).json({
        message: error?.message || "Internal server error",
        error: true,
        success: false,
    });
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB startup:", err?.message || err);
        if (process.env.VERCEL !== "1") {
            process.exit(1);
        }
    });

