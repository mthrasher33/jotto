import React from 'react';
import propTypes from 'prop-types';

function LanguagePicker({ setLanguage }) {
  const languages = [
    { code: 'en', symbol: 'us' },
    { code: 'emoji', symbol: '😊' },
  ];

  const languageIcons = languages.map((lang) => (
    <span
      data-test='language-cion'
      key={lang.code}
      onClick={() => setLanguage(lang.code)}
    >
      {lang.symbol}
    </span>
  ));
  return <div data-test='language-picker'>{languageIcons}</div>;
}

LanguagePicker.propTypes = {
  setLanguage: propTypes.func.isRequired,
};

export default LanguagePicker;
