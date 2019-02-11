const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// Firebase middleware
const firebase = require("firebase");
require("firebase/auth");
require("firebase/database");

const GET_ROUTES = require("./routes/api/GET");
const POST_ROUTES = require("./routes/api/POST");
const PATCH_ROUTES = require("./routes/api/PATCH");
const DELETE_ROUTES = require("./routes/api/DELETE");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

//Firebase config
const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID
};
firebase.initializeApp(FIREBASE_CONFIG);

// Use Routes
app.use("/api/GET", GET_ROUTES);
app.use("/api/POST", POST_ROUTES);
app.use("/api/PATCH", PATCH_ROUTES);
app.use("/api/DELETE", DELETE_ROUTES);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
