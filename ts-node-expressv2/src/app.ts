import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import dotenv from "dotenv";

import articleRoutes from "./routes/article";
import authRoutes from "./routes/auth";
import { CustomError } from "./interfaces/error";

const app = express();
const port: number = 3000;
dotenv.config();

// app.use(bodyParser.json());
app.use(json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/article", articleRoutes);

app.get("/main", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Node.js + Express!");
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data || [];
  res.status(status).json({ message: message, errors: data  });
});

mongoose
  .connect(
    process.env.MONGO_URI as string,
  )
  .then(result => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port} 🔥`);
    });
  })
  .catch(err => console.log(err));

//  npm run build | npm start
