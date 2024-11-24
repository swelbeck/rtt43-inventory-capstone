import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    isDefault: { type: Boolean, default: false },
    createdBy: { type: String, default: "user" },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", CategorySchema);

export default Category;