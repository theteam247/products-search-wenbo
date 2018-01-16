import React, { Component } from 'react';

import { Products, ProductsIndex} from '../api/products.js';

export default class Product extends Component {
  deleteProduct() {
    if (confirm(`Delete ${this.props.product.name}?`)) {
      Products.remove(this.props.product._id);
    }
  }

  editProduct() {
    this.props.onShow(this.props.product)
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
          <button className="btn btn-primary btn-sm" onClick={this.editProduct.bind(this)}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={this.deleteProduct.bind(this)}>Delete</button>
        </td>
      </tr>
    );
  }
}
