import React from 'react';
import { shallow } from 'enzyme'
import Form from './Form';

describe('Form', () => {
  let wrapper
  const mockAddIdea = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Form addIdea={mockAddIdea} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state when handleChange is called', () => {
    const mockEvent = { target: { name: 'title', value: 'Sweaters for pugs.'} };
    const expected = 'Sweaters for pugs.';

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('title')).toEqual(expected);
  });

  it('should reset state when resetInputs is called', () => {
    const defaultState = { title: 'Sweaters for pugs', description: 'Why not?'}
    const expected = { title: '', description: '' };
    
    wrapper.instance().setState(defaultState);

    wrapper.instance().resetInputs();

    expect(wrapper.state()).toEqual(expected);
  });

  it('should call addIdea and resetInputs when submitNewIdea is called', () => {
    global.Date.now = jest.fn().mockImplementation(() => 12345)
    const mockEvent = { preventDefault: jest.fn() };
    const expected = { title: '', description: '', id: 12345 };
    wrapper.instance().resetInputs = jest.fn();
    wrapper.instance().submitNewIdea(mockEvent);
    
    expect(mockAddIdea).toHaveBeenCalledWith(expected);
    expect(wrapper.instance().resetInputs).toHaveBeenCalled();
  });

  it('should run submitIdea when the button is clicked', () => {
    wrapper.instance().submitNewIdea = jest.fn();
    wrapper.instance().forceUpdate();
    const mockEvent = { preventDefault: jest.fn() };

    wrapper.find('button').simulate('click', mockEvent);

    expect(wrapper.instance().submitNewIdea).toHaveBeenCalledWith(mockEvent);
  });
});
