import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '../utils/language';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [isFarmer, setIsFarmer] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    otp: ''
  });
  const [step, setStep] = useState(1);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: `${position.coords.latitude}, ${position.coords.longitude}`
          }));
        },
        () => {
          alert(t('locationAccessError'));
        }
      );
    }
  };

  const handleVoiceInput = (field) => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      const lang = getLanguage();
      recognition.lang = lang === 'en' ? 'en-IN' : lang === 'hi' ? 'hi-IN' : 'kn-IN';
      recognition.start();
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setFormData(prev => ({ ...prev, [field]: transcript }));
      };
      
      recognition.onerror = () => {
        alert(t('voiceNotSupported'));
      };
    } else {
      alert(t('voiceNotSupported'));
    }
  };

  const handleLogin = () => {
    const userData = {
      type: isFarmer ? 'farmer' : 'buyer',
      ...formData
    };
    setUser(userData);
    navigate(isFarmer ? '/farmer' : '/buyer');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌾 Kissan Connect</h1>
        <p style={styles.subtitle}>{t('welcome')} - Direct Farm-to-Consumer Platform</p>
        
        <div style={styles.roleSelector}>
          <button 
            style={{...styles.roleBtn, ...(isFarmer ? styles.activeRole : {})}}
            onClick={() => setIsFarmer(true)}
          >
            👨‍🌾 {t('farmer')}
          </button>
          <button 
            style={{...styles.roleBtn, ...(!isFarmer ? styles.activeRole : {})}}
            onClick={() => setIsFarmer(false)}
          >
            🛒 {t('buyer')}
          </button>
        </div>

        {step === 1 ? (
          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder={t('fullName')}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={styles.input}
              />
              <button 
                onClick={() => handleVoiceInput('name')}
                style={styles.voiceBtn}
                title="Voice Input"
              >
                🎤
              </button>
            </div>

            <input
              type="tel"
              placeholder={t('phoneNumber')}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={styles.input}
            />

            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder={t('location')}
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                style={styles.input}
              />
              <button 
                onClick={getLocation}
                style={styles.locationBtn}
                title="Get Current Location"
              >
                📍
              </button>
            </div>

            <button 
              onClick={() => setStep(2)}
              style={styles.button}
            >
              {t('sendOtp')}
            </button>
          </div>
        ) : (
          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder={t('enterOtp')}
                value={formData.otp}
                onChange={(e) => setFormData({...formData, otp: e.target.value})}
                style={styles.input}
              />
              <button 
                onClick={() => handleVoiceInput('otp')}
                style={styles.voiceBtn}
                title="Voice Input"
              >
                🎤
              </button>
            </div>

            <button 
              onClick={handleLogin}
              style={styles.button}
            >
              {t('verifyLogin')}
            </button>
            
            <p style={styles.demoText}>{t('demoOtp')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#065f46',
    margin: '0 0 10px 0'
  },
  subtitle: {
    color: '#6b7280',
    margin: '0 0 30px 0'
  },
  roleSelector: {
    display: 'flex',
    background: '#f3f4f6',
    borderRadius: '12px',
    padding: '4px',
    marginBottom: '30px'
  },
  roleBtn: {
    flex: 1,
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    background: 'transparent',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px'
  },
  activeRole: {
    background: '#10b981',
    color: 'white'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  inputGroup: {
    position: 'relative'
  },
  input: {
    padding: '15px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '16px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  },
  voiceBtn: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '5px'
  },
  locationBtn: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '5px'
  },
  button: {
    padding: '15px',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  demoText: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '10px 0 0 0'
  }
};

export default Login;