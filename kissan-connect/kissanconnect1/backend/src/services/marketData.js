import axios from 'axios';

class MarketDataService {
  constructor() {
    this.cropPrices = {
      'tomato': { base: 45, range: [30, 60] },
      'potato': { base: 30, range: [20, 40] },
      'onion': { base: 35, range: [25, 45] },
      'carrot': { base: 40, range: [30, 50] },
      'spinach': { base: 25, range: [15, 35] },
      'mango': { base: 80, range: [50, 120] }
    };
    
    this.locations = {
      'delhi': { premium: 1.2, demand: 'High' },
      'mumbai': { premium: 1.25, demand: 'Very High' },
      'bangalore': { premium: 1.15, demand: 'High' },
      'chennai': { premium: 1.1, demand: 'Medium' },
      'kolkata': { premium: 1.05, demand: 'Medium' },
      'punjab': { premium: 0.9, demand: 'Low' },
      'default': { premium: 1.0, demand: 'Medium' }
    };
  }

  getDailyPrices(location = 'default') {
    const locationData = this.locations[location.toLowerCase()] || this.locations.default;
    const today = new Date();
    
    const prices = {};
    Object.keys(this.cropPrices).forEach(crop => {
      const basePrice = this.cropPrices[crop].base;
      const range = this.cropPrices[crop].range;
      
      // Simulate daily price fluctuations (±15%)
      const dailyVariation = 0.85 + (Math.random() * 0.3);
      const locationMultiplier = locationData.premium;
      
      const finalPrice = Math.round(basePrice * dailyVariation * locationMultiplier);
      const inRangePrice = Math.max(range[0], Math.min(range[1], finalPrice));
      
      prices[crop] = {
        price: inRangePrice,
        demand: locationData.demand,
        trend: dailyVariation > 1 ? 'up' : dailyVariation < 0.95 ? 'down' : 'stable',
        change: Math.round((dailyVariation - 1) * 100)
      };
    });
    
    return prices;
  }

  getPriceTrends(crop, days = 7) {
    const trends = [];
    const basePrice = this.cropPrices[crop]?.base || 30;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const variation = 0.8 + (Math.random() * 0.4);
      const price = Math.round(basePrice * variation);
      
      trends.push({
        date: date.toISOString().split('T')[0],
        price: price,
        demand: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
      });
    }
    
    return trends;
  }

  getRegionalPrices() {
    const regions = Object.keys(this.locations).filter(loc => loc !== 'default');
    const regionalData = {};
    
    regions.forEach(region => {
      regionalData[region] = this.getDailyPrices(region);
    });
    
    return regionalData;
  }
}

export default new MarketDataService();