import React, { Component } from 'react';

const enterKey = 13

export default class Search extends Component {
  onKeyUp(event) {
    if (event.keyCode === enterKey) {
      let content = this.refs.input.value.trim()
      
      this.submit(content)
    }
  }

  submit(content) {
    if (this.props.onSubmit) {
      this.props.onSubmit(content)
    }
    console.log(content)
  }

  render() {
    return (
      <form className="form-inline my-2 my-lg-0 pull-right">
        <input className="form-control mr-sm-2" 
            type="search"
            placeholder="Search..." 
            aria-label="Search"
            ref="input"
            onKeyUp={this.onKeyUp(event)} />
      </form>
    );
  }
}
