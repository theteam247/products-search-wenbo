import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class PopUps extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      product: this.props.product,
      name: '',
      desc: '',
      price: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product !== this.state.product) {
      this.setState({
        product: nextProps.product,
        name: nextProps.product.name,
        desc: nextProps.product.desc,
        price: nextProps.product.price
      });
    }
  }

  handleCancel(event) {
    event.preventDefault()

    this.hide()
  }

  handleSubmit(event) {
    event.preventDefault()

    let data = {
      name: this.state.name,
      desc: this.state.desc,
      price: this.state.price,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this._submit(data)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  show() {
    this.setState((prevState) => {
      return {show: true}
    })
  }

  hide() {
    this.setState((prevState) => {
      return {show: false}
    })

    this.setState({
      name: '',
      desc: '',
      price: 0
    })
  }

  _submit(data) {
    if (this.props.onSubmit) {
      this.props.onSubmit(data)
    }
  }

  render() {
    return (
      <div className="pop-ups" style={{ display: this.state.show ? '' : 'none'}}>
        <div className="mask" onClick={this.hide.bind(this)}></div>
        <form className="content" ref="form">
          <label htmlFor="">
            <span>Name</span>
            <input type="text" placeholder="name" ref="input"
                name="name"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}/>
          </label>
          <label htmlFor="">
            <span>Price</span>
            <input type="number" placeholder="price" ref="price"
                name="price"
                value={this.state.price}
                onChange={this.handleChange.bind(this)}/>
          </label>
          <label htmlFor="">
            <span>Description</span>
            <textarea name="desc"ref="textarea" cols="30" rows="10" 
                placeholder="description..."
                value={this.state.desc}
                onChange={this.handleChange.bind(this)}></textarea>        
          </label>       
          <div className="action">
            <button className="btn btn-primary btn-sm" onClick={this.handleSubmit.bind(this)}>确定</button>
            <button className="btn btn-default btn-sm" onClick={this.handleCancel.bind(this)}>取消</button>
          </div>
        </form>
      </div>
    );
  }
}
