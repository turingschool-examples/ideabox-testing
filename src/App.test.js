import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import { createIdea, getSpecificIdea, removeIdea, getIdeas } from './apiCalls';
jest.mock('./apiCalls', () => ({
  createIdea: jest.fn().mockImplementation(() => {
    return {id: 3}
  }),
  getSpecificIdea: jest.fn().mockImplementation(() => {
    return {id: 3, title: 'Sweaters for pugs', description: 'Why not?'}
  }),
  removeIdea: jest.fn(),
  getIdeas: jest.fn().mockImplementation(() => {
    return [{id: 3, title: 'Sweaters for pugs', description: 'Why not?'}]
  })
}));

describe.only('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });

  it('should update state when addIdea is called', () => {
    // wrapper = shallow(<App />, { disableLifecycleMethods: true });

    const mockIdea = {
      id: 3, title: 'Sweaters for pugs', description: 'Why not?'
    };
    const expected = [mockIdea];

    wrapper.instance().addIdea(mockIdea);

    expect(wrapper.state('ideas')).toEqual(expected);
  });

  it('should update state when deleteIdea is called', async () => {
    const expected = [{id: 3, title: 'Sweaters for pugs', description: 'Why not?'}];

    wrapper.instance().setState({ ideas: [{ id: 1, title: 'Prank Travis', description: 'Stick googly eyes on all his stuff' }, {id: 3, title: 'Sweaters for pugs', description: 'Why not?'}] });

    await wrapper.instance().deleteIdea(1);

    expect(wrapper.state('ideas')).toEqual(expected);
  });
});
