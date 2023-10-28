const express = require("express");
const router = express.Router();

router.post("/productData", async (request, response) => {
  try {
    await response.send([global.products, global.product_categories]);
    // await console.log(global.products, global.product_categories);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
});

module.exports = router;
