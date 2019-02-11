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
const itemsRef = db.ref("items");

// @route   POST api/POST/
// @desc    post to db
// @access  Public
router.post("/", cors(corsOptions), (req, res) => {
  itemsRef
    .push()
    .set({
      item: req.body.item
    })
    .then(items => res.json(items))
    .catch(err => ({
      if(err) {
        return res.status(404).json({ Error: err.code });
      }
    }));
});

module.exports = router;
