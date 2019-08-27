import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { getIdeas, postIdea, deleteIdea } from '../apiCalls'

jest.mock('../apiCalls.js')

describe('App', () => {
  beforeEach(() => {
    getIdeas.mockImplementation(() => {
      return Promise.resolve([{ id: 1, title: 'Idea', description: 'It\'s great' }])
    });
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should retrieve ideas after mounting', async () => {
    shallow(<App />);
    expect(getIdeas).toHaveBeenCalled();
  });

  it('should update state with an idea when addIdea is called', async () => {
    postIdea.mockImplementation(() => {
      return Promise.resolve(
        { id: 2, title: 'Sweaters for pugs', description: 'Why not?' }
      );
    })
    const wrapper = shallow(<App />);
    const mockIdea = { id: 2, title: 'Sweaters for pugs', description: 'Why not?' };
    const expected = [{id: 1, title: 'Idea', description: 'It\'s great'}, mockIdea];

    await wrapper.instance().addIdea(mockIdea);

    expect(postIdea).toHaveBeenCalled();
    expect(wrapper.state('ideas')).toEqual(expected);
  });

  it('should remove an idea from state when removeIdea is called', async () => {
    const mockIdeas = [
      { id: 1, title: 'Idea', description: 'It\'s great' },
      {id: 2, title: 'A romcom', description: 'But make it ghosts'},
    ];
    const expected = [{ id: 1, title: 'Idea', description: 'It\'s great' }];

    deleteIdea.mockImplementation(() => {
      return Promise.resolve(getIdeas());
    })

    const wrapper = shallow(<App />);

    wrapper.instance().setState({ ideas: mockIdeas });
    await wrapper.instance().removeIdea(2);

    expect(wrapper.state('ideas')).toEqual(expected);
  });
});
