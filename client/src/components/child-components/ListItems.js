import React, { Component } from "react";
import axios from "axios";
import isEmpty from "../../validation/is-empty";

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      burning: false
    };
  }

  componentDidMount() {
    this.getItems();
    setInterval(this.getItems, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.getItems);
  }

  getItems = () => {
    axios
      .get(`http://localhost:5000/api/GET/`)
      .then(res => {
        const items = res.data;
        this.setState({ items, burning: false });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  burnData = id => {
    this.setState({ burning: true });
    axios
      .delete(`http://localhost:5000/api/DELETE/${id}`)
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  };

  render() {
    let tableRow;
    if (!isEmpty(this.state.items)) {
      tableRow = Object.keys(this.state.items).map(i => (
        <tr key={i}>
          <td
            className={
              this.state.burning === true ? "text-light" : "text-muted"
            }
          >
            {this.state.items[i].item}
          </td>
          <td>
            <button className="btn btn-info">
              <i className="fas fa-edit" /> Edit
            </button>
          </td>
          <td>
            <button
              className={
                this.state.burning === true
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
            <h1>No data</h1>
          </td>
        </tr>
      );
    }
    return (
      <div className="col-md-8 offset-md-2 mt-5">
        <h1 className="text-warning text-center">Items</h1>

        <table className="table">
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
