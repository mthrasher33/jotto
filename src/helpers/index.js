/**
 * @method getLetterMatchCount
 * @param {string} guessedWord
 * @param {string} secretWord
 * @returns {number} - Number of letters matched between guessed word and secret word
 */

export function getLetterMatchCount(guessedWord, secretWord) {
  const secretLetters = secretWord.split('');
  const guessedLetters = new Set(guessedWord);
  return secretLetters.filter((letter) => guessedLetters.has(letter)).length;
}
