const express = require("express");
const router = express.Router();

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
  const itemsRef = db.ref(`items/${req.params.id}`);
  itemsRef
    .update({
      id: req.params.id,
      item: req.body.item,
      date: req.body.date
    })
    .then(items => res.json(items))
    .catch(err => res.json(err.code));
});

module.exports = router;
