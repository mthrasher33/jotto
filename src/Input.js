import React, { useState } from 'react';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = useState(''); // this way lets us mock useState
  return (
    <div data-test='component-input'>
      <form className='form-inline'>
        <input
          data-test='input-box'
          className='mb-2 mx-sm-3'
          placeholder='enter guess'
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button data-test='submit-button' className='btn btn-primary mb-2'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;
