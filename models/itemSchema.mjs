import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      // enum: ["clothes", "groceries", "household", "misc"],
      required: true,
    },
    quantity: { type: Number, required: true, default: 1, min: 1 },
    datePurchased: { type: Date, default: Date.now() }, // optional
    reminderDate: { type: Date }, // optional
    addedToShoppingList: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Item = mongoose.model("item", ItemSchema);

export default Item;
