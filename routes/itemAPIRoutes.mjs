import express from "express";
import apiCTRL from "../controllers/itemAPIControllers.mjs";
const router = express.Router();

// Read
router.route("/").get(apiCTRL.searchProducts);

export default router;
