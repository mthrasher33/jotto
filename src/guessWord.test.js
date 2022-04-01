import React from 'react';
import { mount } from 'enzyme'; // we're mounting because it's not a unit test but a functional test. testing app behavior

import App from './App';
import { findByTestAttr } from '../test/test.utils.js';

/**
 * Create wrapper with specificed initial conditions,
 * then submit a guessed word of 'train'
 # @function 
 * 
 * @param {object} state - Initial conditions.
 * @returns {Wrapper} - Enzyme wrapper of mounted App component 
 */
const setup = (state = {}) => {
  // TODO: apply state
  const wrapper = mount(<App />);

  // add value to input box
  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'train' } });

  // simulate click on submit  button
  const submitButton = findByTestAttr(wrapper, 'submit-button');
  submitButton.simulate('click', { preventDefault() {} }); // give it that prevent default prop so that it doesn't bubble up a real event

  return wrapper;
};

describe.skip('no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [],
    });
  });

  test('creates GuessedWords table with one row', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordRows).toHaveLength(1);
  });
}); // separate describes because different initial states

describe.skip('some words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }],
    });
  });

  test('creates GuessedWords table with two rows', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordRows).toHaveLength(2);
  });
});

describe.skip('guess secret word', () => {
  let wrapper;
  beforeEach(() => {
    let mockEvent;
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }],
    });

    // add value to the input box
    const inputBox = findByTestAttr(wrapper, 'input-box');
    mockEvent = { target: { value: 'party' } };
    inputBox.simulate('change', mockEvent);

    // simulate click on submit button
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    mockEvent = { preventDefault() {} };
    submitButton.simulate('click', { preventDefault() {} });
  });

  test('adds row to the GuessedWords table', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordNodes).toHaveLength(3);
  });

  test('displays Congrats component', () => {
    const congrats = findByTestAttr(wrapper, 'component-congrats');
    expect(congrats.text().length).toBeGreaterThan(0);
  });

  test('does not display input component contents', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    expect(inputBox.exists()).toBe(false);

    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.exists()).toBe(false);
  });
});
