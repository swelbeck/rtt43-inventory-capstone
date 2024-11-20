import defaultData from "../data/data.mjs";
import Category from "../models/categorySchema.mjs";

// CREATE
async function createCategory(req, res) {
  try {
    
    // Create a new category object
    let newCategory = new Category(req.body);

    // Save new object to DB
    await newCategory.save();

    // Return result
    res.json({ newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error` });
  }
}

// READ
async function getAllCategories(req, res) {
  try {
    // Find ALL {} categories in DB
    let allCategories = await Category.find({});

    // Return results
    res.json(allCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error` });
  }
}

// SEED Category DB
async function seedCategoryDB(req, res) {
  try {
    await Category.deleteMany({});

    await Category.create(defaultData.defaultCategories);

    res.json({ msg: "DB seeded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not seed database` });
  }
}

export default { createCategory, getAllCategories, seedCategoryDB };
