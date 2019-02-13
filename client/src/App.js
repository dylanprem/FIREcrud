import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//Components
import Landing from "./components/Landing";
import EditItem from "./components/child-components/EditItem";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/edit/:id" component={EditItem} />
        </div>
      </Router>
    );
  }
}

export default App;
