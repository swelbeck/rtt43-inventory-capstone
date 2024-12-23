import initialData from "../data/data.mjs";
import Item from "../models/itemSchema.mjs";

// CREATE
async function createItem(req, res) {
  try {
    const { name, category } = req.body;

    // Normalize name and category to lowercase for case-insensitive comparison
    const normalizedName = name.toLowerCase().trim();
    const normalizedCategory = category
      ? category.toLowerCase().trim()
      : "uncategorized";

    // Check if an item with the same name and category already exists
    const existingItem = await Item.findOne({
      name: normalizedName,
      category: normalizedCategory,
    });

    if (existingItem) {
      return res
        .status(400)
        .json({ msg: "Item already exists in this category." });
    }

    const newItemData = {
      ...req.body,
      name: normalizedName,
      category: normalizedCategory,
    };

    // Create a new item object
    let newItem = new Item(newItemData);

    // Save new object to DB
    await newItem.save();

    // Return result
    // res.json({ newItem: newItem.toObject() });
    res.json({ newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not create new item` });
  }
}

// READ
async function getAllItems(req, res) {
  // res.setHeader("Cache-Control", "no-store");
  try {
    // Find ALL {} inventory items from DB
    let allItems = await Item.find({});

    // Return results
    res.json(allItems);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: `Server Error - could not retrieve all items` });
  }
}

async function getOneItem(req, res) {
  try {
    // Find one item in inventory by ID from DB
    let oneItem = await Item.findById(req.params.id);

    // Return results
    res.json(oneItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not retrieve item` });
  }
}

async function getItemsByCategory(req, res) {
  const { category } = req.params;
  try {
    // Find items by category from DB
    let itemsByCategory = await Item.find({ category: category });

    // Return results
    if (itemsByCategory.length === 0) {
      return res
        .status(404)
        .json({ msg: `No items found for category: ${category}` });
    }

    res.json(itemsByCategory);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: `Server Error - could not retrieve items by category` });
  }
}

async function getItemsByStatus(req, res) {
  const { shoppingStatus } = req.params;

  try {
    const items = await Item.find({ shoppingStatus });

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching items by status" });
  }
}

// UPDATE
async function updateOneItem(req, res) {
  try {
    const { id } = req.params;
    let item = req.body;

    if (!id) {
      return res.status(400).json({ msg: "Item ID is required" });
    }

    // Update item by ID from DB
    const updatedItem = await Item.findByIdAndUpdate(id, item, {
      new: true,
    });

    // Return results
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not update item` });
  }
}

async function updateItemsCategory(req, res) {
  const { category } = req.params; 
  try {
    // Update all items to "uncategorized" when the category is deleted
    await Item.updateMany(
      { category: category }, // Find items with the specified category name
      { $set: { category: "uncategorized" } } // Update the category field to "uncategorized"
    );
    // Only send a response after the update is completed
    return res.status(200).json({ msg: "Items updated to uncategorized." });

    // res.status(200).json({ msg: "Items updated to uncategorized." });
  } catch (error) {
    console.error("Error updating items category:", error);
    res.status(500).json({ msg: "Error updating items category" });
  }
}

// toggle shopping list
async function toggleShoppingListStatus(req, res) {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    // Set shopping status
    item.shoppingStatus =
      item.shoppingStatus === "shopping" ? "bought" : "shopping";
    // console.log(`Toggling item with id: ${id} to ${item.shoppingStatus}`);
    await item.save();

    res.json(item);
  } catch (error) {
    console.error("Error toggling shopping list status:", error);
    res.status(500).json({ msg: "Server error" });
  }
}

// DELETE
async function deleteOneItem(req, res) {
  try {
    // Delete one from DB by ID
    let deletedItem = await Item.findByIdAndDelete(req.params.id, req.body);

    // Return results
    res.json(deletedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not delete item` });
  }
}

// SEED Database
async function seedDB(req, res) {
  try {
    await Item.deleteMany({});

    await Item.create(initialData.initialItems);

    res.json({ msg: "Item DB seeded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not seed database` });
  }
}

export default {
  createItem,
  getAllItems,
  getOneItem,
  getItemsByCategory,
  getItemsByStatus,
  updateOneItem,
  updateItemsCategory,
  toggleShoppingListStatus,
  deleteOneItem,
  seedDB,
};
