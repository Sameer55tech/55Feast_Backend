import express from "express";
import db from "../core/database/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import unauthorized from '../core/routes/unprotected';
import authorized from '../core/routes/protected';

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));

unauthorized(app);
authorized(app);

app.listen(8080, () => {
  console.log(`server running`);
});
