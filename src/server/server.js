import express from "express";
import db from "../core/database/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import unauthorized from '../core/routes/unprotected/index.js';

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

unauthorized(app);

app.listen(8080, () => {
  console.log(`server running`);
});
