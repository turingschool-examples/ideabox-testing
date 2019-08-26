import React from 'react';
import { shallow } from 'enzyme';
import Ideas from './Ideas';

describe('Ideas', () => {
  it('should match snapshot', () => {
    const mockIdeas = [
      {id: 1, title: 'Sweaters for pugs', description: 'To keep them warm'},
      {id: 2, title: 'A romcom', description: 'But make it ghosts'},
      {id: 3, title: 'A game show called Ether/Or', description: 'When you lose you get chloroformed'},
    ];

    const wrapper = shallow(<Ideas 
      ideas={mockIdeas} 
      removeIdea={jest.fn()} 
    />);

    expect(wrapper).toMatchSnapshot();
  });
});