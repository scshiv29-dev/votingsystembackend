var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var verificationSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pan: {
    type: String,
    required: true,
  },
  adhaar: {
    type: String,
    required: true,
  },
  voterid: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
  ethaddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Approved", "Rejected", "Pending"],
  },
});
module.exports = mongoose.model("Verification", verificationSchema);
