export const getIdeas = () => {
  return fetch('http://localhost:3001/api/v1/ideas')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching ideas');
      }
      return response.json();
    });
};

export const postIdea = newIdea => {
  const options = {
    method: 'POST',
    body: JSON.stringify(newIdea),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch('http://localhost:3001/api/v1/ideas', options)
    .then(response => {
      if (!response.ok) {
        throw Error('Error posting the new idea');
      }

      return response.json()
    });
};

export const deleteIdea = id => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`http://localhost:3001/api/v1/ideas/${id}`, options)
    .then(response => {
      if (!response.ok) {
        throw Error('Error deleting idea.')
      }
      return getIdeas();
    });
};