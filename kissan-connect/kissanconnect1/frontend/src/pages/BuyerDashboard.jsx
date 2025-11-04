import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BuyerDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample Data
  const buyerData = {
    orders: [
      { id: 1, crop: 'Organic Tomatoes', farmer: 'Rajesh Kumar', quantity: '10kg', amount: '₹450', status: 'Delivered', date: '2024-01-15' },
      { id: 2, crop: 'Fresh Potatoes', farmer: 'Priya Singh', quantity: '5kg', amount: '₹150', status: 'Processing', date: '2024-01-16' },
      { id: 3, crop: 'Green Spinach', farmer: 'Amit Patel', quantity: '2kg', amount: '₹50', status: 'Shipped', date: '2024-01-14' }
    ],
    favorites: [
      { id: 1, crop: 'Organic Tomatoes', farmer: 'Rajesh Kumar', price: '₹45/kg', rating: '4.8' },
      { id: 2, crop: 'Seasonal Mangoes', farmer: 'Sneha Reddy', price: '₹80/kg', rating: '4.7' }
    ],
    notifications: [
      { id: 1, message: 'Price drop on Organic Tomatoes! Now ₹42/kg', time: '2 hours ago', type: 'price_alert' },
      { id: 2, message: 'Your order #ORD002 has been shipped', time: '1 day ago', type: 'order_update' },
      { id: 3, message: 'New crops available from farmers near you', time: '3 hours ago', type: 'new_crops' }
    ]
  };

  const renderOrders = () => (
    <div style={styles.section}>
      <h3>📋 My Orders</h3>
      <div style={styles.ordersGrid}>
        {buyerData.orders.map(order => (
          <div key={order.id} style={styles.orderCard}>
            <h4>{order.crop}</h4>
            <p>Farmer: {order.farmer}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Amount: {order.amount}</p>
            <p>Date: {order.date}</p>
            <div style={{
              ...styles.status,
              background: order.status === 'Delivered' ? '#ecfdf5' : 
                         order.status === 'Shipped' ? '#e0e7ff' : '#fef3c7',
              color: order.status === 'Delivered' ? '#065f46' : 
                    order.status === 'Shipped' ? '#3730a3' : '#92400e'
            }}>
              {order.status}
            </div>
            {order.status !== 'Delivered' && (
              <button style={styles.trackButton}>Track Order</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div style={styles.section}>
      <h3>⭐ Favorites</h3>
      <div style={styles.favoritesGrid}>
        {buyerData.favorites.map(fav => (
          <div key={fav.id} style={styles.favoriteCard}>
            <h4>{fav.crop}</h4>
            <p>Farmer: {fav.farmer}</p>
            <p>Price: {fav.price}</p>
            <p>Rating: ⭐ {fav.rating}</p>
            <div style={styles.favoriteActions}>
              <button style={styles.buyButton}>Buy Now</button>
              <button style={styles.removeButton}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div style={styles.section}>
      <h3>🔔 Notifications</h3>
      <div style={styles.notificationsList}>
        {buyerData.notifications.map(notification => (
          <div key={notification.id} style={styles.notificationCard}>
            <div style={styles.notificationIcon}>
              {notification.type === 'price_alert' ? '💰' : 
               notification.type === 'order_update' ? '📦' : '🌱'}
            </div>
            <div style={styles.notificationContent}>
              <p style={styles.notificationMessage}>{notification.message}</p>
              <span style={styles.notificationTime}>{notification.time}</span>
            </div>
            <button style={styles.dismissButton}>×</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🛒 Buyer Dashboard</h1>
        <p>Welcome, {user?.name || 'Buyer'}!</p>
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
          style={{...styles.tab, ...(activeTab === 'orders' && styles.activeTab)}}
          onClick={() => setActiveTab('orders')}
        >
          📋 My Orders
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === 'favorites' && styles.activeTab)}}
          onClick={() => setActiveTab('favorites')}
        >
          ⭐ Favorites
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === 'notifications' && styles.activeTab)}}
          onClick={() => setActiveTab('notifications')}
        >
          🔔 Notifications
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {activeTab === 'dashboard' && (
          <>
            {/* Quick Stats */}
            <div style={styles.stats}>
              <div style={styles.statCard}>
                <h3>{buyerData.orders.length}</h3>
                <p>Total Orders</p>
              </div>
              <div style={styles.statCard}>
                <h3>{buyerData.favorites.length}</h3>
                <p>Favorites</p>
              </div>
              <div style={styles.statCard}>
                <h3>{buyerData.notifications.length}</h3>
                <p>Notifications</p>
              </div>
              <div style={styles.statCard}>
                <h3>₹655</h3>
                <p>Total Spent</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.grid}>
              <div style={styles.card} onClick={() => navigate('/market')}>
                <h3>🛒 Marketplace</h3>
                <p>Browse fresh crops</p>
              </div>
              
              <div style={styles.card} onClick={() => setActiveTab('orders')}>
                <h3>📋 My Orders</h3>
                <p>View your purchases</p>
              </div>
              
              <div style={styles.card} onClick={() => setActiveTab('favorites')}>
                <h3>⭐ Favorites</h3>
                <p>Saved farmers & crops</p>
              </div>
              
              <div style={styles.card} onClick={() => setActiveTab('notifications')}>
                <h3>🔔 Notifications</h3>
                <p>Price alerts & updates</p>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div style={styles.previewSection}>
              <h3>Recent Orders</h3>
              <div style={styles.previewGrid}>
                {buyerData.orders.slice(0, 2).map(order => (
                  <div key={order.id} style={styles.previewCard}>
                    <h4>{order.crop}</h4>
                    <p>{order.amount} • {order.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'favorites' && renderFavorites()}
        {activeTab === 'notifications' && renderNotifications()}
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
    background: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6'
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
  previewSection: {
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '15px'
  },
  previewCard: {
    background: '#f8fafc',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb'
  },
  // Section Styles
  section: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  // Orders Styles
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
  trackButton: {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  // Favorites Styles
  favoritesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  favoriteCard: {
    background: '#f8fafc',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  favoriteActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px'
  },
  buyButton: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    flex: 1
  },
  removeButton: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    flex: 1
  },
  // Notifications Styles
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px'
  },
  notificationCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    background: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  notificationIcon: {
    fontSize: '24px'
  },
  notificationContent: {
    flex: 1
  },
  notificationMessage: {
    margin: '0 0 5px 0',
    fontWeight: '500'
  },
  notificationTime: {
    fontSize: '12px',
    color: '#6b7280'
  },
  dismissButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#6b7280'
  }
};

export default BuyerDashboard;