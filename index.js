import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 9000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("Backend Connectd");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("backend setup complete");
});

app.use("/api", route);

app.listen(port, () => {
  console.log(`🌐 server is 🐕 ${port}`);
});
