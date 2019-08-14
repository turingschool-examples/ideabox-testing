import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

describe('Card', () => {
  it('should match the snapshot with all data passed in correctly', () => {
    const wrapper = shallow(<Card
      title="Bananas"
      description="B A N A N A S"
      id={3}
      removeIdea={jest.fn()}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match the favorited snapshot', () => {
    const wrapper = shallow(
      <Card
        title='bananas'
        description='b a n a n a s'
        id={3}
        removeIdea={jest.fn()}
        isFavorite={true}
      />
    )

    expect(wrapper).toMatchSnapshot();
  });

  it('should call the removeIdea prop with the Card\'s id when clicked', () => {
    // Setup
    const removeIdeaMock = jest.fn();
    const wrapper = shallow(
      <Card
        title="Bananas"
        description="blah blah bloop"
        id={7}
        removeIdea={removeIdeaMock}
      />
    );
  
    // Execution
    wrapper.find('button').simulate('click');
  
    // Expectation
    expect(removeIdeaMock).toBeCalledWith(7);
  });
});