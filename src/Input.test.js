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

test('renders without crashing', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});
