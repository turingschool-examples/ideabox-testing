import React from 'react';
import Card from '../Card/Card';
import './Ideas.css';

const Ideas = ({ ideas, removeIdea }) => {
const ideaCards = ideas.map(idea => {
    return <Card 
      id={idea.id}
      title={idea.title}
      description={idea.description}
      removeIdea={removeIdea}
      key={idea.id}
    />
  })

  return (
    <>
      <h2>Ideas Component</h2>
      <section className='ideas'>
        {ideaCards}
      </section>
    </>
  )
}

export default Ideas;