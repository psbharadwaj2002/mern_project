const express = require("express");
const router = express.Router();

router.post("/productData", async (request, response) => {
  try {
    await response.send([global.products, global.product_categories]);
  } catch (error) {
    response.status(500).send("Server Error: " + error.message);
  }
});

module.exports = router;
