const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["clothes", "groceries", "household", "misc"],
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
  datePurchased: { type: Date }, // optional
  reminderDate: { type: Date }, // optional
  addedToShoppingList: { type: Boolean, default: false },
});

const Item = mongoose.model("item", ItemSchema);

export default Item;
