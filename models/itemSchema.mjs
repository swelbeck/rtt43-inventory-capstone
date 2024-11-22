import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
    },
    quantity: { type: Number, required: true, default: 1, min: 1 },
    datePurchased: { type: Date, default: Date.now() }, // optional
    reminderDate: { type: Date }, // optional
    addedToShoppingList: { type: Boolean, default: false },
    shoppingStatus: {
      type: String,
      default: false,
      enum: ["shopping", "bought"],
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("item", ItemSchema);

export default Item;
