const express = require("express");
const {
  createVerficationRequest,
  getVerificationRequestById,
  getAllVerificationRequests,
  getVerificationRequest,
  updateStatus,
} = require("../controllers/verification");

const { giveVotingRight, getUserById } = require("../controllers/user");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("verificationId", getVerificationRequestById);
router.param("userId", getUserById);
router.post(
  "/create/verification/:userId",
  isSignedIn,
  isAuthenticated,
  createVerficationRequest
);

router.get(
  "/view/allverifications/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllVerificationRequests
);
router.get(
  "/view/verifications/:userId/:verificationId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getVerificationRequest
);
router.put(
  "/verification/:verificationId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);
module.exports = router;
