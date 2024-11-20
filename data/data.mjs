const initialItems = [
  { name: "Toothpaste", category: "groceries", quantity: 3 },
  { name: "Shampoo", category: "household", quantity: 1 },
  { name: "Sneakers", category: "clothes", quantity: 1 },
];

const defaultCategories = [
  { name: "clothes", isDefault: true },
  { name: "groceries", isDefault: true },
  { name: "household", isDefault: true },
  { name: "misc", isDefault: true },
];

export default { initialItems, defaultCategories };
