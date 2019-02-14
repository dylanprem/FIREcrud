const express = require("express");
const router = express.Router();
const isEmpty = require("../../validation/is-empty");

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
router.options("/*", cors());

// @route   GET api/GET/
// @desc    Get's all items
// @access  Public
router.get("/", cors(), (req, res) => {
  itemsRef
    .once("value")
    .then(snapshot => res.json(snapshot))
    .catch(err => res.status(401).json(err.code));
});

// @route   GET api/GET/:id
// @desc    Get a single item by id
// @access  Public
router.get("/:id", cors(), (req, res) => {
  const itemRef = db.ref(`items/${req.params.id}`);
  itemRef
    .once("value")
    .then(snapshot => res.json(snapshot))
    .catch(err => res.status(401).json(err.code));
});

module.exports = router;
