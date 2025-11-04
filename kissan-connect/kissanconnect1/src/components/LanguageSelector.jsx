import React from 'react';
import { getLanguage, setLanguage } from '../utils/language';

const LanguageSelector = () => {
  const currentLang = getLanguage();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    window.location.reload();
  };

  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  return (
    <div style={styles.container}>
      <select 
        value={currentLang} 
        onChange={(e) => handleLanguageChange(e.target.value)}
        style={styles.select}
      >
        {languageOptions.map(option => (
          <option key={option.code} value={option.code}>
            {option.flag} {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000
  },
  select: {
    padding: '8px 12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    background: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    minWidth: '140px'
  }
};

export default LanguageSelector;