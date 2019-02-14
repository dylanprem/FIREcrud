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
    privateKey: process.env.ACCOUNT_KEY,
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

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
