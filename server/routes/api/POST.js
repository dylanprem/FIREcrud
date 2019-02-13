const express = require("express");
const router = express.Router();

// Cors middleware
const cors = require("cors");

// Firebase
const firebase = require("firebase-admin");
const db = firebase.database();
const itemsRef = db.ref("items");

// Load Input Validation
const validateInput = require("../../validation/validation");

//options
router.options("/", cors());

// @route   POST api/POST/
// @desc    post to db
// @access  Public
router.post("/", cors(), (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  itemsRef
    .push()
    .set({
      item: req.body.item,
      date: req.body.date
    })
    .then(item => {
      res.status(200).json({ success: "Successfully Posted" });
    })
    .catch(err => {
      res.status(404).json({ bad: err.code });
    });
});

module.exports = router;
