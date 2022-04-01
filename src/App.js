import { useEffect, useState } from 'react';
import { getSecretWord } from './actions';
import './App.css';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import LanguagePicker from './LanguagePicker';
import languageContext from './contexts/languageContext';

function App() {
  const [secretWord, setSecretWord] = useState();

  const success = false;
  const guessedWords = [];

  useEffect(() => {
    getSecretWord();
  }, []);

  return (
    <div data-test='component-app' className='container'>
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
