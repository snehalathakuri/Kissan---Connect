import React, { useState, useEffect } from 'react';
import { t } from '../utils/language';

const MarketPrices = () => {
  const [prices, setPrices] = useState({});
  const [trends, setTrends] = useState({});
  const [regionalData, setRegionalData] = useState({});
  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with actual API later
      const mockPrices = {
        'tomato': { price: 45, trend: 'up', change: 5, demand: 'High' },
        'potato': { price: 30, trend: 'down', change: -3, demand: 'Medium' },
        'onion': { price: 35, trend: 'stable', change: 0, demand: 'High' },
        'carrot': { price: 40, trend: 'up', change: 8, demand: 'Medium' },
        'spinach': { price: 25, trend: 'up', change: 12, demand: 'Very High' },
        'mango': { price: 80, trend: 'down', change: -5, demand: 'Low' }
      };
      
      const mockTrends = {
        'tomato': [
          { date: '2024-01-10', price: 42, demand: 'High' },
          { date: '2024-01-11', price: 43, demand: 'High' },
          { date: '2024-01-12', price: 44, demand: 'High' },
          { date: '2024-01-13', price: 45, demand: 'High' }
        ]
      };
      
      const mockRegional = {
        'delhi': { 'tomato': { price: 48, demand: 'Very High' } },
        'mumbai': { 'tomato': { price: 52, demand: 'Very High' } },
        'bangalore': { 'tomato': { price: 42, demand: 'High' } }
      };
      
      setPrices(mockPrices);
      setRegionalData(mockRegional);
      setTrends(mockTrends);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching market data:', error);
      setLoading(false);
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getDemandColor = (demand) => {
    switch(demand) {
      case 'Very High': return '#ef4444';
      case 'High': return '#f59e0b';
      case 'Medium': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading market data...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>📊 {t('dailyPrices')}</h1>
        <p>Real-time crop prices and market trends across India</p>
      </header>

      {/* Filters */}
      <div style={styles.filters}>
        <select 
          value={selectedCrop} 
          onChange={(e) => setSelectedCrop(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="tomato">Tomato</option>
          <option value="potato">Potato</option>
          <option value="onion">Onion</option>
          <option value="carrot">Carrot</option>
          <option value="spinach">Spinach</option>
          <option value="mango">Mango</option>
        </select>

        <select 
          value={selectedLocation} 
          onChange={(e) => setSelectedLocation(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="all">All Locations</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
          <option value="bangalore">Bangalore</option>
          <option value="chennai">Chennai</option>
          <option value="kolkata">Kolkata</option>
        </select>
      </div>

      {/* Price Cards */}
      <div style={styles.priceGrid}>
        {Object.entries(prices).map(([crop, data]) => (
          <div key={crop} style={styles.priceCard}>
            <h3 style={styles.cropName}>{crop.toUpperCase()}</h3>
            <div style={styles.priceMain}>
              <span style={styles.price}>₹{data.price}/kg</span>
              <span style={{
                ...styles.trend,
                color: data.trend === 'up' ? '#10b981' : data.trend === 'down' ? '#ef4444' : '#6b7280'
              }}>
                {getTrendIcon(data.trend)} {data.change}%
              </span>
            </div>
            <div style={styles.demand}>
              <span style={{
                ...styles.demandBadge,
                background: getDemandColor(data.demand)
              }}>
                {data.demand} Demand
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Price Trends Chart */}
      <div style={styles.section}>
        <h2>📈 {t('priceTrends')} - {selectedCrop.toUpperCase()}</h2>
        <div style={styles.trendChart}>
          {trends[selectedCrop]?.map((day, index) => (
            <div key={index} style={styles.trendBar}>
              <div 
                style={{
                  ...styles.trendFill,
                  height: `${(day.price / 100) * 2}px`
                }}
              ></div>
              <span style={styles.trendLabel}>{day.date.split('-')[2]}</span>
              <span style={styles.trendPrice}>₹{day.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Price Map */}
      <div style={styles.section}>
        <h2>🗺️ {t('regionalPrices')}</h2>
        <div style={styles.regionalGrid}>
          {Object.entries(regionalData).map(([region, crops]) => (
            <div key={region} style={styles.regionCard}>
              <h3 style={styles.regionName}>{region.toUpperCase()}</h3>
              <div style={styles.regionPrices}>
                {Object.entries(crops).slice(0, 3).map(([crop, data]) => (
                  <div key={crop} style={styles.regionCrop}>
                    <span>{crop}:</span>
                    <span>₹{data.price}</span>
                  </div>
                ))}
              </div>
              <div style={styles.demandIndicator}>
                Avg. Demand: <span style={{color: getDemandColor(crops.tomato.demand)}}>
                  {crops.tomato.demand}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Insights */}
      <div style={styles.section}>
        <h2>💡 {t('marketInsights')}</h2>
        <div style={styles.insights}>
          <div style={styles.insightCard}>
            <h4>🚀 Best Selling</h4>
            <ul>
              <li>Tomatoes in Mumbai (₹65/kg)</li>
              <li>Mangoes in Delhi (₹110/kg)</li>
              <li>Spinach in Bangalore (₹32/kg)</li>
            </ul>
          </div>
          <div style={styles.insightCard}>
            <h4>📉 Price Drops</h4>
            <ul>
              <li>Potatoes -12% in Punjab</li>
              <li>Onions -8% in Kolkata</li>
              <li>Carrots -5% in Chennai</li>
            </ul>
          </div>
          <div style={styles.insightCard}>
            <h4>🎯 Recommendations</h4>
            <ul>
              <li>Sell tomatoes this week</li>
              <li>Hold potato inventory</li>
              <li>Good time to buy onions</li>
            </ul>
          </div>
        </div>
      </div>

      <button 
        onClick={fetchMarketData}
        style={styles.refreshButton}
      >
        🔄 Refresh Market Data
      </button>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8fafc',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
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
  filters: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  filterSelect: {
    padding: '10px 15px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    background: 'white',
    fontSize: '14px'
  },
  priceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  priceCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  cropName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0 0 15px 0'
  },
  priceMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginBottom: '15px'
  },
  price: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#10b981'
  },
  trend: {
    fontSize: '14px',
    fontWeight: '600'
  },
  demand: {
    marginTop: '10px'
  },
  demandBadge: {
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  section: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  trendChart: {
    display: 'flex',
    alignItems: 'end',
    gap: '15px',
    height: '200px',
    marginTop: '20px',
    padding: '20px',
    background: '#f8fafc',
    borderRadius: '10px'
  },
  trendBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    flex: 1
  },
  trendFill: {
    width: '20px',
    background: 'linear-gradient(to top, #10b981, #34d399)',
    borderRadius: '5px 5px 0 0',
    minHeight: '5px'
  },
  trendLabel: {
    fontSize: '12px',
    color: '#6b7280'
  },
  trendPrice: {
    fontSize: '11px',
    color: '#374151',
    fontWeight: '600'
  },
  regionalGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '15px',
    marginTop: '20px'
  },
  regionCard: {
    background: '#f8fafc',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb'
  },
  regionName: {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#374151'
  },
  regionPrices: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginBottom: '10px'
  },
  regionCrop: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px'
  },
  demandIndicator: {
    fontSize: '11px',
    color: '#6b7280'
  },
  insights: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  insightCard: {
    background: '#f8fafc',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb'
  },
  refreshButton: {
    display: 'block',
    margin: '0 auto',
    padding: '12px 24px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600'
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

export default MarketPrices;