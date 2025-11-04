import React, { useState } from 'react';

const CropUpload = ({ user }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    location: '',
    harvestDate: '',
    images: [],
    video: null
  });
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files.slice(0, 5)] // Max 5 images
    }));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setFormData(prev => ({ ...prev, video: file }));
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: `${position.coords.latitude}, ${position.coords.longitude}`
          }));
        }
      );
    }
  };

  const simulateAIAnalysis = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const analysis = {
        crop: formData.cropName || 'Tomato',
        quality_score: Math.floor(Math.random() * 30) + 70,
        freshness_days: Math.floor(Math.random() * 7) + 3,
        defects: ['minor bruises', 'slight discoloration'].slice(0, Math.floor(Math.random() * 2)),
        market_demand: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
        suggested_price: Math.floor(Math.random() * 20) + 30,
        confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
        ai_notes: "Good quality produce with minor surface imperfections. High market demand in your region.",
        price_reasons: [
          "High quality score (85%)",
          "Strong market demand in your area",
          "Optimal freshness (7 days remaining)",
          "Minor defects slightly reduce value"
        ],
        shelf_life_analysis: {
          predicted_days: 7,
          factors: [
            "Optimal harvest timing",
            "Good storage conditions",
            "Minimal physical damage"
          ]
        }
      };
      setAiAnalysis(analysis);
      setIsAnalyzing(false);
      setStep(3);
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Upload Your Crop</h1>
        <p style={styles.subtitle}>Get AI-powered analysis and pricing suggestions</p>

        {/* Progress Steps */}
        <div style={styles.progress}>
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} style={styles.stepContainer}>
              <div style={{
                ...styles.step,
                ...(step >= stepNum ? styles.activeStep : {})
              }}>
                {stepNum}
              </div>
              {stepNum < 3 && <div style={styles.stepLine} />}
            </div>
          ))}
        </div>

        {/* Step 1: Crop Details */}
        {step === 1 && (
          <div style={styles.form}>
            <div style={styles.grid}>
              <input
                type="text"
                placeholder="Crop Name"
                value={formData.cropName}
                onChange={(e) => setFormData({...formData, cropName: e.target.value})}
                style={styles.input}
              />
              
              <input
                type="number"
                placeholder="Quantity (kg)"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                style={styles.input}
              />

              <div style={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  style={styles.input}
                />
                <button onClick={getLocation} style={styles.iconBtn}>📍</button>
              </div>

              <input
                type="date"
                placeholder="Harvest Date"
                value={formData.harvestDate}
                onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
                style={styles.input}
              />
            </div>

            {/* Image Upload */}
            <div style={styles.uploadSection}>
              <h3 style={styles.uploadTitle}>Upload Crop Images</h3>
              <div style={styles.uploadArea}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={styles.fileInput}
                  id="image-upload"
                />
                <label htmlFor="image-upload" style={styles.uploadLabel}>
                  📷 Click to select images (Max 5)
                </label>
                {formData.images.length > 0 && (
                  <p style={styles.fileCount}>{formData.images.length} images selected</p>
                )}
              </div>
            </div>

            {/* Video Upload */}
            <div style={styles.uploadSection}>
              <h3 style={styles.uploadTitle}>Upload Crop Video (Optional)</h3>
              <div style={styles.uploadArea}>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  style={styles.fileInput}
                  id="video-upload"
                />
                <label htmlFor="video-upload" style={styles.uploadLabel}>
                  🎥 Click to select video
                </label>
                {formData.video && (
                  <p style={styles.fileCount}>Video selected: {formData.video.name}</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              style={styles.button}
            >
              Continue to AI Analysis
            </button>
          </div>
        )}

        {/* Step 2: AI Analysis */}
        {step === 2 && (
          <div style={styles.analysisSection}>
            <div style={styles.analysisHeader}>
              <h2>🤖 AI Analysis in Progress</h2>
              <p>Analyzing your crop images and data...</p>
            </div>

            {isAnalyzing ? (
              <div style={styles.loading}>
                <div style={styles.spinner}></div>
                <p>Analyzing quality, freshness, and market value...</p>
              </div>
            ) : (
              <button
                onClick={simulateAIAnalysis}
                style={styles.button}
              >
                Start AI Analysis
              </button>
            )}
          </div>
        )}

        {/* Step 3: AI Results */}
        {step === 3 && aiAnalysis && (
          <div style={styles.results}>
            <div style={styles.resultHeader}>
              <h2>AI Analysis Complete ✅</h2>
            </div>

            {/* Quality Metrics */}
            <div style={styles.metrics}>
              <div style={styles.metric}>
                <h3>{aiAnalysis.quality_score}%</h3>
                <p>Quality Score</p>
              </div>
              <div style={styles.metric}>
                <h3>{aiAnalysis.freshness_days} days</h3>
                <p>Shelf Life</p>
              </div>
              <div style={styles.metric}>
                <h3>₹{aiAnalysis.suggested_price}</h3>
                <p>Suggested Price/kg</p>
              </div>
            </div>

            {/* Price Analysis */}
            <div style={styles.section}>
              <h3>💰 Price Analysis</h3>
              <div style={styles.reasons}>
                {aiAnalysis.price_reasons.map((reason, index) => (
                  <div key={index} style={styles.reason}>
                    ✅ {reason}
                  </div>
                ))}
              </div>
            </div>

            {/* Shelf Life Analysis */}
            <div style={styles.section}>
              <h3>📅 Shelf Life Analysis</h3>
              <p><strong>Predicted: {aiAnalysis.shelf_life_analysis.predicted_days} days</strong></p>
              <div style={styles.factors}>
                {aiAnalysis.shelf_life_analysis.factors.map((factor, index) => (
                  <div key={index}>• {factor}</div>
                ))}
              </div>
            </div>

            {/* Defects */}
            {aiAnalysis.defects.length > 0 && (
              <div style={styles.section}>
                <h3>⚠️ Detected Issues</h3>
                <div style={styles.defects}>
                  {aiAnalysis.defects.map((defect, index) => (
                    <div key={index}>• {defect}</div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => alert('Crop published successfully!')}
              style={styles.button}
            >
              Publish Crop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8fafc',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#065f46',
    margin: '0 0 10px 0',
    textAlign: 'center'
  },
  subtitle: {
    color: '#6b7280',
    margin: '0 0 30px 0',
    textAlign: 'center'
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px'
  },
  stepContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  step: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#6b7280'
  },
  activeStep: {
    background: '#10b981',
    color: 'white'
  },
  stepLine: {
    width: '60px',
    height: '2px',
    background: '#e5e7eb'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  input: {
    padding: '15px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '16px',
    outline: 'none'
  },
  inputGroup: {
    position: 'relative'
  },
  iconBtn: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer'
  },
  uploadSection: {
    border: '2px dashed #e5e7eb',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center'
  },
  uploadTitle: {
    margin: '0 0 15px 0',
    color: '#374151'
  },
  uploadArea: {
    cursor: 'pointer'
  },
  fileInput: {
    display: 'none'
  },
  uploadLabel: {
    display: 'block',
    padding: '15px',
    background: '#f3f4f6',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  fileCount: {
    margin: '10px 0 0 0',
    color: '#10b981',
    fontWeight: '500'
  },
  button: {
    padding: '15px',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px'
  },
  analysisSection: {
    textAlign: 'center',
    padding: '40px 20px'
  },
  analysisHeader: {
    marginBottom: '30px'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f4f6',
    borderTop: '5px solid #10b981',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  results: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  resultHeader: {
    textAlign: 'center',
    padding: '20px',
    background: '#ecfdf5',
    borderRadius: '10px',
    border: '2px solid #10b981'
  },
  metrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px'
  },
  metric: {
    textAlign: 'center',
    padding: '20px',
    background: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #e5e7eb'
  },
  section: {
    padding: '20px',
    background: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #e5e7eb'
  },
  reasons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '10px'
  },
  reason: {
    padding: '8px',
    background: '#ecfdf5',
    borderRadius: '6px'
  },
  factors: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginTop: '10px'
  },
  defects: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginTop: '10px',
    color: '#dc2626'
  }
};

// Add CSS animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default CropUpload;