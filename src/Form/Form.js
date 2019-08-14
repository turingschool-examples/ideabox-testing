import React, { Component } from 'react';
import './Form.css'

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: ''
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  submitNewIdea = e => {
    e.preventDefault();
    const { addIdea } = this.props;
    const newIdea = { ...this.state, id: Date.now()};
    addIdea(newIdea);
    this.resetInputs();
  }

  resetInputs = () => {
    this.setState({ 
      title: '',
      description: ''
    })
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='title'
          value={this.state.title}
          name='title'
          onChange={this.handleChange}
        />
        <input
          type='text'
          placeholder='description'
          value={this.state.description}
          name='description'
          onChange={this.handleChange}
        />
        <button 
          onClick={this.submitNewIdea}
        >
          Submit!
        </button>
      </form>
    )
  }
}