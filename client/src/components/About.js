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
      <div className="container mt-5 mb-5">
        <div className="row mt-3">
          <div className="col-md-12">
            <Link to="/" className="text-info">
              <h3>Home</h3>
            </Link>
          </div>
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
              (Firebase, Express, React, Node.js). It's simple and should
              hopefully shed some light on how to use Firebase as a server-side
              framework.
            </p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-warning">
              The backend <small className="text-muted">our API</small>
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
              I eventually pass to the client side. With that being said, let's
              run through an entire GET requests from server-side to
              client-side. The code below shows a GET request to our Firebase
              "items" database. It returns a JSON object with all of our items.
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
        </div>
        <div className="row mt-3">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-warning">
              The client <small className="text-muted">our React app</small>
            </h1>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8 offset-md-2">
            <p className="text-muted">
              In our React application{" "}
              <span className="text-info">ListItems</span> component, we'll call
              our
              <span className="text-warning">getItems</span> function inside of
              the componentDidMount life-cycle via Axios. We are also passing
              any potential server-side errors to our errors state if any exist.
              We pass res.data into our items state so that we can display the
              data in our DOM. The console will return our response and/or
              errors when the DOM is loaded.
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
        <div className="row mt-3">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-warning">
              Summary
              <small className="text-muted"> and honorable mentions</small>
            </h1>
            <p className="text-muted">
              Firebase works great with React, Node and Express! Hope this helps
              you build your next app.
            </p>
            <h3 className="text-info">Shout outs:</h3>
            <p className="text-muted">
              <strong>Postman</strong> for testing routes.
            </p>
            <p className="text-muted">
              <strong>Concurrently</strong> for simultaneously running our
              server and client.
            </p>
            <p className="text-muted">
              <strong>Axios</strong> for graceful API requests.
            </p>
            <p className="text-muted">
              <strong>Prism</strong> for adding beautiful code snippets to your
              projects.
            </p>
            <p className="text-muted">
              <strong>Bootstrap 4</strong> is super nice.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
