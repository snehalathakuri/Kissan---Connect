import React from 'react';

const LanguageSelector = () => {
  const getLanguage = () => {
    return localStorage.getItem('selectedLanguage') || 'en';
  };

  const setLanguage = (lang) => {
    localStorage.setItem('selectedLanguage', lang);
    window.location.reload();
  };

  const currentLang = getLanguage();

  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <select 
        value={currentLang} 
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          padding: '8px 12px',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          background: 'white',
          fontSize: '14px',
          cursor: 'pointer',
          minWidth: '140px'
        }}
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

export default LanguageSelector;