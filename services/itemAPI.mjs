import axios from "axios";

async function fetchItems(req, res) {
  //   const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=laptop`;
  try {
    //  const response = await axios.get(url);
    //  const itemResults = response.data;
    //  return itemResults;

    const mockData = {
      itemSummaries: [
        {
          title: "Gaming Laptop",
          price: { value: "799.99", currency: "USD" },
          category: "Electronics",
          image: "https://example.com/image.jpg",
        },
      ],
    };

    res.status(200).json(mockData);
  } catch (error) {
    console.error("Error fetching items", error);
    res.status(500).json({ msg: "Error fetching items from api" });
  }
}

export default { fetchItems };
