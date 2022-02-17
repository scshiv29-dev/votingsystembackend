const Verification = require("../models/verification");

exports.getVerificationRequestById = (req, res, next, id) => {
  Verification.findById(id).exec((err, verification) => {
    if (err) {
      return res.status(400).json({
        error: "No verification request found in DB",
      });
    }
    req.verification = verification;
    next();
  });
};

exports.getVerificationRequest = (req, res) => {
  return res.json(req.verification);
};

exports.createVerficationRequest = (req, res) => {
  req.body.user = req.profile;
  const verification = new Verification(req.body);
  verification.save((err, doc) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    return res.json(doc);
  });
};
exports.getAllVerificationRequests = (req, res) => {
  Verification.find()
    .populate("user", "_id name")
    .exec((err, requests) => {
      if (err) {
        return res.status(400).json({
          error: "No verification requests found",
        });
      }
      res.json(requests);
    });
};
exports.updateStatus = (req, res) => {
  Verification.updateOne(
    { _id: req.body.verificationId },
    { $set: { status: req.body.status } },
    (err, verification) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update verification status",
        });
      }
      res.json(verification);
    }
  );
};
