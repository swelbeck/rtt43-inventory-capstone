import express from "express";
import categoryCTRL from "../controllers/categoryControllers.mjs";

const router = express.Router();

// Seed Route
// router.route("/seed").get(categoryCTRL.seedCategoryDB);

// Create & Read
router
  .route("/")
  .post(categoryCTRL.createCategory)
  .get(categoryCTRL.getAllCategories);

export default router;
