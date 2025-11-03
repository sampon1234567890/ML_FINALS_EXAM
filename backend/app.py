from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
import sys
import numpy as np
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add utils to path
sys.path.append(os.path.dirname(__file__))
from utils.data_preprocessing import get_dataset_info, load_dataset, add_performance_label
from models.linear_regression import LinearRegressionModel
from models.naive_bayes import NaiveBayesModel
from models.knn import KNNModel
from models.svm import SVMModel
from models.decision_tree import DecisionTreeModel
from models.ann import ANNModel

app = Flask(__name__)

# Configure CORS for production and development
allowed_origins = os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(',')
CORS(app, origins=[origin.strip() for origin in allowed_origins])

# Configuration
DATA_PATH = os.path.join(os.path.dirname(__file__), 'data')
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models')
DATASET_FILE = 'student-mat.csv'

# Load all models at startup
MODELS = {}

def load_all_models():
    """Load all trained models"""
    global MODELS
    
    try:
        print("Loading models...")
        
        # Linear Regression
        if os.path.exists(os.path.join(MODEL_PATH, 'linear_regression.pkl')):
            lr = LinearRegressionModel()
            lr.load_model(os.path.join(MODEL_PATH, 'linear_regression.pkl'))
            MODELS['linear_regression'] = lr
            print("✓ Linear Regression loaded")
        
        # Naive Bayes
        if os.path.exists(os.path.join(MODEL_PATH, 'naive_bayes.pkl')):
            nb = NaiveBayesModel()
            nb.load_model(os.path.join(MODEL_PATH, 'naive_bayes.pkl'))
            MODELS['naive_bayes'] = nb
            print("✓ Naive Bayes loaded")
        
        # KNN
        if os.path.exists(os.path.join(MODEL_PATH, 'knn.pkl')):
            knn = KNNModel()
            knn.load_model(os.path.join(MODEL_PATH, 'knn.pkl'))
            MODELS['knn'] = knn
            print("✓ KNN loaded")
        
        # SVM
        if os.path.exists(os.path.join(MODEL_PATH, 'svm.pkl')):
            svm = SVMModel()
            svm.load_model(os.path.join(MODEL_PATH, 'svm.pkl'))
            MODELS['svm'] = svm
            print("✓ SVM loaded")
        
        # Decision Tree
        if os.path.exists(os.path.join(MODEL_PATH, 'decision_tree.pkl')):
            dt = DecisionTreeModel()
            dt.load_model(os.path.join(MODEL_PATH, 'decision_tree.pkl'))
            MODELS['decision_tree'] = dt
            print("✓ Decision Tree loaded")
        
        # ANN Regression
        if os.path.exists(os.path.join(MODEL_PATH, 'ann_regression.pkl')):
            ann_reg = ANNModel(task='regression')
            ann_reg.load_model(os.path.join(MODEL_PATH, 'ann_regression.pkl'))
            MODELS['ann_regression'] = ann_reg
            print("✓ ANN Regression loaded")
        
        # ANN Classification
        if os.path.exists(os.path.join(MODEL_PATH, 'ann_classification.pkl')):
            ann_clf = ANNModel(task='classification')
            ann_clf.load_model(os.path.join(MODEL_PATH, 'ann_classification.pkl'))
            MODELS['ann_classification'] = ann_clf
            print("✓ ANN Classification loaded")
        
        print(f"Successfully loaded {len(MODELS)} models")
        
    except Exception as e:
        print(f"Error loading models: {str(e)}")
        import traceback
        traceback.print_exc()

# Load models on startup
load_all_models()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'EduInsight Analytics API is running'
    })

@app.route('/api/dataset', methods=['GET'])
def get_dataset():
    """Get dataset overview"""
    try:
        # Load dataset
        csv_path = os.path.join(DATA_PATH, DATASET_FILE)
        if not os.path.exists(csv_path):
            return jsonify({'error': 'Dataset not found'}), 404
        
        info = get_dataset_info(csv_path)
        
        return jsonify(info)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/dataset/sample', methods=['GET'])
