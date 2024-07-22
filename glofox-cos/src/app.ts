import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import dotenv from "dotenv";

import glofoxRoutes from "./routes/glofox";

const app = express();
const port: number = 3000;
dotenv.config();

app.use(json());

app.use("/programs", glofoxRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// mongoose
//   .connect(process.env.MONGO_URI as string)
//   .then((result) => {
//     app.listen(port, () => {
//       console.log(`Server is running on http://localhost:${port} 🔥`);
//     });
//   })
//   .catch((err) => console.log(err));
