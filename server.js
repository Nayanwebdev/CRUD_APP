import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mainRouter from "./routes/index.js";
import path,{ dirname} from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT || 6000;
const app = express();
// app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.set('views', path.join(dirname(fileURLToPath(import.meta.url)), 'views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use("/", mainRouter);

app.listen(port, (err) => {
  err ? console.error(err) : console.log("server listening on port " + port);
});
