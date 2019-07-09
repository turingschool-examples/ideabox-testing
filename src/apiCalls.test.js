import React from 'react';
import { getIdeas, getSpecificIdea, createIdea, removeIdea } from './apiCalls';

describe('apiCalls', () => {
  describe('getIdeas', () => {
    let mockIdeas;

    beforeEach(() => {
      mockIdeas = [{id: 7, title: 'All classes outside', description: 'All seasons'}];

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockIdeas)
        });
      });
    });

    it('should be called with correct URL', async () => {
      const expected = 'http://localhost:3001/api/v1/ideas';

      getIdeas();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('HAPPY: should return a parsed response', async () => {
      const result = await getIdeas();

      expect(result).toEqual(mockIdeas);
    });

    it('SAD: should return an error', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.rejects()
      });

      await expect(getIdeas()).rejects.toEqual(Error('Error fetching ideas'));
    });
  });

  describe('getSpecificIdea', () => {
    let mockIdea;

    beforeEach(() => {
      mockIdea = {id: 4, title: 'Glasses for dogs', description: 'Because it would be cute'};

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockIdea)
        });
      });
    });

    it('should be called with correct URL', async () => {
      const expected = 'http://localhost:3001/api/v1/ideas/4';

      getSpecificIdea(4);

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('HAPPY: should return a parsed response', async () => {
      const result = await getSpecificIdea();

      expect(result).toEqual(mockIdea);
    });

    it('SAD: should return an error', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.rejects()
      });

      await expect(getSpecificIdea()).rejects.toEqual(Error('Error fetching idea'));
    });
  });

  describe('createIdea', () => {
    let mockIdea;
    let mockResponse;

    beforeEach(() => {
      mockIdea = {id: 4, title: 'Glasses for dogs', description: 'Because it would be cute'};
      mockResponse = {id: 4};

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
    });

    it('should be called with correct data', async () => {
      const expected = [
        'http://localhost:3001/api/v1/ideas',
        { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(mockIdea)}
      ];

      createIdea(mockIdea);

      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('HAPPY: should return a parsed response', async () => {
      const result = await createIdea(mockIdea);

      expect(result).toEqual(mockResponse);
    });

    it('SAD: should return an error', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(() => {
          ok: false
        })
      });

      await expect(createIdea(mockIdea)).rejects.toEqual(Error('Error creating idea'));
    });
  });

  describe('removeIdea', () => {
    let options;

    beforeEach(() => {
      options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve();
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

    it('should return an error', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject();
      });

      await expect(removeIdea()).rejects.toEqual(Error('Error deleting idea'));
    });
  });
});
