export const getIdeas = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/ideas');
    const ideas = await response.json();

    return ideas;
  } catch (error) {
    throw Error('Error fetching ideas');
  }
}

export const getSpecificIdea = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/v1/ideas/${id}`);
    const idea = await response.json();

    return idea;
  } catch (error) {
    throw Error('Error fetching idea');
  }
}

export const createIdea = newIdea => {
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
      throw Error('Error creating idea')
    } else {
      return response.json()
    }
  })
}

export const removeIdea = async (id) => {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    await fetch(`http://localhost:3001/api/v1/ideas/${id}`, options);

    return;
  } catch(error) {
    throw Error('Error deleting idea');
  }
}
