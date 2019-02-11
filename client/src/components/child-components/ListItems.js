import React, { Component } from "react";
import axios from "axios";

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      item: ""
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/api/GET/`).then(response => {
      console.log(response.data);
    });
  }
  render() {
    return (
      <div className="col-md-8 offset-md-2">
        <ul className="list-group">
          {this.state.items.map(i => (
            <li className="list-group-item" key={i.id}>
              <span>{i.item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListItems;
