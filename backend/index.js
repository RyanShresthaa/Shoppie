import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './route/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet, { crossOriginResourcePolicy } from 'helmet';
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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb', parameterLimit: 50000 }));
function collectAllowedOrigins() {
    const raw = [
        process.env.FRONTEND_URL,
        process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
        process.env.VERCEL_PROJECT_PRODUCTION_URL &&
            `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    ].filter(Boolean);
    return new Set(raw.map((u) => String(u).replace(/\/$/, "")));
}

const allowedOrigins = collectAllowedOrigins();

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        const isLocalhostDev = /^http:\/\/localhost:\d+$/.test(origin || "");
        if (!origin || allowedOrigins.has(origin) || isLocalhostDev) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    allowedHeaders: ['Content-Type', 'Authorization']
}))
const PORT = process.env.PORT || 5000;

app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({ message: 'API is working properly' });
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
    return res.status(error?.status || 500).json({
        message: error?.message || "Internal server error",
        error: true,
        success: false,
    });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})

