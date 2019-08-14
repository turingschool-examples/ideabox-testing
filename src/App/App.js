import React, { Component } from 'react';
import Form from '../Form/Form';
import Ideas from '../Ideas/Ideas'
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      ideas: []
    };
  }

  addIdea = newIdea => {
    this.setState({ ideas: [...this.state.ideas, newIdea]})
  }

  removeIdea = id => {
    var ideas = this.state.ideas.filter(idea => idea.id !== id);
    this.setState({ ideas });

  }

  render() {
    return (
      <main className="App">
        <h1>IdeaBox</h1>
        <Form addIdea={this.addIdea} />
        <Ideas 
          ideas={this.state.ideas} 
          removeIdea={ this.removeIdea} 
        />
      </main>
    )
  }
}