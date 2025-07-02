from rest_framework.views import APIView
from rest_framework.response import Response
import joblib

# Load the trained model
model = joblib.load('../model.pkl')  # adjust the path if needed

class PredictPrice(APIView):
    def post(self, request):
        ram = int(request.data.get('ram', 0))
        storage = int(request.data.get('storage', 0))
        
        # Make prediction
        prediction = model.predict([[ram, storage]])
        return Response({'predicted_price': round(prediction[0], 2)})
