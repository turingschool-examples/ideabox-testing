import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should update state with an idea when addIdea is called', () => {
    // Setup
    const wrapper = shallow(<App />);
    const mockIdea = { title: 'sweaters for pugs', description: 'why not?', id: Date.now() };
    const expected = [mockIdea];

    // Expectation
    expect(wrapper.state('ideas')).toEqual([]);

    // Execution
    wrapper.instance().addIdea(mockIdea);

    // Expectation
    expect(wrapper.state('ideas')).toEqual(expected);
  });

  it('should remove an idea from state when removeIdea is called', () => {
    const wrapper = shallow(<App />);
    const mockIdeas = [
      {id: 1, title: 'Sweaters for pugs', description: 'To keep them warm'},
      {id: 2, title: 'A romcom', description: 'But make it ghosts'},
      {id: 3, title: 'A game show called Ether/Or', description: 'When you lose you get chloroformed'},
    ];
    const expected = [
      {id: 1, title: 'Sweaters for pugs', description: 'To keep them warm'},
      {id: 3, title: 'A game show called Ether/Or', description: 'When you lose you get chloroformed'},
    ]

    wrapper.instance().setState({ ideas: mockIdeas });
    wrapper.instance().removeIdea(2);

    expect(wrapper.state('ideas')).toEqual(expected);
  });
});
