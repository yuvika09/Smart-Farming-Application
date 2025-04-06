import os 
import pickle
import numpy as np
import pandas as pd
from django.conf import settings
from django.shortcuts import render
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Load the pre-trained model
model_path = os.path.join(settings.BASE_DIR, 'recommendation', 'models', 'KNN_model.pkl')
with open(model_path, 'rb') as model_file:
    classifier = pickle.load(model_file, fix_imports=True)

# Load and preprocess dataset (for dynamic scaling)
data_path = os.path.join(settings.BASE_DIR, 'recommendation', 'data', 'Crop_recommendation.csv')
data = pd.read_csv(data_path)
data['label'] = LabelEncoder().fit_transform(data['label'])
X = data.drop(['label'], axis=1)

# Initialize StandardScaler dynamically
scaler = StandardScaler()
scaler.fit(X)  # Fit the scaler to dataset features


def home(request):
    return render(request, 'recommendation/index.html')


def predict(request):
    if request.method == 'POST':
        try:
            # Get form input values
            N = float(request.POST.get('Nitrogen'))
            P = float(request.POST.get('Phosphorous'))
            K = float(request.POST.get('Potassium'))
            Temperature = float(request.POST.get('Temperature'))
            Humidity = float(request.POST.get('Humidity'))
            PH = float(request.POST.get('PH'))
            Rainfall = float(request.POST.get('Rainfall'))

            # Transform input using the fitted scaler
            input_data = np.array([N, P, K, Temperature, Humidity, PH, Rainfall]).reshape(1, -1)
            input_scaled = scaler.transform(input_data)

            # Predict crop
            predict1 = classifier.predict(input_scaled)[0]

            # Crop mapping
            crop_mapping = {
                0: 'Apple(सेब)', 1: 'Banana(केला)', 2: 'Blackgram(काला चना)',
                3: 'Chickpea(काबुली चना)', 4: 'Coconut(नारियल)', 5: 'Coffee(कॉफ़ी)',
                6: 'Cotton(कपास)', 7: 'Grapes(अंगूर)', 8: 'Jute(जूट)',
                9: 'Kidneybeans(राज़में)', 10: 'Lentil(मसूर की दाल)', 11: 'Maize(मक्का)',
                12: 'Mango(आम)', 13: 'Mothbeans(मोठबीन)', 14: 'Mungbeans(मूंग)',
                15: 'Muskmelon(खरबूजा)', 16: 'Orange(संतरा)', 17: 'Papaya(पपीता)',
                18: 'Pigeonpeas(कबूतर के मटर)', 19: 'Pomegranate(अनार)', 20: 'Rice(चावल)',
                21: 'Watermelon(तरबूज)'
            }
            crop_name = crop_mapping.get(predict1, "Unknown Crop")

            # Create context for rendering
            context = {
                'cropName': crop_name,
                'values': [N, P, K, Humidity, Temperature, Rainfall, PH],
                'cont': [
                    get_n_level(N),
                    get_p_level(P),
                    get_k_level(K),
                    get_humidity_level(Humidity),
                    get_temperature_level(Temperature),
                    get_rainfall_level(Rainfall),
                    get_ph_level(PH)
                ]
            }
            print("Context Data:", context)
            return render(request, 'recommendation/result.html', context)

        except Exception as e:
            return render(request, 'recommendation/error.html', {'error': str(e)})

    return render(request, 'recommendation/result.html')


# Helper functions for classification levels
def get_humidity_level(h):
    if 1 <= h <= 33:
        return 'Low Humid'
    elif 34 <= h <= 66:
        return 'Medium Humid'
    return 'High Humid'


def get_temperature_level(t):
    if 0 <= t <= 6:
        return 'Cool'
    elif 7 <= t <= 25:
        return 'Warm'
    return 'Hot'


def get_rainfall_level(r):
    if 1 <= r <= 100:
        return 'Less'
    elif 101 <= r <= 200:
        return 'Moderate'
    return 'Heavy Rain'


def get_n_level(n):
    if 1 <= n <= 50:
        return 'Less'
    elif 51 <= n <= 100:
        return 'Not too less and Not too High'
    return 'High'


def get_p_level(p):
    if 1 <= p <= 50:
        return 'Less'
    elif 51 <= p <= 100:
        return 'Not too less and Not too High'
    return 'High'


def get_k_level(k):
    if 1 <= k <= 50:
        return 'Less'
    elif 51 <= k <= 100:
        return 'Not too less and Not too High'
    return 'High'


def get_ph_level(ph):
    if 0 <= ph <= 5:
        return 'Acidic'
    elif 6 <= ph <= 8:
        return 'Neutral'
    return 'Alkaline'
