import React from 'react';
import PropTypes from 'prop-types'
import './Card.css'

const Card = ({ id, title, description, removeIdea, isFavorite }) => {
  const favoriteClass = isFavorite ? 'favorite' : 'card'

  return (
    <section className={favoriteClass}>
      <h3>{ title }</h3>
      <p>{ description }</p>
      <button onClick={() => removeIdea(id)}>🗑</button>
    </section>
  )
}

export default Card;

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  removeIdea: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
}

Card.defaultProps = {
  isFavorite: true
}