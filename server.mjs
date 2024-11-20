import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.mjs";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import itemRoutes from "./routes/itemRoutes.mjs";
import categoryRoutes from "./routes/categoryRoutes.mjs";

dotenv.config();

//Initialize our app variable with Express
const app = express();

//Connect Database
connectDB();

// Initialize middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan("tiny"));

//Single endpoint just to test API. Send data to browser
app.get("/", (req, res) => res.send("API is Running"));

//Define Routes
app.use("/api/items", itemRoutes);
app.use("/api/categories", categoryRoutes);

// Environmental Variables
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
