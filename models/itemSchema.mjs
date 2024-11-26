import mongoose from "mongoose";
import Category from "./categorySchema.mjs";

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      default: "uncategorized",
      validate: {
        validator: async function (value) {
          const categoryExists = await Category.findOne({ name: value });
          return categoryExists || value === "uncategorized"; // Allow "uncategorized" or valid category name
        },
        message: (props) => `${props.value} is not a valid category!`,
      },
    },
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

ItemSchema.index({ name: 1 });

const Item = mongoose.model("item", ItemSchema);

export default Item;
