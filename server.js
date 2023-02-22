import express from "express";
import cors from "cors";
import "dotenv/config";
import mainRouter from "./routes/index.js";

const port = process.env.PORT || 6000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/", mainRouter);

app.listen(port, (err) => {
  err ? console.error(err) : console.log("server listening on port " + port);
});
