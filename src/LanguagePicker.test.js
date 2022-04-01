import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../test/test.utils';
import LanguagePicker from './LanguagePicker';

const mockSetLanguage = jest.fn();
const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'language-picker');
  expect(component.exists()).toBe(true);
});

test('renders non-zero language icons', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, 'language-icon');
  expect(languageIcons.length).toBeGreaterThan(0);
});

test('calls setLanguage prop upon click', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, 'language-icon');

  const firstIcon = languageIcons.first();
  firstIcon.simulate('click');
  expect(mockSetLanguage).toHaveBeenCalled();
});
