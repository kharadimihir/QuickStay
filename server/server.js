import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express"
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import connectCloudinary from "./configs/cloudinary.js";
import hotelRouter from "./routes/HotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import userRouter from "./routes/userRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";


configDotenv();
connectDB();
connectCloudinary();

const app = express();
app.use(cors);


// Middlewares
app.use(express.json());
app.use(clerkMiddleware());

// API to listen to Clerk Webhooks
// Clerk webhook needs raw body
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
    res.send("App is working very very fine");
});
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})