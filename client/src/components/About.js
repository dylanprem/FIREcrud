import React, { Component } from "react";
import firePhoto from "../img/firebase.png";
import Prism from "prismjs";
import "../css/prism.css";
import { Link } from "react-router-dom";

class About extends Component {
  componentDidMount(){
    Prism.highlightAll();
  }
  render() {
    return (
      <div className="container">
      <div className="row mt-3">
      <img
      src={firePhoto}
      className="img-fluid d-block mx-auto fire-icon"
      alt="Firebase"
      />
      </div>
      <div className="row">
      <div className="col-md-12">
      <h1 className="display-1 text-info text-center">
      FIRE<span className="text-muted">crud</span>
      </h1>
      </div>
      </div>
      <div className="row">
      <div className="col-md-8 offset-md-2">
      <h1 className="text-info">What is FIREcrud?</h1>
      </div>
      </div>
      <div className="row">
      <div className="col-md-8 offset-md-2">
      <p className="text-muted">FIREcrud is a simple CRUD application built with the FERN stack (Firebase, Express, React, Node.js). 
      It's simple yet complex build should hopefully shed some light on how to use Firebase as a server-side framework.</p>
      </div>
      </div>
      <div className="row">
      <div className="col-md-8 offset-md-2">
      <h1 className="text-warning">The backend <small className="text-muted">Server setup</small></h1>
      </div>
      </div>
      <div className="row">
      <div className="col-md-8 offset-md-2">
      <p className="text-muted">So first we'll cd into our project directory, and mkdir our server directory, then touch server.js.</p> 
      <p className="text-muted">Here we set up our express server. I started with requiring a few dependencies and middleware.</p>
      </div>
      <div className="col-md-8 offset-md-2">
      <pre><code className="language-javascript">{`
      const express = require("express");
      const methodOverride = require("method-override");
      const bodyParser = require("body-parser");
      const dotenv = require("dotenv");
      dotenv.config();
      
      app.use((req, res, next) => {
        res.append("Access-Control-Allow-Origin", ["*"]);
        res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.append("Access-Control-Allow-Headers", "Content-Type");
        next();
      });
      
      const port = process.env.PORT || 5000;
      
      app.listen(port, () => console.log(Server is running));
      
      `}</code></pre>
      </div>
      </div>
      <div className="row">
      <div className="col-md-8 offset-md-2">
      <h1 className="text-warning">The backend <small className="text-muted">Routes setup</small></h1>
      </div>
      </div>
      <div className="row">
      <div className="col-md-8 offset-md-2">
      <p className="text-muted">Next we'll establish our routes. From the root directory, mkdir routes/api && cd routes/api. Then touch GET.js POST.js PATCH.js DELETE.js.</p> 
      <p className="text-muted">Now we need to tell our server to use these routes.</p>
      <small className="text-danger">If you're route files are empty, then you will get errors. If they're empty just add these lines in and then comment out the app.use lines until your routes are ready to use.</small>
      </div>
      <div className="col-md-8 offset-md-2">
      <pre><code className="language-javascript">{`
      { Requires ... }
      const GET_ROUTES = require("./routes/api/GET");
      const POST_ROUTES = require("./routes/api/POST");
      const PATCH_ROUTES = require("./routes/api/PATCH");
      const DELETE_ROUTES = require("./routes/api/DELETE");
      
      const app = express();
      { Middleware ... }

      // Use Routes
      app.use("/api/GET", GET_ROUTES);
      app.use("/api/POST", POST_ROUTES);
      app.use("/api/PATCH", PATCH_ROUTES);
      app.use("/api/DELETE", DELETE_ROUTES);
      
      `}</code></pre>
      </div>
      </div>
      <div className="row">
      <div className="col-md-8 offset-md-2">
      <h1 className="text-warning">The backend <small className="text-muted">Firebase setup</small></h1>
      </div>
      </div>
      <div className="row">
      <div className="col-md-8 offset-md-2">
      <p className="text-muted">This was a bit tricky. In the root directory i created a .env file to store my firebase credntials.</p> 
      <p className="text-muted">Follow <Link to="/firebase-setup"> these steps </Link> to create a firebase project.</p>
      <p className="text-muted">For more precise instructions on how to set up firebase for your node.js app, check out the <Link to="/firebase-admin-setup">docs.</Link></p>
      
      </div>
      <div className="col-md-8 offset-md-2">
      <pre><code className="language-javascript">{`
      { Requires ... }
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
      
      `}</code></pre>
      </div>
      </div>
      </div>
      );
    }
  }
  
  export default About;
  