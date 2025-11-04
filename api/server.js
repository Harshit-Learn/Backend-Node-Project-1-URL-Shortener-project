import express from "express";
import mongoose from "mongoose";
import { shortUrl, originalUrl } from "./Controllers/url.js";
import ejs from "ejs";
import path from "path";
import serverless from "serverless-http";
import dotenv from "dotenv";

// For .env
dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));

// View Engine setup for EJS
const __dirname = path.resolve();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB Connection (only once)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: "Url_shortener",
  });
  isConnected = true;
  console.log("MongoDB Connected..");
};
connectDB();

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs", { shortUrl: null });
});

app.post("/short", shortUrl);
app.get("/:shortCode", originalUrl);

// Export for Vercel
export const handler = serverless(app);
