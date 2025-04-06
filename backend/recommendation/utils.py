def get_humidity_level(h):
    if 1 <= h <= 33: return 'Low Humid'
    elif 34 <= h <= 66: return 'Medium Humid'
    return 'High Humid'

def get_temperature_level(t):
    if 0 <= t <= 6: return 'Cool'
    elif 7 <= t <= 25: return 'Warm'
    return 'Hot'

def get_rainfall_level(r):
    if 1 <= r <= 100: return 'Less'
    elif 101 <= r <= 200: return 'Moderate'
    return 'Heavy Rain'

def get_npk_level(value, nutrient):
    if 1 <= value <= 50:
        return f'{nutrient} Level: Low'
    elif 51 <= value <= 100:
        return f'{nutrient} Level: Moderate'
    return f'{nutrient} Level: High'

def get_ph_level(ph):
    if 0 <= ph <= 5: return 'Acidic'
    elif 6 <= ph <= 8: return 'Neutral'
    return 'Alkaline'
