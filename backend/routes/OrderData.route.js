const express = require("express");
const router = express.Router();
const Order = require("../models/orders.model");

router.post("/orderData", async (request, response) => {
  try {
    let data = request.body.order_data;
    data.unshift({ Order_date: request.body.order_date });

    let emailID = await Order.findOne({ email: request.body.email });

    if (!emailID) {
      await Order.create({
        email: request.body.email,
      });
      response.status(200).json({ success: true });
    } else {
      await Order.findOneAndUpdate(
        { email: request.body.email },
        { $push: { order_data: data } }
      );
      response.status(200).json({ success: true });
    }
  } catch (error) {
    response.status(500).send("Server Error: " + error.message);
  }
});

router.post("/myOrderdata", async (request, response) => {
  try {
    let myData = await Order.findOne({ email: request.body.email });
    response.json({ orderData: myData });
  } catch (error) {
    response.status(500).send("Server Error: " + error.message);
  }
});

module.exports = router;
