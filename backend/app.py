from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and model columns
model = joblib.load("model.pkl")  
model_columns = joblib.load("model_columns.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    
    # Convert input JSON to DataFrame
    df = pd.DataFrame([data])

    # Fill missing columns
    for col in model_columns:
        if col not in df.columns:
            df[col] = 0

    df = df[model_columns]  # Reorder columns

    y_proba = model.predict_proba(df)[:, 1]
    y_pred = int(y_proba[0] > 0.20)

    return jsonify({
        "prediction": y_pred,
        "probability": float(y_proba[0])
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
