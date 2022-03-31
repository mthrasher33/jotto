import { shallow, ShallowWrapper, shalow } from 'enzyme';
import { findByTestAttr } from '../test/test.utils';
import App from './App';

/**
 * Setup function for App component
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<App />);
};

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent).toHaveLength(1);
});
