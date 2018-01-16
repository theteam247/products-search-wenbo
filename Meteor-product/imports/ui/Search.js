import React, { Component } from 'react'

export default class Search extends Component {

  constructor(props) {
    super(props)

    this.state = {
      autoSearch: this.props.autoSearch,
      timer: null,
      interval: this.props.interval || 400
    }
  }

  onKeyPress(event) {
    if (event.key == 'Enter') {
      event.preventDefault()

      let keywords = this.refs.input.value.trim()

      this._submit(keywords)
    }
  }

  onInput(event) {
    if (this.state.autoSearch) {
      let keywords = this.refs.input.value.trim()

      if (this.state.timer) clearTimeout(this.state.timer)

      this.state.timer = setTimeout(() => {
        this._submit(keywords)
      }, this.state.interval)
    }
  }

  _submit(keywords) {
    if (this.props.onSubmit) {
      this.props.onSubmit(keywords)
    }
  }

  render() {
    return (
      <form className="form-inline my-2 my-lg-0 pull-right">
        <input className="form-control mr-sm-2" 
            type="search"
            placeholder="Search..." 
            aria-label="Search"
            ref="input"
            onInput={this.onInput.bind(this)}
            onKeyPress={this.onKeyPress.bind(this)} />
      </form>
    );
  }
}
