const express = require("express");
const router = express.Router();

//cors middleware
const cors = require("cors");

// Firebase
const firebase = require("firebase-admin");
const db = firebase.database();
const itemsRef = db.ref("items");

// @route   GET api/GET/test
// @desc    Test route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Test Route works" });
});

//options
router.options("/", cors());

// @route   GET api/GET/
// @desc    Test route
// @access  Public
router.get("/", cors(), (req, res) => {
  itemsRef.once(
    "value",
    function(snapshot) {
      res.json(snapshot);
    },
    function(errorObject) {
      res.json({ "The read failed": errorObject.code });
    }
  );
});

module.exports = router;
