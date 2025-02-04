import path from 'path';
import express, { Application } from "express";
import { json } from "body-parser";
import connectDB from "./config/mongoose";
import { initializeWalletId } from "./config/initializeWallet";
import { initializeGame } from "./config/initializeGame";
import gameRoutes from "./routes/game";
import walletRoutes from "./routes/wallet";
import { errorHandler } from "./middlewares/errorHandler";
import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '../../.env') });

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB().then(async () => {
  await initializeWalletId();
}).then(() => {
  initializeGame();
});

app.use(json());

// Routes
app.use("/wallet", walletRoutes);
app.use("/", gameRoutes);

// Error Handling Middleware
app.use(errorHandler);

let server: any = null;
server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const stopApp = async () => {
  if (server) {
    server.close();
  }
};

export default app;
