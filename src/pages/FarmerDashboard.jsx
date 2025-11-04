import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [cropHistory, setCropHistory] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Load crop history from localStorage
  useEffect(() => {
    const savedCrops = JSON.parse(localStorage.getItem('cropHistory') || '[]');
    setCropHistory(savedCrops);
    
    // Calculate total revenue
    const total = savedCrops.reduce((sum, crop) => sum + (crop.quantity * crop.suggested_price), 0);
    setRevenue(total);
  }, []);

  // Analytics Data
  const analyticsData = {
    revenueTrend: [45000, 52000, 48000, 61000, 55000, 72000],
    topCrops: [
      { name: 'Tomatoes', sales: 35 },
      { name: 'Potatoes', sales: 25 },
      { name: 'Onions', sales: 20 }
    ],
    orders: [
      { id: 1, crop: 'Organic Tomatoes', buyer: 'Rahul Sharma', quantity: '50kg', amount: '₹2,500', status: 'Completed' },
      { id: 2, crop: 'Fresh Potatoes', buyer: 'Priya Singh', quantity: '100kg', amount: '₹4,000', status: 'Pending' },
      { id: 3, crop: 'Green Vegetables', buyer: 'Amit Patel', quantity: '25kg', amount: '₹875', status: 'Completed' }
    ]
  };

  const renderAnalytics = () => (
    <div style={styles.analyticsSection}>
      <h3>📊 Detailed Analytics</h3>
      <div style={styles.analyticsGrid}>
        <div style={styles.chartCard}>
          <h4>Revenue Trend (Last 6 Months)</h4>
          <div style={styles.chart}>
            {analyticsData.revenueTrend.map((amount, index) => (
              <div key={index} style={styles.barContainer}>
                <div 
                  style={{
                    ...styles.bar,
                    height: `${(amount / 80000) * 100}px`,
                    background: amount > 60000 ? '#10b981' : '#f59e0b'
                  }}
                ></div>
                <span style={styles.barLabel}>₹{(amount / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>
        
        <div style={styles.chartCard}>
          <h4>Top Selling Crops</h4>
          <div style={styles.pieChart}>
            {analyticsData.topCrops.map((crop, index) => (
              <div key={crop.name} style={styles.pieSegment}>
                <div style={{
                  ...styles.pieColor,
                  background: ['#10b981', '#f59e0b', '#ef4444'][index]
                }}></div>
                <span>{crop.name}: {crop.sales}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div style={styles.revenueSection}>
      <h3>💰 Revenue Details</h3>
      <div style={styles.revenueCards}>
        <div style={styles.revenueCard}>
          <h4>Total Revenue</h4>
          <p style={styles.revenueAmount}>₹{revenue.toLocaleString()}</p>
        </div>
        <div style={styles.revenueCard}>
          <h4>This Month</h4>
          <p style={styles.revenueAmount}>₹45,680</p>
        </div>
        <div style={styles.revenueCard}>
          <h4>Pending Payments</h4>
          <p style={styles.revenueAmount}>₹8,500</p>
        </div>
      </div>
      <div style={styles.transactionHistory}>
        <h4>Recent Transactions</h4>
        {analyticsData.orders.filter(order => order.status === 'Completed').map(order => (
          <div key={order.id} style={styles.transaction}>
            <span>{order.crop}</span>
            <span>{order.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div style={styles.ordersSection}>
      <h3>📦 Order Management</h3>
      <div style={styles.ordersGrid}>
        {analyticsData.orders.map(order => (
          <div key={order.id} style={styles.orderCard}>
            <h4>{order.crop}</h4>
            <p>Buyer: {order.buyer}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Amount: {order.amount}</p>
            <div style={{
              ...styles.status,
              background: order.status === 'Completed' ? '#ecfdf5' : '#fef3c7',
              color: order.status === 'Completed' ? '#065f46' : '#92400e'
            }}>
              {order.status}
            </div>
            {order.status === 'Pending' && (
              <button style={styles.confirmButton}>Confirm Order</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>👨‍🌾 Farmer Dashboard</h1>
        <p>Welcome back, {user?.name || 'Farmer'}!</p>
      </header>
      
      {/* Navigation Tabs */}
      <div style={styles.tabs}>
        <button 
          style={{...styles.tab, ...(activeTab === 'dashboard' && styles.activeTab)}}
          onClick={() => setActiveTab('dashboard')}
        >
          🏠 Dashboard
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === 'analytics' && styles.activeTab)}}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Analytics
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === 'revenue' && styles.activeTab)}}
          onClick={() => setActiveTab('revenue')}
        >
          💰 Revenue
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === 'orders' && styles.activeTab)}}
          onClick={() => setActiveTab('orders')}
        >
          📦 Orders
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {activeTab === 'dashboard' && (
          <>
            {/* Quick Stats */}
            <div style={styles.stats}>
              <div style={styles.statCard}>
                <h3>₹{revenue.toLocaleString()}</h3>
                <p>Total Revenue</p>
              </div>
              <div style={styles.statCard}>
                <h3>{cropHistory.length}</h3>
                <p>Active Listings</p>
              </div>
              <div style={styles.statCard}>
                <h3>{analyticsData.orders.length}</h3>
                <p>Total Orders</p>
              </div>
              <div style={styles.statCard}>
                <h3>4.8★</h3>
                <p>Rating</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.grid}>
              <div style={styles.card} onClick={() => navigate('/upload')}>
                <h3>📤 Upload Crop</h3>
                <p>Add new crops with AI analysis</p>
              </div>
              
              <div style={styles.card} onClick={() => setActiveTab('analytics')}>
                <h3>📊 Analytics</h3>
                <p>View sales and performance</p>
              </div>
              
              <div style={styles.card} onClick={() => navigate('/market')}>
                <h3>🏪 Market</h3>
                <p>Browse marketplace</p>
              </div>
              
              <div style={styles.card} onClick={() => setActiveTab('revenue')}>
                <h3>💰 Revenue</h3>
                <p>Track your earnings</p>
              </div>
            </div>

            {/* Crop History Section */}
            {cropHistory.length > 0 && (
              <div style={styles.historySection}>
                <h3>📋 Recent Crop Uploads</h3>
                <div style={styles.historyGrid}>
                  {cropHistory.slice(-4).map((crop, index) => (
                    <div key={index} style={styles.historyCard}>
                      <h4>{crop.cropName}</h4>
                      <p>Quantity: {crop.quantity}kg</p>
                      <p>Price: ₹{crop.suggested_price}/kg</p>
                      <p>Quality: {crop.quality_score}%</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'revenue' && renderRevenue()}
        {activeTab === 'orders' && renderOrders()}
      </div>
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
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  tab: {
    padding: '12px 24px',
    border: '2px solid #e5e7eb',
    background: 'white',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  activeTab: {
    background: '#10b981',
    color: 'white',
    borderColor: '#10b981'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
  },
  statCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  card: {
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'transform 0.2s'
  },
  historySection: {
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  historyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '15px'
  },
  historyCard: {
    background: '#f8fafc',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb'
  },
  // Analytics Styles
  analyticsSection: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    marginTop: '20px'
  },
  chartCard: {
    padding: '20px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px'
  },
  chart: {
    display: 'flex',
    alignItems: 'end',
    gap: '15px',
    height: '200px',
    marginTop: '20px'
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px'
  },
  bar: {
    width: '30px',
    borderRadius: '5px 5px 0 0',
    minHeight: '5px'
  },
  barLabel: {
    fontSize: '12px',
    color: '#6b7280'
  },
  pieChart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px'
  },
  pieSegment: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  pieColor: {
    width: '20px',
    height: '20px',
    borderRadius: '50%'
  },
  // Revenue Styles
  revenueSection: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  revenueCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  revenueCard: {
    background: '#ecfdf5',
    padding: '25px',
    borderRadius: '12px',
    textAlign: 'center',
    border: '2px solid #10b981'
  },
  revenueAmount: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#065f46',
    margin: '10px 0 0 0'
  },
  transactionHistory: {
    marginTop: '30px'
  },
  transaction: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px',
    background: '#f8fafc',
    borderRadius: '8px',
    marginBottom: '10px'
  },
  // Orders Styles
  ordersSection: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  ordersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  orderCard: {
    background: '#f8fafc',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  status: {
    display: 'inline-block',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    margin: '10px 0'
  },
  confirmButton: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default FarmerDashboard;