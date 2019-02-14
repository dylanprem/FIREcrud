import React, { Component } from "react";
import firePhoto from "../img/firebase.png";
import Prism from "prismjs";
import "../css/prism.css";
import { Link } from "react-router-dom";

class About extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }
  render() {
    return (
      <div className="container">
        <div className="row mt-3">
          <Link to="/" className="text-info">
            <h3>Home</h3>
          </Link>
        </div>
        <div className="row mt-3">
          <img
            src={firePhoto}
            className="img-fluid d-block mx-auto fire-icon"
            alt="Firebase"
          />
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <h1 className="display-1 text-info text-center">
              FIRE<span className="text-muted">crud</span>
            </h1>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-info">What is FIREcrud?</h1>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8 offset-md-2">
            <p className="text-muted">
              FIREcrud is a simple CRUD application built with the FERN stack
              (Firebase, Express, React, Node.js). It's simple yet complex build
              should hopefully shed some light on how to use Firebase as a
              server-side framework.
            </p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-warning">
              The backend <small className="text-muted">Building our API</small>
            </h1>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8 offset-md-2">
            <p className="text-muted">
              The goal here was to build a RESTful API with Express and
              Firebase, where our Client side React app can GET information
              from, and also POST, PATCH {`(`}edit{`)`}, and DELETE information
              as well. I had also set up error handling on the server side which
              I eventually pass to the client side.
            </p>
            <p className="text-dark">
              With that being said, let's run through an entire GET requests
              from server-side to client-side. The code below shows a Firebase
              query for our "items" database. It returns a JSON object with all
              of our items.
            </p>
          </div>
          <div className="col-md-8 offset-md-2">
            <pre>
              <code className="language-javascript">
                {`
router.get("/", cors(), (req, res) => {
  itemsRef
    .once("value")
    .then(snapshot => res.json(snapshot))
    .catch(err => res.status(401).json(err.code));
});            
                `}
              </code>
            </pre>
          </div>
          <div className="col-md-8 offset-md-2">
            <p className="text-muted">
              If there's data, we should be able to see it in our localhost on
              whatever port you've chosen to use.
            </p>
          </div>
          <div className="col-md-8 offset-md-2">
            <pre>
              <code className="language-javascript">
                {`
{
  "-LYch4E_9EUhzsTuBC3y": {
  "date": "2019-02-13T21:43:45.100Z",
  "item": "blah"
  },
  "-LYch9prBuFnuhsJu6b_": {
  "date": "2019-02-13T21:13:01.585Z",
  "item": "eyyo"
  }
}            
                `}
              </code>
            </pre>
          </div>
          <div className="col-md-8 offset-md-2">
            <p className="text-muted">
              In our React application we'll call our getItems function inside
              of the componentDidMount life-cycle. We are also passing any
              potential server-side errors to our errors object that we'd create
              in the react component.
            </p>
          </div>
          <div className="col-md-8 offset-md-2">
            <pre>
              <code className="language-javascript">
                {`
class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      errors: {}
    };
  }

componentDidMount() {
  this.getItems();
}

getItems = () => {
  axios
    .get('http://localhost:5000/api/GET/')
    .then(res => {
      const items = res.data;
      this.setState({ items, errors: {} });
    })
    .catch(err => {
      console.log(err.response.data);
      this.setState({ errors: err.response.data });
    });
};

...
                `}
              </code>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
