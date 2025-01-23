# CRUD Application with Node.js, Express, EJS, and MongoDB

This README provides instructions and details for building a CRUD application consisting of two modules:

1. **Category Master** - HTML page with CRUD operations for categories.
2. **Product Master** - HTML page with CRUD operations for products. Each product belongs to a category.

The Product Master also includes a paginated product list that displays:

- ProductId
- ProductName
- CategoryName
- CategoryId

Pagination is implemented server-side, extracting records from the database based on the page size.

---

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Ensure MongoDB is running locally or provide a connection URI for a cloud-hosted database)
- npm or yarn (Node package manager)

---

## Installation Steps

1. Clone the Repository:

   ```bash
   git clone https://github.com/Shaileshkale17/product_List_app.git
   cd product_List_app
   ```

2. Install Dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` File:
   Configure the following environment variables:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/<your-database-name>
   PAGE_SIZE=10
   ```

4. Start the Application:
   ```bash
   npm start
   ```
   Access the application at `http://localhost:8080/product/`.

---

## Folder Structure

```
.
├── public              # Static files (CSS, JS, images)
├── views               # EJS templates
├── routes              # Express route definitions
├── models              # Mongoose models
├── controllers         # Controller logic for CRUD operations
├── app.js              # Entry point of the application
└── package.json        # Project configuration and dependencies
```

---

## Features

### Category Master

- **Create Category:** Add a new category.
- **Read Category:** View all categories.
- **Update Category:** Edit details of an existing category.
- **Delete Category:** Remove a category.

#### API Endpoints:

- `GET /category` - Fetch all categories.
- `POST /category` - Create a new category.
- `PUT /category/:id` - Update a category by ID.
- `DELETE /category/:id` - Delete a category by ID.

### Product Master

- **Create Product:** Add a new product with an associated category.
- **Read Product:** View all products with details.
- **Update Product:** Edit details of an existing product.
- **Delete Product:** Remove a product.
- **Pagination:**
  - Server-side pagination extracts only the records for the current page.
  - Example: For page size 10 and page number 9, the app fetches records 90-99.

#### API Endpoints:

- `GET /product` - Fetch paginated products.
- `POST /product` - Create a new product.
- `PUT /product/:id` - Update a product by ID.
- `DELETE /product/:id` - Delete a product by ID.

---

## Database Models

### Category Model

```javascript
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
```

### Product Model

```javascript
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
```

---

## Pagination Logic

The server-side pagination extracts records based on the page number and page size:

### Example Query for Pagination:

```javascript
const page = parseInt(req.query.page) || 1; // Default to page 1
const pageSize = parseInt(process.env.PAGE_SIZE) || 10; // Default page size

const skip = (page - 1) * pageSize;
const products = await Product.find()
  .skip(skip)
  .limit(pageSize)
  .populate("categoryId", "name");

res.json({
  page,
  pageSize,
  products,
});
```

---

## Views

### Category Master Page

Displays a list of categories with options to create, update, and delete.

### Product Master Page

Displays a list of products with pagination. Each product displays:

- ProductId
- ProductName
- CategoryName
- CategoryId

Includes options to create, update, and delete products.

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License.
