import React from 'react';
import './Card.css'

const Card = ({ id, title, description, removeIdea }) => {
  return (
    <section className='card'>
      <h3>{ title }</h3>
      <p>{ description }</p>
      <button onClick={() => removeIdea(id)}>Delete</button>
    </section>
  )
}

export default Card;
