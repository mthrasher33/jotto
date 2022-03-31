import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../test/test.utils';

import Input from './Input';

/**
 * Setup function for app component
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<Input />);
};
const mockSetCurrentGuess = jest.fn();

// mock entire module for destructuring
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState) => [initialState, mockSetCurrentGuess],
}));

describe('state controlled input field', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });
  test('renders without crashing', () => {
    const component = findByTestAttr(wrapper, 'component-input');
    expect(component.length).toBe(1);
  });

  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    submitButton.simulate('click');
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});
