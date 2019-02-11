import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//Components
import Landing from "./components/Landing";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Landing} />
      </Router>
    );
  }
}

export default App;
