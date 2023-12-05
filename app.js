import express from "express";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import "dotenv/config";
import session from "express-session";
mongoose.connect(process.env.DB_CONNECTION_STRING);
const app = express();
app.use(
  cors({
    credentials: true,
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
