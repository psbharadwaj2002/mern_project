const express = require("express");
const router = express.Router();
const User = require("../models/Users.model");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwt_secret_key = process.env.JWT_SECRET_KEY;
router.post(
  "/createUser",
  [
    body("name").isLength({ min: 5 }),
    body(
      "email",
      "Please enter correct email which ends with '@gmail.com'"
    ).isEmail(),
    body("password", "Password must contain minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.send({ errors: result.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(request.body.password, salt);
    try {
      await User.create({
        name: request.body.name,
        email: request.body.email,
        password: securedPassword,
        location: request.body.location,
      }).then(response.json({ success: true }));
    } catch (error) {
      console.error(`Error Message: ${error.message}`);
      response.json({ success: false });
    }
  }
);

router.post(
  "/loginUser",
  [
    body(
      "email",
      "Please enter correct email which ends with '@gmail.com'"
    ).isEmail(),
    body("password", "Password must contain minimum 5 characters").isLength({
      min: 5,
    }),
  ],

  async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.send({ errors: result.array() });
    }
    const email = request.body.email;
    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return response
          .status(400)
          .json({ error: "Try logging in with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(
        request.body.password,
        userData.password
      );

      console.log(passwordCompare);

      if (!passwordCompare) {
        return response.status(400).json({ error: "Wrong Password" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwt_secret_key);

      return response.json({ success: true, authToken: authToken });
    } catch (error) {
      console.error(`Error Message: ${error.message}`);
      response.json({ success: false });
    }
  }
);

module.exports = router;
