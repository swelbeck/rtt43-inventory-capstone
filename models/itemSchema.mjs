import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: "Uncategorized" },
    quantity: { type: Number, required: true, default: 1, min: 1 },
    datePurchased: { type: Date, default: Date.now() },
    reminderDate: { type: Date },
    addedToShoppingList: { type: Boolean, default: false },
    shoppingStatus: {
      type: String,
      default: "None",
      enum: ["shopping", "bought", "None"],
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("item", ItemSchema);

export default Item;
