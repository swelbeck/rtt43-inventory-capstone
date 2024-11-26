
# Home Inventory Management (Back-End)

## Description
This is the back-end API for the **Inventory Management Application**, built using **Node.js** and **Express**. The API provides endpoints for managing inventory items and categories.

The back-end integrates with a **MongoDB** database to store item and category data. It supports CRUD operations for both items and categories, as well as an API for searching and managing shopping list status.

## Features
- **CRUD Operations for Inventory Items**: Users can add, update, retrieve, and delete inventory items.
- **CRUD Operations for Categories**: Users can add, update, retrieve, and delete categories for inventory items.
- **Toggle Shopping List Status**: Items can be toggled between shopping and bought statuses.
- **Integration with eBay API**: Users can search for products from eBay and add them to their inventory.

## Technologies
- **Node.js**: JavaScript runtime for the server-side application.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing inventory and category data.
- **Axios**: For making external API requests (e.g., to eBay).
- **Mongoose**: ODM for MongoDB.

## Routes
| **Route**                         | **Method**  | **Description**                                                                                             |
|-----------------------------------|-------------|-------------------------------------------------------------------------------------------------------------|
| `/api/items`                      | `GET`       | Fetch all inventory items.                                                                                   |
| `/api/items`                      | `POST`      | Create a new inventory item.                                                                                 |
| `/api/items/:id`                  | `GET`       | Fetch a single item by ID.                                                                                   |
| `/api/items/:id`                  | `PUT`       | Update an existing item by ID.                                                                               |
| `/api/items/:id`                  | `DELETE`    | Delete an item by ID.                                                                                        |
| `/api/items/:id/toggle-shopping`  | `PUT`       | Toggle the shopping status of an item (between shopping and bought).                                         |
| `/api/categories`                 | `GET`       | Fetch all categories.                                                                                        |
| `/api/categories`                 | `POST`      | Create a new category.                                                                                       |
| `/api/categories/exists/:name`    | `GET`       | Check if a category with a given name already exists.                                                        |
| `/api/categories/:id`             | `GET`       | Fetch a single category by ID.                                                                               |
| `/api/categories/:id`             | `PUT`       | Update an existing category by ID.                                                                           |
| `/api/categories/:id`             | `DELETE`    | Delete a category by ID.                                                                                     |
| `/api/search`                     | `GET`       | Search for products (e.g., from eBay).                                                                       |

- **Seed Routes**:
  - `/api/items/seed` (GET): Seed the inventory with initial data.
  - `/api/categories/seed` (GET): Seed categories with default data.


### Back-End Setup

1. Clone the repository:
2. Navigate to the project directory
3. Install dependencies
4. Set up your `.env` file with your environment variables (e.g. MongoDB URI, API KEY, etc.)
5. Run the development server

## Front-End Integration
The back-end API is consumed by the front-end application, which allows users to interact with the inventory and shopping list. For details on how to set up and run the front-end application, refer to the front-end repository: [Home Inventory Frontend](https://github.com/swelbeck/rtt43-inventory-capstone-frontend)
