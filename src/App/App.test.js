import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
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
});
