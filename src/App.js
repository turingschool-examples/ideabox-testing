import React, { Component } from 'react';
import Ideas from './Ideas';
import Form from './Form';
import { getIdeas, getSpecificIdea, createIdea, removeIdea } from './apiCalls';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ideas: [],
      error: ''
    }
  }

  async componentDidMount() {
    try {
      const ideas = await getIdeas()
      this.setState({ideas})
    } catch(error) {
      this.setState({error: error.message})
    }
  }

  addIdea = async (newIdea) => {
    try {
      const newId = await createIdea(newIdea);
      const createdIdea = await getSpecificIdea(newId.id);
      this.setState({ ideas: [...this.state.ideas, createdIdea] })
    } catch(error) {
      this.setState({ error: 'Error adding a new idea' })
    }
  }

  deleteIdea = async (id) => {
    try {
      await removeIdea(id);
      const ideas = await getIdeas();
      this.setState({ ideas: ideas });
    } catch(error) {
      this.setState({ error: error.message })
    }
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
