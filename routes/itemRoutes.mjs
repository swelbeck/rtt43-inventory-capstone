import express from "express";
import itemCTRL from "../controllers/itemControllers.mjs";

const router = express.Router();

// Create & Read
router.route("/").post(itemCTRL.createItem).get(itemCTRL.getAllItems);

// // Update & Delete
router
  .route("/:id")
  .put(itemCTRL.updateOneItem)
  .delete(itemCTRL.deleteOneItem)
  .get(itemCTRL.getOneItem);

// router.route("/seed").get(itemCTRL.seedDB);

export default router;
