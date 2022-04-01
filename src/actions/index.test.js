import moxios from 'moxios';
import { getSecretWord } from './';

describe('getSecretWord', () => {
  beforeEach(() => {
    moxios.install(); // use moxios instead of http
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('secretWord is returned', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'party',
      });
    }); // need this so test doesn't exist before async call completes

    const mockSetSecretWord = jest.fn();

    // update to test app in Redux / context sections
    await getSecretWord(mockSetSecretWord);
    expect(mockSetSecretWord).toHaveBeenCalledWith('party');
  });
});
