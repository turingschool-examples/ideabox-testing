import React from 'react';
import './Card.css'

const Card = ({ id, title, description, removeIdea, isFavorite }) => {
  var favoriteClass = isFavorite ? 'favorite' : 'card'

  return (
    <section className={favoriteClass}>
      <h3>{ title }</h3>
      <p>{ description }</p>
      <button onClick={() => removeIdea(id)}>🗑</button>
    </section>
  )
}

export default Card;