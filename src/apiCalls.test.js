import { getIdeas, postIdea, deleteIdea } from './apiCalls';

describe('getIdeas', () => {
  let mockResponse = [
    {
      id: 1,
      title: "Sweaters for pugs",
      description: "To keep them warm"
    }
  ];

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });

  it('should call fetch with the correct url', () => {
    getIdeas();

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/ideas');
  });

  it('should return an array of ideas (HAPPY)', () => {
    expect(getIdeas()).resolves.toEqual(mockResponse);
  });

  it('should return an error (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });

    expect(getIdeas()).rejects.toEqual(Error('Error fetching ideas'));
  });

  it('SAD: should return an error if promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'fetch failed'
      })
    });

    expect(getIdeas()).rejects.toEqual(Error('fetch failed'));
  });
});

describe('postIdea', () => {
  let mockIdea = {
    id: 1,
    title: "Sweaters for pugs",
    description: "To keep them warm"
  }

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockIdea)
      });
    });
  });

  it('should fetch with the correct arguments', () => {
    const expected = [ 'http://localhost:3001/api/v1/ideas', {
      method: 'POST',
      body: JSON.stringify(mockIdea),
      headers: {
        'Content-Type': 'application/json'
      }
    }]
    postIdea(mockIdea);

    expect(window.fetch).toHaveBeenCalledWith(...expected)
  });

  it('should return your new idea', () => {
    expect(postIdea(mockIdea)).resolves.toEqual(mockIdea);
  });

  it('should return an error (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });

    expect(postIdea(mockIdea)).rejects.toEqual(Error('Error posting the new idea'));
  });

  it('SAD: should return an error if promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'fetch failed'
      })
    });

    expect(postIdea(mockIdea)).rejects.toEqual(Error('fetch failed'));
  });
});

describe('deleteIdea', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
      });
    });
  });

  it('should call fetch with correct arguments', () => {
    const expected = ['http://localhost:3001/api/v1/ideas/2', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }];

    deleteIdea(2);

    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });

  it('should return an error (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });

    expect(deleteIdea(2)).rejects.toEqual(Error('Error deleting idea.'));
  });

  it('SAD: should return an error if promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'fetch failed'
      })
    });

    expect(deleteIdea(2)).rejects.toEqual(Error('fetch failed'));
  });
});