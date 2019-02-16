const express = require("express");
const router = express.Router();

//cors
const cors = require("cors");

// Firebase
const firebase = require("firebase-admin");
const db = firebase.database();

//options
router.options("/*", cors());

// @route   DELETE api/DELETE/:id
// @desc    delete an item
// @access  Public
router.delete("/:id", cors(), (req, res) => {
  const itemsRef = db.ref(`items/${req.params.id}`);
  itemsRef
    .remove()
    .then(deleted => {
      res.status(200).json({ success: "Successfully Deleted" });
    })
    .catch(err => {
      res.json({ Failed: err.code });
    });
});

module.exports = router;
