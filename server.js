import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// heroku
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import db_conn from "./config/Database.js";
import pregnantRouter from "./app/pregnant/router.js";
import userRouter from "./app/user/router.js";
import dashboardRouter from "./app/dashboard/router.js";

const app = express();

// heroku
const dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 5000;
const API_Version = process.env.API_VERSION;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
// heroku
app.use(express.static(path.join(dirname, "client", "build")));

app.use(`/${API_Version}/pregnant`, pregnantRouter);
app.use(`/${API_Version}/user`, userRouter);
app.use(`/${API_Version}/dashboard`, dashboardRouter);

// heroku
app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "client", "build", "index.html"));
});

try {
  db_conn.on("open", () => {
    console.log(`database connected`);
    app.listen(port, () =>
      console.log(`Server running on port http://localhost:${port}`)
    );
  });
} catch (error) {
  console.error("error : ", error);
}
