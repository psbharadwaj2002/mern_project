const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("orders", orderSchema);
