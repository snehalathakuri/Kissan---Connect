import React, { useState } from 'react';

const MarketPlace = ({ user }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    location: '',
    cropType: '',
    freshness: '',
    discount: false,
    sortBy: 'newest'
  });

  const crops = [
    { 
      id: 1, 
      name: 'Organic Tomatoes', 
      price: 45, 
      originalPrice: 50,
      farmer: 'Rajesh Kumar', 
      rating: 4.8, 
      location: 'Punjab',
      freshness: 'Very Fresh',
      freshnessLevel: 95,
      shelfLife: '7 days',
      image: '🍅',
      cropType: 'Vegetables',
      discount: 10,
      uploaded: '2 hours ago'
    },
    { 
      id: 2, 
      name: 'Fresh Potatoes', 
      price: 30, 
      originalPrice: 35,
      farmer: 'Priya Singh', 
      rating: 4.6, 
      location: 'Haryana',
      freshness: 'Fresh',
      freshnessLevel: 85,
      shelfLife: '15 days',
      image: '🥔',
      cropType: 'Vegetables',
      discount: 14,
      uploaded: '5 hours ago'
    },
    { 
      id: 3, 
      name: 'Green Spinach', 
      price: 25, 
      originalPrice: 25,
      farmer: 'Amit Patel', 
      rating: 4.9, 
      location: 'Maharashtra',
      freshness: 'Very Fresh',
      freshnessLevel: 92,
      shelfLife: '3 days',
      image: '🥬',
      cropType: 'Leafy Greens',
      discount: 0,
      uploaded: '1 hour ago'
    },
    { 
      id: 4, 
      name: 'Seasonal Mangoes', 
      price: 80, 
      originalPrice: 100,
      farmer: 'Sneha Reddy', 
      rating: 4.7, 
      location: 'Karnataka',
      freshness: 'Fresh',
      freshnessLevel: 88,
      shelfLife: '5 days',
      image: '🥭',
      cropType: 'Fruits',
      discount: 20,
      uploaded: '3 hours ago'
    },
    { 
      id: 5, 
      name: 'Organic Carrots', 
      price: 35, 
      originalPrice: 40,
      farmer: 'Rahul Sharma', 
      rating: 4.5, 
      location: 'Uttar Pradesh',
      freshness: 'Very Fresh',
      freshnessLevel: 90,
      shelfLife: '10 days',
      image: '🥕',
      cropType: 'Vegetables',
      discount: 12,
      uploaded: '6 hours ago'
    },
    { 
      id: 6, 
      name: 'Fresh Onions', 
      price: 28, 
      originalPrice: 28,
      farmer: 'Anita Verma', 
      rating: 4.4, 
      location: 'Gujarat',
      freshness: 'Average',
      freshnessLevel: 75,
      shelfLife: '20 days',
      image: '🧅',
      cropType: 'Vegetables',
      discount: 0,
      uploaded: '1 day ago'
    }
  ];

  const locations = [...new Set(crops.map(crop => crop.location))];
  const cropTypes = [...new Set(crops.map(crop => crop.cropType))];
  const freshnessLevels = ['Very Fresh', 'Fresh', 'Average'];

  const filteredCrops = crops.filter(crop => {
    return (
      crop.price >= filters.priceRange[0] &&
      crop.price <= filters.priceRange[1] &&
      (filters.location === '' || crop.location === filters.location) &&
      (filters.cropType === '' || crop.cropType === filters.cropType) &&
      (filters.freshness === '' || crop.freshness === filters.freshness) &&
      (!filters.discount || crop.discount > 0)
    );
  }).sort((a, b) => {
    switch(filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'freshness':
        return b.freshnessLevel - a.freshnessLevel;
      default:
        return 0;
    }
  });

  const getFreshnessColor = (level) => {
    if (level >= 90) return '#10b981';
    if (level >= 80) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🏪 Marketplace</h1>
        <p>Fresh crops from local farmers with AI quality analysis</p>
      </header>

      {/* Filters Section */}
      <div style={styles.filtersSection}>
        <h3>🔍 Filter & Sort</h3>
        
        <div style={styles.filtersGrid}>
          {/* Price Range */}
          <div style={styles.filterGroup}>
            <label>Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
              style={styles.rangeInput}
            />
          </div>

          {/* Location Filter */}
          <div style={styles.filterGroup}>
            <label>Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              style={styles.select}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Crop Type Filter */}
          <div style={styles.filterGroup}>
            <label>Crop Type</label>
            <select
              value={filters.cropType}
              onChange={(e) => setFilters({...filters, cropType: e.target.value})}
              style={styles.select}
            >
              <option value="">All Types</option>
              {cropTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Freshness Filter */}
          <div style={styles.filterGroup}>
            <label>Freshness</label>
            <select
              value={filters.freshness}
              onChange={(e) => setFilters({...filters, freshness: e.target.value})}
              style={styles.select}
            >
              <option value="">All Freshness</option>
              {freshnessLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Discount Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.discount}
                onChange={(e) => setFilters({...filters, discount: e.target.checked})}
                style={styles.checkbox}
              />
              Discount Only
            </label>
          </div>

          {/* Sort By */}
          <div style={styles.filterGroup}>
            <label>Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              style={styles.select}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
              <option value="freshness">Best Freshness</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        <div style={styles.activeFilters}>
          {filters.location && (
            <span style={styles.activeFilter}>📍 {filters.location}</span>
          )}
          {filters.cropType && (
            <span style={styles.activeFilter}>🌱 {filters.cropType}</span>
          )}
          {filters.freshness && (
            <span style={styles.activeFilter}>🆕 {filters.freshness}</span>
          )}
          {filters.discount && (
            <span style={styles.activeFilter}>💰 Discount</span>
          )}
          <span style={styles.resultCount}>{filteredCrops.length} crops found</span>
        </div>
      </div>

      {/* Crops Grid */}
      <div style={styles.grid}>
        {filteredCrops.map(crop => (
          <div key={crop.id} style={styles.cropCard}>
            {/* Crop Image */}
            <div style={styles.imageSection}>
              <div style={styles.cropImage}>{crop.image}</div>
              {crop.discount > 0 && (
                <div style={styles.discountBadge}>{crop.discount}% OFF</div>
              )}
            </div>

            {/* Crop Details */}
            <div style={styles.details}>
              <h3 style={styles.cropName}>{crop.name}</h3>
              
              {/* Price Section */}
              <div style={styles.priceSection}>
                <span style={styles.currentPrice}>₹{crop.price}/kg</span>
                {crop.originalPrice > crop.price && (
                  <span style={styles.originalPrice}>₹{crop.originalPrice}</span>
                )}
              </div>

              {/* Farmer & Location */}
              <div style={styles.farmerInfo}>
                <span>👨‍🌾 {crop.farmer}</span>
                <span>📍 {crop.location}</span>
              </div>

              {/* Freshness & Quality */}
              <div style={styles.qualitySection}>
                <div style={styles.freshness}>
                  <span>Freshness: </span>
                  <span style={{color: getFreshnessColor(crop.freshnessLevel)}}>
                    {crop.freshness} ({crop.freshnessLevel}%)
                  </span>
                </div>
                <div style={styles.shelfLife}>📅 {crop.shelfLife} shelf life</div>
              </div>

              {/* Rating & Upload Time */}
              <div style={styles.metaInfo}>
                <div style={styles.rating}>⭐ {crop.rating}</div>
                <div style={styles.uploadTime}>{crop.uploaded}</div>
              </div>

              {/* AI Analysis Badge */}
              <div style={styles.aiBadge}>
                🤖 AI Verified Quality
              </div>

              <button style={styles.buyButton}>
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div style={styles.noResults}>
          <h3>No crops found matching your filters</h3>
          <p>Try adjusting your filter criteria</p>
        </div>
      )}
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
  filtersSection: {
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  filtersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  rangeInput: {
    width: '100%'
  },
  select: {
    padding: '10px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  checkbox: {
    width: '16px',
    height: '16px'
  },
  activeFilters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center'
  },
  activeFilter: {
    background: '#ecfdf5',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    border: '1px solid #10b981'
  },
  resultCount: {
    marginLeft: 'auto',
    fontWeight: '600',
    color: '#6b7280'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '25px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  cropCard: {
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  imageSection: {
    position: 'relative',
    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    padding: '30px',
    textAlign: 'center'
  },
  cropImage: {
    fontSize: '64px'
  },
  discountBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: '#ef4444',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  details: {
    padding: '20px'
  },
  cropName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#1f2937'
  },
  priceSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px'
  },
  currentPrice: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#10b981'
  },
  originalPrice: {
    fontSize: '14px',
    color: '#9ca3af',
    textDecoration: 'line-through'
  },
  farmerInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '15px'
  },
  qualitySection: {
    background: '#f8fafc',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px'
  },
  freshness: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    marginBottom: '5px'
  },
  shelfLife: {
    fontSize: '13px',
    color: '#6b7280'
  },
  metaInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  rating: {
    color: '#f59e0b',
    fontWeight: '600'
  },
  uploadTime: {
    fontSize: '12px',
    color: '#9ca3af'
  },
  aiBadge: {
    background: '#e0e7ff',
    color: '#3730a3',
    padding: '5px 10px',
    borderRadius: '8px',
    fontSize: '12px',
    textAlign: 'center',
    marginBottom: '15px',
    fontWeight: '500'
  },
  buyButton: {
    width: '100%',
    background: '#10b981',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px'
  },
  noResults: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#6b7280'
  }
};

export default MarketPlace;