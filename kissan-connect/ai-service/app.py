from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

class CropAnalyzer:
    def __init__(self):
        self.crop_prices = {
            'tomato': {'min': 30, 'max': 60},
            'potato': {'min': 20, 'max': 40},
            'onion': {'min': 25, 'max': 45},
            'carrot': {'min': 35, 'max': 55},
            'spinach': {'min': 15, 'max': 30},
            'mango': {'min': 50, 'max': 100}
        }
    
    def analyze_quality(self, crop_type):
        # Simulate AI analysis based on crop type
        base_scores = {
            'tomato': 85, 'potato': 80, 'onion': 75, 
            'carrot': 88, 'spinach': 90, 'mango': 92
        }
        base_score = base_scores.get(crop_type.lower(), 80)
        quality_score = random.randint(base_score - 10, base_score + 5)
        return min(quality_score, 95)
    
    def predict_shelf_life(self, crop_type, harvest_date):
        shelf_life_ranges = {
            'tomato': (5, 10), 'potato': (10, 20), 'onion': (15, 30),
            'carrot': (7, 14), 'spinach': (3, 7), 'mango': (5, 8)
        }
        min_days, max_days = shelf_life_ranges.get(crop_type.lower(), (7, 14))
        return random.randint(min_days, max_days)
    
    def detect_defects(self, crop_type):
        common_defects = {
            'tomato': ['minor bruises', 'slight discoloration', 'soft spots'],
            'potato': ['small eyes', 'minor cuts', 'green patches'],
            'onion': ['sprouting', 'softness', 'mold'],
            'carrot': ['cracks', 'discoloration', 'soft ends'],
            'spinach': ['wilting', 'yellowing', 'small holes'],
            'mango': ['black spots', 'soft areas', 'uneven ripening']
        }
        defects = common_defects.get(crop_type.lower(), ['minor bruises'])
        return random.sample(defects, random.randint(0, min(2, len(defects))))
    
    def calculate_price(self, crop_type, quality_score, location):
        base_range = self.crop_prices.get(crop_type.lower(), {'min': 25, 'max': 50})
        
        # Adjust based on quality
        quality_factor = quality_score / 100
        base_price = base_range['min'] + (base_range['max'] - base_range['min']) * quality_factor
        
        # Location premium
        metro_bonus = 1.15 if any(city in location.lower() for city in ['delhi', 'mumbai', 'bangalore']) else 1.0
        final_price = base_price * metro_bonus
        
        return round(final_price, 2)
    
    def analyze_crop(self, crop_data):
        crop_type = crop_data.get('cropName', '').lower()
        location = crop_data.get('location', '')
        
        quality_score = self.analyze_quality(crop_type)
        shelf_life = self.predict_shelf_life(crop_type, crop_data.get('harvestDate'))
        defects = self.detect_defects(crop_type)
        suggested_price = self.calculate_price(crop_type, quality_score, location)
        
        # Market demand simulation
        demands = ['High', 'Medium', 'Low']
        market_demand = random.choice(demands)
        
        # Generate detailed analysis
        analysis = {
            "crop": crop_type.capitalize(),
            "quality_score": quality_score,
            "freshness_days": shelf_life,
            "defects": defects,
            "market_demand": market_demand,
            "suggested_price": suggested_price,
            "confidence": round(random.uniform(0.85, 0.95), 2),
            "ai_notes": f"Good quality {crop_type} with {len(defects)} minor issues. {market_demand} market demand in your area.",
            "price_reasons": [
                f"Quality score: {quality_score}%",
                f"Market demand: {market_demand}",
                f"Freshness: {shelf_life} days remaining",
                "Location-based pricing applied",
                f"{len(defects)} minor defects noted" if defects else "No significant defects"
            ],
            "shelf_life_analysis": {
                "predicted_days": shelf_life,
                "factors": [
                    "Optimal harvest timing",
                    "Good storage conditions",
                    "Quality preservation",
                    f"Typical {crop_type} shelf life"
                ]
            },
            "improvement_suggestions": [
                "Harvest at optimal maturity",
                "Maintain proper storage temperature",
                "Handle with care to reduce bruises",
                "Sell within recommended timeframe"
            ]
        }
        
        return analysis

analyzer = CropAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze_crop():
    try:
        data = request.json
        crop_data = data.get('crop_data', {})
        
        analysis = analyzer.analyze_crop(crop_data)
        
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
    return jsonify({'status': 'AI Service is running', 'version': '1.0.0'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)