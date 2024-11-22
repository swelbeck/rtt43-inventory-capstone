import express from "express";
import connectDB from "./config/db.mjs";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import itemRoutes from "./routes/itemRoutes.mjs";
import categoryRoutes from "./routes/categoryRoutes.mjs";
import apiRoutes from "./routes/itemAPIRoutes.mjs";

dotenv.config();

//Initialize our app variable with Express
const app = express();

//Connect Database
connectDB();

// Initialize middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

//Single endpoint just to test API. Send data to browser
app.get("/", (req, res) => res.send("API is Running"));

//Define Routes
app.use("/api/items", itemRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/search", apiRoutes);
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`, req.body);
  next();
});

// Environmental Variables
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
