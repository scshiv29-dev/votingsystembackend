const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
const { signout } = require("../controllers/auth");
const { response } = require("express");
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


router.post('/verification',(req,res)=>{
//do validation
const secret="12345678";
console.log(req.body)
var verified=false

const shasum = crypto.createHmac('sha256', secret)
shasum.update(JSON.stringify(req.body))
const digest = shasum.digest('hex')


console.log(digest, req.headers['x-razorpay-signature'])

if (digest === req.headers['x-razorpay-signature']) {
  console.log('request is legit')
  // process it
 verified=true
  //put token in cookie
  res.cookie("verified", verified,{ expire: new Date() + 9999 });

} else {
  // pass it
  verified=false
}

res.json({
  status:"ok",
})
})


module.exports = router;
