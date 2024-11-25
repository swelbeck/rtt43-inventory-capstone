import axios from "axios";
import crypto from "crypto";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// API Credentials from .env
const consumerID = process.env.CONSUMER_ID; // Your Walmart Consumer ID
const privateKeyPath = "./keys/WM_IO_private_key.pem"; // Path to your private key

// Function to generate the signature needed for authentication
function generateSignature(signatureString, privateKey) {
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signatureString);
  sign.end();
  return sign.sign(privateKey, "base64");
}

// Function to search products using the Walmart API
async function searchProducts(req, res) {
  // Get the query parameter or default to 'laptop'
  const query = req.query.query || "laptop"; // Default search term if query param is missing

  // Create the timestamp and signature string
  const timestamp = Date.now();
  const apiKeyVersion = "1"; // Walmart API version
  const signatureString = `WM_CONSUMER.ID=${consumerID}&WM_CONSUMER.INTIMESTAMP=${timestamp}&WM_SEC.KEY_VERSION=${apiKeyVersion}`;

  try {
    // Read the private key from file
    const privateKey = fs.readFileSync(privateKeyPath, "utf8");

    // Generate the signature using the private key
    const signature = generateSignature(signatureString, privateKey);

    // Set up the Walmart API request URL
    const apiUrl =
      "https://api.walmart.com/api-proxy/service/affil/product/v2/search";

    // Set up the headers for the request
    const headers = {
      "WM_CONSUMER.ID": consumerID,
      "WM_CONSUMER.INTIMESTAMP": timestamp,
      "WM_SEC.KEY_VERSION": apiKeyVersion,
      "WM_SEC.AUTH_SIGNATURE": signature,
      "Content-Type": "application/json",
    };

    // Set the query parameters for the request
    const params = { query, limit: 10 }; // Modify the limit as needed

    // Make the GET request to Walmart API
    const response = await axios.get(apiUrl, { headers, params });

    // Send the response from Walmart back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Walmart data:", error);
    res.status(500).json({ msg: "Error fetching Walmart products" });
  }
}

export default { searchProducts };
