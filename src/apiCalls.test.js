import React from 'react';
import { getIdeas, getSpecificIdea, createIdea, removeIdea } from './apiCalls';

describe('apiCalls', () => {
  describe('getIdeas', () => {
    let mockIdeas;

    beforeEach(() => {
      mockIdeas = [{ id: 7, title: 'All classes outside', description: 'All seasons' }];

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockIdeas)
        });
      });
    });

    it('should be called with correct URL', () => {
      const expected = 'http://localhost:3001/api/v1/ideas';

      getIdeas();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('HAPPY: should return a parsed response', async () => {
      const result = await getIdeas();

      expect(result).toEqual(mockIdeas);
    });

    it('SAD: should return an error if status is not ok', () => {
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
          message: 'Problem fetching ideas'
        })
      });

      expect(getIdeas()).rejects.toEqual(Error('Problem fetching ideas'));
    });
  });

  describe('getSpecificIdea', () => {
    let mockIdea;

    beforeEach(() => {
      mockIdea = { id: 4, title: 'Glasses for dogs', description: 'Because it would be cute' };

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockIdea)
        });
      });
    });

    it('should be called with correct URL', () => {
      const expected = 'http://localhost:3001/api/v1/ideas/4';

      getSpecificIdea(4);

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('HAPPY: should return a parsed response', async () => {
      const result = await getSpecificIdea(4);

      expect(result).toEqual(mockIdea);
    });

    it('SAD: should return an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      });

      expect(getSpecificIdea(4)).rejects.toEqual(Error('Error fetching your idea'));
    });

    it('SAD: should return an error if promise rejects', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: 'Problem getting your idea'
        })
      });

      expect(getSpecificIdea(4)).rejects.toEqual(Error('Problem getting your idea'));
    });
  });

  describe('createIdea', () => {
    let mockIdea;
    let mockResponse;

    beforeEach(() => {
      mockIdea = { id: 4, title: 'Glasses for dogs', description: 'Because it would be cute' };
      mockResponse = { id: 4 };

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
    });

    it('should be called with correct data', () => {
      const expected = [
        'http://localhost:3001/api/v1/ideas',
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mockIdea) }
      ];

      createIdea(mockIdea);

      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('HAPPY: should return a parsed response', async () => {
      const result = await createIdea(mockIdea);

      expect(result).toEqual(mockResponse);
    });

    it('SAD: should return an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      });

      expect(createIdea(mockIdea)).rejects.toEqual(Error('Error creating idea'));
    });

    it('SAD: should return an error if promise rejects', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: 'Problem creating your idea'
        });
      });

      expect(createIdea(mockIdea)).rejects.toEqual(Error('Problem creating your idea'));
    });
  });

  describe('removeIdea', () => {
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true
        });
      });
    });

    it('should call fetch with correct data', () => {
      const expected = ['http://localhost:3001/api/v1/ideas/1', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }]
      removeIdea(1);

      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('SAD: should return an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      expect(removeIdea(1)).rejects.toEqual(Error('Error deleting idea'));
    });

  it('SAD: should return an error if promise rejects', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: 'Problem deleting your idea'
        });
      });

      expect(removeIdea(1)).rejects.toEqual(Error('Problem deleting your idea'));
    });
  });
});
