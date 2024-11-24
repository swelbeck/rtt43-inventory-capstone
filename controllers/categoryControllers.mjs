import defaultData from "../data/data.mjs";
import Category from "../models/categorySchema.mjs";

// CREATE
async function createCategory(req, res) {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ msg: "Category name is required." });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ msg: `Category ${name} already exists.` });
    }
    // Create a new category object
    const newCategory = new Category({
      name,
      isDefault: false,
      createdBy: "user",
    });

    // Save new object to DB
    await newCategory.save();

    // Return result
    res.json({ newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Error adding new category` });
  }
}

// READ

// Check if a category exists
async function checkCategoryExists(req, res) {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ msg: "Category name is required." });
    }

    const category = await Category.findOne({ name });
    if (category) {
      return res.status(200).json({ exists: true });
    }

    res.status(200).json({ exists: false });
  } catch (error) {
    console.error("Error checking category existence:", error);
    res.status(500).json({ msg: "Server error" });
  }
}

async function getAllCategories(req, res) {
  try {
    const { createdBy } = req.query;

    const filter = createdBy ? { createdBy } : {};

    // Find ALL {} categories in DB
    const allCategories = await Category.find(filter);

    // Return results
    res.json(allCategories);
  } catch (error) {
    console.error("Error fetching all categories:", error);
    res
      .status(500)
      .json({ msg: `Server Error - could not retrieve all categories` });
  }
}

async function getOneCategory(req, res) {
  try {
    // Find one category by ID from DB
    let oneCategory = await Category.findById(req.params.id);

    // Return results
    res.json(oneCategory);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: `Server Error - could not find category in DB` });
  }
}

// UPDATE
async function updateOneCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, isDefault } = req.body;

    // Update one category by ID
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, isDefault },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }
    // Return results
    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category", error);
    res.status(500).json({ msg: `Server Error - could not update category` });
  }
}

// DELETE
async function deleteOneCategory(req, res) {
  try {
    // Delete one category from DB by ID
    const deletedCategory = await Category.findByIdAndDelete(
      req.params.id,
      req.body
    );

    if (!deletedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }

    // Return results
    res.json(deletedCategory);
  } catch (error) {
    console.error("Error deleting category", error);
    res.status(500).json({ msg: `Server Error - could not delete category` });
  }
}

// SEED Category DB
async function seedCategoryDB(req, res) {
  try {
    // Delete existing entries in DB
    await Category.deleteMany({});

    // Map "system" in createdBy for default categories
    const defaultCategories = defaultData.defaultCategories.map((cat) => ({
      ...cat,
      createdBy: "system",
    }));

    await Category.create(defaultCategories);

    res.json({ msg: "Category DB seeded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not seed database` });
  }
}

export default {
  createCategory,
  checkCategoryExists,
  getAllCategories,
  getOneCategory,
  updateOneCategory,
  deleteOneCategory,
  seedCategoryDB,
};
