import initialItems from "../data/data.mjs";
import Item from "../models/itemSchema.mjs";

// CREATE
async function createItem(req, res) {
  try {
    // Create a new item object
    let newItem = new Item(req.body);

    // Save new object to DB
    await newItem.save();

    // Return result
    res.json({ newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error` });
  }
}

// READ
async function getAllItems(req, res) {
  try {
    // Find ALL {} inventory items from DB
    let allItems = await Item.find({});

    // Return results
    res.json(allItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error` });
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
    res.status(500).json({ msg: `Server Error` });
  }
}

// UPDATE
async function updateOneItem(req, res) {
  try {
    let id = req.params.id;
    let item = req.body;

    // Update item by ID from DB
    let updatedItem = await Item.findByIdAndUpdate(id, item, {
      new: true,
    });
    // {new: true} - sends back the newly updated data to the front end

    // Return results
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error` });
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
    res.status(500).json({ msg: `Server Error` });
  }
}

// SEED Database
async function seedDB(req, res) {
  try {
    await Item.deleteMany({});

    await Item.create(initialItems);

    res.json({ msg: "DB seeded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not seed database` });
  }
}

export default {
  createItem,
  getAllItems,
  getOneItem,
  updateOneItem,
  deleteOneItem,
  seedDB,
};
