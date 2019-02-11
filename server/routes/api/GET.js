const express = require("express");
const router = express.Router();

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

// @route   GET api/GET/
// @desc    Test route
// @access  Public
router.get("/", (req, res) => {
  itemsRef.on(
    "value",
    function(snapshot) {
      res.json(snapshot.val());
    },
    function(errorObject) {
      res.json({ "The read failed": errorObject.code });
    }
  );
});

module.exports = router;
