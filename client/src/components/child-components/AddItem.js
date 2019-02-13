import React, { Component } from "react";
import axios from "axios";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const items = {
      item: this.state.item,
      date: new Date()
    };

    axios.post(`http://localhost:5000/api/POST`, items).then(res => {
      console.log(res);
      console.log(res.data);
      this.setState({ item: "" });
    });
  };

  render() {
    return (
      <div className="col-md-8 offset-md-2 mt-3">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="item"
              value={this.state.item}
              onChange={this.handleChange}
              className="form-control form-control-lg"
              placeholder="Enter an item here"
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-lg btn-info mt-3 btn-block"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default AddItem;
