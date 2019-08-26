import React, { Component } from 'react';
import Form from '../Form/Form';
import Ideas from '../Ideas/Ideas'
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      ideas: [],
      isLoading: true,
      error: ''
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/ideas')
      .then(response => response.json())
      .then(ideas => this.setState({ ideas, isLoading: false }))
      .catch(error => this.setState({
        isLoading: false,
        error: error.message
      })
    );
  }

  addIdea = newIdea => {
    const options = {
      method: 'POST',
      body: JSON.stringify(newIdea),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch('http://localhost:3001/api/v1/ideas', options)
      .then(response => response.json())
      .then(idea => this.setState({
        ideas: [...this.state.ideas, idea]
      }))
      .catch(error => this.setState({ error: error.message }))
  }

  removeIdea = id => {
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
    const { ideas, isLoading, error } = this.state;
    return (
      <main className="App">
        <h1>IdeaBox</h1>
        <Form addIdea={this.addIdea} />
        {isLoading && <img
          src={'https://www.gearbubble.com/assets/loader_large.gif'}
          alt={''}
        />
        }
        {error && <h2>{error}</h2>}
        <Ideas
          ideas={ideas}
          removeIdea={this.removeIdea}
        />
      </main>
    )
  }
}