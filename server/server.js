const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// Firebase middleware
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.ACCOUNT_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.CLIENT_EMAIL
  }),
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID
});

const GET_ROUTES = require("./routes/api/GET");
const POST_ROUTES = require("./routes/api/POST");
const PATCH_ROUTES = require("./routes/api/PATCH");
const DELETE_ROUTES = require("./routes/api/DELETE");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// Use Routes
app.use("/api/GET", GET_ROUTES);
app.use("/api/POST", POST_ROUTES);
app.use("/api/PATCH", PATCH_ROUTES);
app.use("/api/DELETE", DELETE_ROUTES);

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
