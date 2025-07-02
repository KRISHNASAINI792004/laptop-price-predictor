import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Load the dataset
df = pd.read_csv('laptops.csv')

X = df[['ram', 'storage']]
y = df['price']

# Train the model
model = LinearRegression()
model.fit(X, y)

# Save the model
joblib.dump(model, 'model.pkl')

print("Model saved!")
