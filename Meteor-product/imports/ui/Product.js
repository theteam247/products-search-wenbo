import React, { Component } from 'react';

import { Products, ProductsIndex} from '../api/products.js';

export default class Product extends Component {
  constructor(props) {
    super(props)

    this.state = {
      handleEdit: this.props.handleEdit,
      handleDelete: this.props.handleDelete,
      id: this.props.product._id
    }
  }

  handleDelete() {
    if (this.state.handleDelete) {
      this.props.handleDelete(this.props.product)
    }
  }

  handleEdit() {
    if (this.state.handleEdit) {
      this.props.handleEdit(this.props.product)
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td className="name">{this.props.product.name}</td>
        <td>{this.props.product.price}</td>        
        <td className="desc">{this.props.product.desc}</td>        
        <td>{this.props.product.createdAt.toLocaleString()}</td>
        <td className="action">
          <button className="btn btn-primary btn-sm" onClick={this.handleEdit.bind(this)}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={this.handleDelete.bind(this)}>Delete</button>
        </td>
      </tr>
    );
  }
}
