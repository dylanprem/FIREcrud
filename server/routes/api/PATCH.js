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

// @route   GET api/GET/
// @desc    Test route
// @access  Public
router.patch("/:id", cors(corsOptions), (req, res) => {
  const itemsRef = db.ref(`items/${req.params.id}`);
  itemsRef
    .update({
      item: req.body.item
    })
    .then(items => res.json(items))
    .catch(err => res.json(err.code));
});

module.exports = router;
