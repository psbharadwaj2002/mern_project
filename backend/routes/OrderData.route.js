// const express = require("express");
// const router = express.Router();
// const Order = require("../models/orders.model");

// router.post("/orderData", async (request, response) => {
//   let data = request.body.order_data;
//   await data.splice(0, 0, { Order_date: request.body.order_date });

//   let emailID = await Order.findOne({ email: request.body.email });

//   if (emailID === null) {
//     try {
//       await Order.create({
//         email: request.body.email,
//       }).then(() => {
//         response.status(200).json({ success: true });
//       });
//     } catch (error) {
//       console.log(`Error Message: ${error.message}`);
//       response.send("Server Error", error.message);
//     }
//   } else {
//     try {
//       await Order.findOneAndUpdate(
//         { email: request.body.email },
//         { $push: { order_data: data } }
//       ).then(() => {
//         response.json({ success: true });
//       });
//     } catch (error) {
//       console.log(`Error Message: ${error.message}`);
//       response.send("Server Error", error.message);
//     }
//   }
// });

// module.exports = router;

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
    console.error(`Error Message: ${error.message}`);
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
