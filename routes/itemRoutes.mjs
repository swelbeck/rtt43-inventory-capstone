import express from "express";
import itemCTRL from "../controllers/itemControllers.mjs";

const router = express.Router();

// Seed Route
// router.route("/seed").get(itemCTRL.seedDB);

// Create & Read
router.route("/").post(itemCTRL.createItem).get(itemCTRL.getAllItems);

// // Update & Delete
router
  .route("/:id")
  .put(itemCTRL.updateOneItem)
  .delete(itemCTRL.deleteOneItem)
  .get(itemCTRL.getOneItem);



export default router;
