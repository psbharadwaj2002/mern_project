require("dotenv").config();

const mongoose = require("mongoose");
const mongodb_url = process.env.MONGO_DB_URL;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("App Connected to Database successfully");

    const fetched_product_data = await mongoose.connection.db
      .collection("products")
      .find({})
      .toArray();
    const fetched_product_category_data = await mongoose.connection.db
      .collection("product_categories")
      .find({})
      .toArray();

    global.products = fetched_product_data;
    global.product_categories = fetched_product_category_data;
  } catch (error) {
    console.error(`Error Message: ${error.message}`);
  }
};

module.exports = mongoDB;
