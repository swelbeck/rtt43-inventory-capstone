import express from "express";
import itemAPI from "../services/itemAPI.mjs";

const router = express.Router();

// Read
router.route("/").get(itemAPI.fetchItems);


export default router;
