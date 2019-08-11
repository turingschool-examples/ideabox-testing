export const getIdeas = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/ideas');
    if (!response.ok) {
      throw new Error('Error fetching ideas')
    }
    const ideas = await response.json();

    return ideas;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getIdea = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/v1/ideas/${id}`);
    if (!response.ok) {
      throw new Error('Error fetching your idea')
    }
    const idea = await response.json();
  
    return idea;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const postIdea = newIdea => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...newIdea })
  };

  return fetch('http://localhost:3001/api/v1/ideas', options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error creating idea')
    } else {
      return response.json()
    }
  })
  .catch(err => {
    throw new Error(err.message)
  });
}

export const removeIdea = async (id) => {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`http://localhost:3001/api/v1/ideas/${id}`, options);
    if (!response.ok) {
      throw new Error('Error deleting idea')
    }

    return;
  } catch(error) {
    throw new Error(error.message);
  }
}
