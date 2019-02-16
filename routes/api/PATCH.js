const express = require("express");
const router = express.Router();

// Load Input Validation
const validateInput = require("../../validation/validation");

// Cors middleware
const cors = require("cors");

// Firebase
const firebase = require("firebase-admin");
const db = firebase.database();

//options
router.options("/*", cors());

// @route   GET api/GET/
// @desc    Test route
// @access  Public
router.patch("/:id", cors(), (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const itemsRef = db.ref(`items/${req.params.id}`);
  itemsRef
    .update({
      item: req.body.item,
      date: req.body.date
    })
    .then(patched => res.status(200).json({ Success: "Successfully patched"}))
    .catch(err => res.json(err.code));
});

module.exports = router;
