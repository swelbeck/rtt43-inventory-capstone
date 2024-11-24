const initialItems = [
  { name: "Toothpaste", category: "groceries", quantity: 3 },
  { name: "Shampoo", category: "household", quantity: 1 },
  { name: "Sneakers", category: "clothes", quantity: 1 },
];

const defaultCategories = [
  { name: "Groceries", isDefault: true, createdBy: "system" },
  { name: "Clothes", isDefault: true, createdBy: "system" },
  { name: "Household", isDefault: true, createdBy: "system" },
  { name: "Miscellaneous", isDefault: true, createdBy: "system" },
];

export default { initialItems, defaultCategories };
