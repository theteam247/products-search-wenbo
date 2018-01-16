import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Products } from '../api/products.js';

import Product from './Product.js';
import Search from './Search.js'
import EditPop from './PopUps.js'
import CreatePop from './PopUps.js'

var searchQuery = new ReactiveVar()
var searching   = new ReactiveVar( false )

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      product: null
    }
  }

  renderProducts() {
    return this.props.products.map((product, index) => (
      <Product key={product._id} 
          product={product}
          index={index}
          onShow={data => this.showEditPop(data)}/>
    ));
  }

  onCreate(data) {
    Products.insert(data, (error, result) => {
      if (error) {
        alert(error)
      } else {
        this.refs.createPop.hide()
      }
    })
  }

  onEdit(product) {
    Products.update(this.state.product._id, {
      $set: {
        name: product.name,
        desc: product.desc,
        price: product.price,
        updatedAt: new Date()
      }
    }, (error, result) => {
      if (error) {
        alert(error)
        // TODO:更友好的错误提示方式
        // console.log(error.invalidKeys)
      } else {
        this.refs.editPop.hide()
      }
    });
  }

  showCreatePop() {
    this.refs.createPop.show()
  }

  showEditPop(product) {
    this.setState((prevState) => {
      return {product: product}
    })

    this.refs.editPop.show()
  }
 
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <h1 className="navbar-brand">Product Manage</h1>
          <Search></Search>
        </nav>

        <main>
          <button className="btn btn-primary btn-sm btn-add"
              onClick={this.showCreatePop.bind(this)}>Add Product</button>
          <table className="table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>CreatedAt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderProducts()}
            </tbody>
          </table>
        </main>
        
        <EditPop ref="editPop" 
            onSubmit={data => this.onEdit(data)}
            product={this.state.product}></EditPop>
        <CreatePop ref="createPop" onSubmit={data => this.onCreate(data)}></CreatePop>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    products: Products.find(searchQuery.get() || {}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
