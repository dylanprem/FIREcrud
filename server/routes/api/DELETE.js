const express = require("express");
const router = express.Router();

// Cors middleware
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5000",
  methods: "GET, POST, PATCH, DELETE"
};

// Firebase
const firebase = require("firebase-admin");
const db = firebase.database();

// @route   DELETE api/DELETE/:id
// @desc    delete an item
// @access  Public
router.delete("/:id", cors(corsOptions), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", false);
  const itemsRef = db.ref(`items/${req.params.id}`);
  itemsRef
    .remove()
    .then(res => {
      res.status(200).json({ success: "Removed" });
    })
    .catch(err => {
      res.json({ Failed: err.code });
    });
});

module.exports = router;
