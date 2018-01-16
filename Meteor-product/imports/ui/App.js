import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Products } from '../api/products.js';
import { bodyMaker, elasticSearch, getProducts } from '../api/elasticSearch.js'

import Product from './Product.js';
import Search from './Search.js'
import EditPop from './PopUps.js'
import CreatePop from './PopUps.js'

var listData = new ReactiveVar()

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      product: null
    }

    // init data
    this.pullData()
  }

  renderProducts() {
    return this.props.products.map((product, index) => (
      <Product key={product._id} 
          product={product}
          index={index}
          onShow={data => this.showEditPop(data)}/>
    ));
  }

  onCreate(product) {
    Products.insert(product, (error, result) => {
      if (error) {
        alert(error)
      } else {
        this.pullData()        
        this.refs.createPop.hide()
      }
    })
  }

  onEdit(product) {
    Products.update(this.state.product._id, {
      $set: product
    }, (error, result) => {
      if (error) {
        alert(error)
      } else {
        this.pullData()        
        this.refs.editPop.hide()
      }
    });
  }

  onSearch(keywords) {
    let serachBody = bodyMaker.allData()

    if (keywords) {
      serachBody = bodyMaker.nameDesc(keywords)
    }

    elasticSearch(serachBody).then(data => listData.set(data))
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

  pullData() {
    getProducts().then(data => listData.set(data))
  }
 
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <h1 className="navbar-brand">Product Manage</h1>
          <Search onSubmit={this.onSearch.bind(this)} autoSearch={true}></Search>
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
    products: listData.get() || []
  };
})(App);
