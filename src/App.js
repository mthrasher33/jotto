import React, { useEffect, useState } from 'react';
import { getSecretWord } from './actions';
import './App.css';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import LanguagePicker from './LanguagePicker';
import languageContext from './contexts/languageContext';

/**
 * @function reducer to update state, automatically called by dispatch
 * @param state {object} - previous state
 * @param action {object} - 'type and 'payload' props
 * @returns {object} - new state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};
function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: 'en',
  });

  const success = false;
  const guessedWords = [];

  const setSecretWord = (secretWord) => {
    dispatch({ type: 'setSecretWord', payload: secretWord });
  };

  const setLanguage = (language) => {
    dispatch({ type: 'setLanguage', payload: language });
  };

  useEffect(() => {
    getSecretWord();
  }, []);

  if (state.secretWord === null) {
    return (
      <div className='container' data-test='spinner'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div data-test='component-app' className='container'>
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Congrats success={success} />
        <Input success={success} secretWord={state.secretWord} />
        <GuessedWords guessedWords={guessedWords} />
      </languageContext.Provider>
    </div>
  );
}

export default App;
