import React, { Component } from "react";
import API from "../../api";
import firePhoto from "../../img/firebase.png";

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      editingId: this.props.match.params.id,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getItemToEdit();
  }

  getItemToEdit = () => {
    API.get(`/api/GET/${this.state.editingId}`)
      .then(res => {
        const item = res.data;
        this.setState({ item });
        console.log(item);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const updatedItem = {
      item: this.item.value,
      date: new Date()
    };
    API.patch(`/api/PATCH/${this.state.editingId}`, updatedItem)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ errors: {} });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errors: err.response.data });
      });
  };

  render() {
    let itemToEdit;
    const { errors } = this.state;

    itemToEdit = (
      <div className="form-group">
        <input
          name="item"
          type="text"
          defaultValue={this.state.item.item}
          ref={item => (this.item = item)}
          onChange={this.handleChange}
          className={
            errors && errors.item
              ? "form-control form-control-lg is-invalid"
              : "form-control form-control-lg"
          }
        />
        <div className="invalid-feedback">{errors.item}</div>
      </div>
    );

    return (
      <div className="container mt-5 mb-5">
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
          <div className="col-md-8 offset-md-2 mt-3">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                {itemToEdit}

                <input
                  type="submit"
                  value="Submit"
                  className="text-muted btn btn-lg btn-warning mt-3 btn-block"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditItem;
