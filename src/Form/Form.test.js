import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';

describe('Form', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Form addIdea={jest.fn()} />)
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update shate when handleChange is called', () => {
    const mockEvent = { target: { name: 'title', value: 'Sweaters for pugs' } };
    const expected = 'Sweaters for pugs';

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('title')).toEqual(expected);
  });

  it('should reset state when resetInputs is called', () => {
    const expected = { title: '', description: '' };

    wrapper.instance().setState({ title: 'Sweaters for pugs', description: 'Why not?' });
    wrapper.instance().resetInputs();

    expect(wrapper.state()).toEqual(expected);
  });

  it('should call resetInputs when submitNewIdea is called', () => {
    wrapper.instance().resetInputs = jest.fn();
    wrapper.instance().submitNewIdea({ preventDefault: jest.fn() });

    expect(wrapper.instance().resetInputs).toHaveBeenCalled();
  });

  it('should run submitIdea when the button is clicked', () => {
    wrapper.instance().submitNewIdea = jest.fn();
    wrapper.instance().forceUpdate();
    const mockEvent = { preventDefault: jest.fn() };

    wrapper.find('button').simulate('click', mockEvent);

    expect(wrapper.instance().submitNewIdea).toHaveBeenCalled();
  });

  it('should run handleChange when the inputs detect a change', () => {
    const mockTitleEvent = { target: { name: 'title', value: 'Prank Robbie' } };
    const mockDescEvent = { target: { name: 'description', value: 'Why not?' } };
    
    wrapper.instance().handleChange = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.find('[name="title"]').simulate('change', mockTitleEvent);
    wrapper.find('[name="description"]').simulate('change', mockDescEvent);

    expect(wrapper.instance().handleChange).toHaveBeenCalledWith(mockTitleEvent);
    expect(wrapper.instance().handleChange).toHaveBeenCalledWith(mockDescEvent);
  });

  it('should call addIdea with correct props when submitIdea is called', () => {
    global.Date.now = jest.spyOn(global.Date, 'now').mockImplementation(() => 12345);

    const currentState = { title: 'Sweaters for pugs', description: 'Because cute' };
    const mockIdea = { ...currentState, id: 12345 };

    wrapper.instance().setState(currentState);

    wrapper.instance().submitNewIdea({ preventDefault: jest.fn() });

    expect(wrapper.instance().props.addIdea).toHaveBeenCalledWith(mockIdea);
  });
});