import express from 'express';
import MarketDataService from '../services/marketData.js';

const router = express.Router();

// Get current market prices
router.get('/prices', (req, res) => {
  try {
    const { location } = req.query;
    const prices = MarketDataService.getDailyPrices(location);
    
    res.json({
      success: true,
      data: prices,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get price trends for a specific crop
router.get('/trends/:crop', (req, res) => {
  try {
    const { crop } = req.params;
    const { days = 7 } = req.query;
    
    const trends = MarketDataService.getPriceTrends(crop, parseInt(days));
    
    res.json({
      success: true,
      data: trends,
      crop: crop
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get regional price comparison
router.get('/regional', (req, res) => {
  try {
    const regionalData = MarketDataService.getRegionalPrices();
    
    res.json({
      success: true,
      data: regionalData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get market insights
router.get('/insights', (req, res) => {
  try {
    const insights = {
      topPerforming: ['tomato', 'mango', 'spinach'],
      highDemand: ['tomato', 'carrot'],
      priceDrops: ['potato', 'onion'],
      recommendations: [
        "Tomato prices expected to rise 15% next week",
        "Good time to sell mangoes in Mumbai market",
        "Potato supply increasing, consider holding inventory"
      ]
    };
    
    res.json({
      success: true,
      data: insights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;