def get_dataset_sample():
    """Get sample data from dataset"""
    try:
        csv_path = os.path.join(DATA_PATH, DATASET_FILE)
        df = load_dataset(csv_path)
        df = add_performance_label(df)
        
        # Get query parameters
        limit = request.args.get('limit', 20, type=int)
        
        return jsonify({
            'total_records': len(df),
            'sample': df.head(limit).to_dict('records')
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/predict/linear-regression', methods=['POST'])
def predict_linear_regression():
    """Linear Regression prediction endpoint"""
    try:
        data = request.json
        
        if 'linear_regression' not in MODELS:
            return jsonify({'error': 'Model not loaded. Please train the models first.'}), 503
        
        model = MODELS['linear_regression']
        
        # Extract features from request
        features = data.get('features', {})
        
        # Make prediction
        result = model.predict_single(features)
        
        # Get coefficients for transparency
        coefficients = model.get_coefficients()
        
        return jsonify({
            'predicted_grade': result,
            'model_info': {
                'intercept': coefficients['intercept'],
                'top_features': dict(list(coefficients['coefficients'].items())[:5])
            },
            'metrics': model.metrics
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/naive-bayes', methods=['POST'])
def predict_naive_bayes():
    """Naive Bayes classification endpoint"""
    try:
        data = request.json
        
        if 'naive_bayes' not in MODELS:
            return jsonify({'error': 'Model not loaded. Please train the models first.'}), 503
        
        model = MODELS['naive_bayes']
        
        # Extract features from request
        features = data.get('features', {})
        
        # Get risk assessment
        result = model.get_risk_assessment(features)
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/knn', methods=['POST'])
def predict_knn():
    """KNN prediction endpoint"""
    try:
        data = request.json
        
        if 'knn' not in MODELS:
            return jsonify({'error': 'Model not loaded. Please train the models first.'}), 503
        
        model = MODELS['knn']
        
        # Extract features from request
        features = data.get('features', {})
        k = data.get('k', 5)
        
        # Find nearest neighbors
        result = model.find_nearest_neighbors(features, k=k)
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/svm', methods=['POST'])
def predict_svm():
    """SVM classification endpoint"""
    try:
        data = request.json
        
        if 'svm' not in MODELS:
            return jsonify({'error': 'Model not loaded. Please train the models first.'}), 503
        
        model = MODELS['svm']
        
        # Extract features from request
        features = data.get('features', {})
        
        # Get classification details
        result = model.get_classification_details(features)
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/decision-tree', methods=['POST'])
def predict_decision_tree():
    """Decision Tree analysis endpoint"""
    try:
        data = request.json
        
        if 'decision_tree' not in MODELS:
            return jsonify({'error': 'Model not loaded. Please train the models first.'}), 503
        
        model = MODELS['decision_tree']
        
        # Extract features from request
        features = data.get('features', {})
        
        # Get decision path
        result = model.get_decision_path(features)
        
        # Get feature importance
        importance = model.get_feature_importance()
        
        return jsonify({
            **result,
            'feature_importance': importance['top_features'][:5]
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/ann', methods=['POST'])
def predict_ann():
    """ANN forecast endpoint"""
    try:
        data = request.json
        
        if 'ann_regression' not in MODELS:
            return jsonify({'error': 'Model not loaded. Please train the models first.'}), 503
        
        model = MODELS['ann_regression']
        
        # Extract features from request
        features = data.get('features', {})
        periods = data.get('periods', 4)
        
        # Get time series forecast
        result = model.get_time_series_forecast(features, periods=periods)
        
        # Get network info
        network_info = model.get_network_info()
        
        return jsonify({
            **result,
            'network_info': {
                'layers': network_info['n_layers'],
                'iterations': network_info['n_iterations']
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/models/info', methods=['GET'])
def get_models_info():
    """Get information about all loaded models"""
    try:
        info = {
            'loaded_models': list(MODELS.keys()),
            'total_models': len(MODELS),
            'models_detail': {}
        }
        
        # Get metrics for each model
        for name, model in MODELS.items():
            if hasattr(model, 'metrics') and model.metrics:
                info['models_detail'][name] = model.metrics
        
        return jsonify(info)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV', 'development') != 'production'
    
    print(f"Starting server on port {port} (debug={debug})")
    app.run(debug=debug, host='0.0.0.0', port=port)
