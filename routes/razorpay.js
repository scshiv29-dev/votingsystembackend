const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const shortid = require("shortid");

var razorpay = new Razorpay({
  key_id: "rzp_test_ZmAZxSAt5kg5uR",
  key_secret: "balFLGeFtpg0PIo2wlBKhLqg",
});

router.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.amount;
  const currency = "INR";

  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id:response.id,
      currency:"INR",
      amount:response.amount
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
