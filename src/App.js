import React, { Component } from 'react';
import Ideas from './Ideas';
import Form from './Form';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ideas: [],
      error: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/ideas')
      .then(response => response.json())
      .then(ideas => this.setState({ ideas }))
      .catch(error => this.setState({ error: error.message }));
  }

  addIdea = (newIdea) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...newIdea })
    };

    fetch('http://localhost:3001/api/v1/ideas', options)
      .then(response => response.json())
      .then(response => fetch(`http://localhost:3001/api/v1/ideas/${response.id}`))
      .then(response => response.json())
      .then(newIdea => this.setState({ ideas: [...this.state.ideas, newIdea] }))
      .catch(error => this.setState({ error: error.message }))
  }

  deleteIdea = (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(`http://localhost:3001/api/v1/ideas/${id}`, options)
      .then(() => fetch('http://localhost:3001/api/v1/ideas'))
      .then(response => response.json())
      .then(ideas => this.setState({ ideas }))
      .catch(error => this.setState({ error: error.message }));
  }

  render() {
    return(
      <main className='App'>
        <h1>IdeaBox</h1>
        <Form addIdea={this.addIdea} />
        {this.state.error && <h2>{this.state.error}</h2>}
        <Ideas ideas={this.state.ideas} deleteIdea={this.deleteIdea} />
      </main>
    )
  }
}

export default App;
