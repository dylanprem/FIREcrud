import React, { Component } from "react";
import firePhoto from "../img/firebase.png";
import ListItems from "../components/child-components/ListItems";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-3">
          <Link to="/about" className="text-info">
            <h3>About</h3>
          </Link>
        </div>
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
          <ListItems />
        </div>
      </div>
    );
  }
}

export default Landing;
