import express from "express";
import { json } from "body-parser";
import connectDB from './config/mongoose';
import gameRoutes from "./routes/game";
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Connect to MongoDB
connectDB();

app.use(json());

// Routes
app.use("/", gameRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

