import express from "express";
import db from "../core/database/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import unauthorized from "../core/routes/unprotected";
import authorized from "../core/routes/protected";
import { middleware } from "../core/middleware";

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));

unauthorized(app);
middleware(app);
authorized(app);

app.listen(8080, () => {
  console.log(`server running on port 8080`);
});
