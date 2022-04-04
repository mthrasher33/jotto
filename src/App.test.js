import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../test/test.utils';
import App from './App';

// activate global mock to make sure getSecretWord doesn't make network call
jest.mock('./actions');
import { getSecretWord as mockGetSecretWord } from './actions';

/**
 * Setup function for App component
 * @returns {ShallowWrapper}
 */
const setup = () => {
  // use mount because useEffect not called on 'shallow'
  return mount(<App />);
};

describe.each([
  [null, true, false],
  ['party', false, true],
])('renders with secretWord as %s', (secretWord, loadingShows, appShows) => {
  let wrapper;
  let originalUseReducer;

  beforeEach(() => {
    originalUseReducer = React.useReducer;
    const mockUseReducer = jest
      .fn()
      .mockReturnValue([{ secretWord }, jest.fn()]);
    React.useReducer = mockUseReducer;
    wrapper = setup();
  });
  afterEach(() => {
    React.useReducer = originalUseReducer;
  });
  test(`renders loading spinner: ${loadingShows}`, () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(loadingShows);
  });
  test(`redners app: ${appShows}`, () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(appShows);
  });
});

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent).toHaveLength(1);
});

describe('get secret word', () => {
  beforeEach(() => {
    // clear the mock calls from previous tests
    mockGetSecretWord.mockClear();
  });

  test('get secret word on app mount', () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test('getSecretWord does not run on app update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.setProps(); // runs use effect. update() does not

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
