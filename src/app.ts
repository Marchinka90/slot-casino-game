import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";


import gameRoutes from "./routes/game";

const app = express();

app.use(json());

app.use("/", gameRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Error middleware handler
  res.status(500).json({ message: err.message });
});

app.listen(3000);


