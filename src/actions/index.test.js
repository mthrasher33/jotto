import moxios from 'moxios';
import { getSecretWord } from './';

describe('getSecretWord', () => {
  beforeEach(() => {
    moxios.install(); // use moxios instead of http
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('secretWord is returned', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'party',
      });
    }); // need this so test doesn't exist before async call completes

    // update to test app in Redux / context sections
    return getSecretWord().then((secretWord) => {
      expect(secretWord).toBe('party');
    });
  });
});
