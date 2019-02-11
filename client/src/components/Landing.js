import React, { Component } from "react";
import firePhoto from "../img/firebase.png";
import AddItem from "../components/child-components/AddItem";
import ListItems from "../components/child-components/ListItems";

class Landing extends Component {
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
          <AddItem />
        </div>
        <div className="row">
          <ListItems />
        </div>
      </div>
    );
  }
}

export default Landing;
