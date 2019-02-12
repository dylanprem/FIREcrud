import React, { Component } from "react";
import axios from "axios";

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/GET/`)
      .then(res => {
        const items = res.data;
        this.setState({ items });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  burnData = id => {
    axios
      .delete(`http://localhost:5000/api/DELETE/${id}`)
      .then(res => {
        console.log(res);
        axios
          .get(`http://localhost:5000/api/GET/`)
          .then(res => {
            const items = res.data;
            this.setState({ items });
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(error => console.log(error));
  };

  render() {
    const tableRow = Object.keys(this.state.items).map(i => (
      <tr key={i}>
        <td>{this.state.items[i].item}</td>
        <td>
          <button className="btn btn-info">
            <i className="fas fa-edit" /> Edit
          </button>
        </td>
        <td>
          <button
            className="btn btn-warning text-muted"
            onClick={this.burnData.bind(this, i)}
          >
            <i className="fas fa-fire" /> BURN
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="col-md-8 offset-md-2 mt-5">
        <h1 className="text-warning text-center">Items</h1>

        <table className="table">
          <thead>
            <tr>
              <th className="text-muted">Item</th>
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
