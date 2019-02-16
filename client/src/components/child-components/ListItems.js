import React, { Component } from "react";
import axios from "axios";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      item: "",
      burning: false,
      posting: false,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ posting: true });
    const items = {
      item: this.state.item,
      date: new Date()
    };

    axios
      .post(`http://localhost:5000/api/POST`, items)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({
          item: "",
          errors: {}
        });
        this.getItems();
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errors: err.response.data, posting: false });
      });
  };

  getItems = () => {
    axios
      .get(`http://localhost:5000/api/GET/`)
      .then(res => {
        console.log(res);
        const items = res.data;
        this.setState({ items, burning: false, posting: false, errors: {} });
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errors: err.response.data });
      });
  };

  burnData = id => {
    this.setState({ burning: true });
    axios
      .delete(`http://localhost:5000/api/DELETE/${id}`)
      .then(res => {
        console.log(res.data);
        this.getItems();
      })
      .catch(error => console.log(error));
  };

  render() {
    const { errors } = this.state;

    const addItem = (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="item"
              value={this.state.item}
              onChange={this.handleChange}
              className={
                errors.item && errors
                  ? "form-control form-control-lg is-invalid"
                  : "form-control form-control-lg"
              }
              placeholder="Enter an item here"
            />
            <div className="invalid-feedback">{errors.item}</div>
            <input
              type="submit"
              value="Submit"
              className={
                this.state.posting
                  ? "btn btn-lg btn-success mt-3 btn-block"
                  : "btn btn-lg btn-info mt-3 btn-block"
              }
            />
          </div>
        </form>
      </div>
    );
    let tableRow;
    if (!isEmpty(this.state.items)) {
      tableRow = Object.keys(this.state.items).map(i => (
        <tr key={i}>
          <td className={this.state.burning ? "text-danger" : "text-muted"}>
            {this.state.items[i].item}
          </td>
          <td className="text-center">
            <Link to={`/edit/${i}`} className="btn btn-info">
              <i className="fas fa-edit" /> Edit
            </Link>
          </td>
          <td className="text-right">
            <button
              className={
                this.state.burning
                  ? "btn btn-danger text-light"
                  : "btn btn-warning text-muted"
              }
              onClick={this.burnData.bind(this, i)}
            >
              <i className="fas fa-fire" /> BURN
            </button>
          </td>
        </tr>
      ));
    } else {
      tableRow = (
        <tr>
          <td className="text-danger">
            <h3>NO DATA</h3>
          </td>
        </tr>
      );
    }
    return (
      <div className="col-md-8 offset-md-2 mt-5">
        {addItem}
        <h1 className="text-warning text-center">Items</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Item</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>{tableRow}</tbody>
        </table>
      </div>
    );
  }
}

export default ListItems;
