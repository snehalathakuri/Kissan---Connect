from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import cv2
import base64
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

class CropAnalyzer:
    def __init__(self):
        self.crop_prices = {
            'tomato': {'min': 30, 'max': 60},
            'potato': {'min': 20, 'max': 40},
            'onion': {'min': 25, 'max': 45},
            'carrot': {'min': 35, 'max': 55},
            'brinjal': {'min': 28, 'max': 48}
        }
    
    def analyze_image(self, image_data):
        # Simulate image analysis
        quality_score = random.uniform(70, 95)
        freshness_days = random.randint(3, 10)
        
        defects = []
        if random.random() > 0.7:
            defects.append('minor bruises')
        if random.random() > 0.8:
            defects.append('slight discoloration')
        if random.random() > 0.9:
            defects.append('small pest marks')
        
        return quality_score, freshness_days, defects
    
    def calculate_price(self, crop_type, quality, freshness, location):
        base_range = self.crop_prices.get(crop_type.lower(), {'min': 25, 'max': 50})
        
        # Adjust based on quality
        quality_factor = quality / 100
        base_price = base_range['min'] + (base_range['max'] - base_range['min']) * quality_factor
        
        # Adjust based on freshness
        freshness_factor = freshness / 10  # 10 days max freshness
        adjusted_price = base_price * (0.8 + 0.4 * freshness_factor)
        
        # Add location premium (simulated)
        metro_premium = 1.1 if location in ['delhi', 'mumbai', 'bangalore'] else 1.0
        final_price = adjusted_price * metro_premium
        
        return round(final_price, 2)
    
    def get_market_demand(self, crop_type, location):
        demands = ['High', 'Medium', 'Low']
        return random.choice(demands)
    
    def generate_analysis(self, crop_data, image_data=None):
        crop_type = crop_data.get('cropName', 'tomato').lower()
        location = crop_data.get('location', '').lower()
        
        if image_data:
            quality_score, freshness_days, defects = self.analyze_image(image_data)
        else:
            quality_score = random.uniform(75, 92)
            freshness_days = random.randint(4, 8)
            defects = ['minor bruises'] if random.random() > 0.6 else []
        
        suggested_price = self.calculate_price(crop_type, quality_score, freshness_days, location)
        market_demand = self.get_market_demand(crop_type, location)
        
        # Generate price reasons
        price_reasons = []
        if quality_score > 85:
            price_reasons.append("Excellent quality score ({:.0f}%)".format(quality_score))
        elif quality_score > 70:
            price_reasons.append("Good quality score ({:.0f}%)".format(quality_score))
        else:
            price_reasons.append("Average quality score ({:.0f}%)".format(quality_score))
        
        if market_demand == 'High':
            price_reasons.append("High market demand in your region")
        elif market_demand == 'Medium':
            price_reasons.append("Moderate market demand")
        else:
            price_reasons.append("Lower market demand currently")
        
        if len(defects) == 0:
            price_reasons.append("No significant defects detected")
        else:
            price_reasons.append("Minor defects slightly reduce value")
        
        # Shelf life analysis
        shelf_life_factors = [
            "Optimal harvest timing",
            "Good storage conditions",
            "Minimal physical damage",
            "Favorable weather conditions"
        ]
        
        analysis = {
            "crop": crop_type.capitalize(),
            "quality_score": round(quality_score, 1),
            "freshness_days": freshness_days,
            "defects": defects,
            "market_demand": market_demand,
            "suggested_price": suggested_price,
            "confidence": round(random.uniform(0.85, 0.95), 2),
            "ai_notes": "AI analysis complete. {} quality {} with {} market demand.".format(
                'High' if quality_score > 80 else 'Good' if quality_score > 70 else 'Average',
                crop_type,
                market_demand.lower()
            ),
            "price_reasons": price_reasons,
            "shelf_life_analysis": {
                "predicted_days": freshness_days,
                "factors": random.sample(shelf_life_factors, min(3, len(shelf_life_factors)))
            }
        }
        
        return analysis

analyzer = CropAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze_crop():
    try:
        data = request.json
        crop_data = data.get('crop_data', {})
        image_data = data.get('image_data')
        
        analysis = analyzer.generate_analysis(crop_data, image_data)
        
        return jsonify({
            'success': True,
            'analysis': analysis
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'AI Service is running'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)