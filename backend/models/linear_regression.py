"""
Linear Regression Model for Grade Prediction
Predicts student final grades based on study hours, attendance, and current scores
"""

import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import joblib
import os


class LinearRegressionModel:
    def __init__(self):
        self.model = LinearRegression()
        self.is_trained = False
        self.feature_names = None
        self.metrics = None
        
    def train(self, X, y, feature_names=None):
        """Train the linear regression model"""
        self.model.fit(X, y)
        self.is_trained = True
        self.feature_names = feature_names if feature_names else [f'feature_{i}' for i in range(X.shape[1])]
        
        # Calculate training metrics
        train_predictions = self.model.predict(X)
        self.metrics = {
            'train_mse': mean_squared_error(y, train_predictions),
            'train_r2': r2_score(y, train_predictions),
            'train_mae': mean_absolute_error(y, train_predictions)
        }
        
    def predict(self, X):
        """Make predictions"""
        if not self.is_trained:
            raise Exception("Model not trained yet")
        return self.model.predict(X)
    
    def predict_single(self, features_dict):
        """
        Make prediction for a single instance
        Args:
            features_dict: dict with feature names and values
        Returns:
            predicted grade (float)
        """
        if not self.is_trained:
            raise Exception("Model not trained yet")
        
        # Convert to array in correct order
        X = np.array([[features_dict.get(name, 0) for name in self.feature_names]])
        prediction = self.model.predict(X)[0]
        
        # Clip prediction to valid grade range (0-20)
        return float(np.clip(prediction, 0, 20))
    
    def evaluate(self, X_test, y_test):
        """Evaluate model performance"""
        predictions = self.predict(X_test)
        mse = mean_squared_error(y_test, predictions)
        rmse = np.sqrt(mse)
        r2 = r2_score(y_test, predictions)
        mae = mean_absolute_error(y_test, predictions)
        
        return {
            'mse': float(mse),
            'rmse': float(rmse),
            'r2_score': float(r2),
            'mae': float(mae)
        }
    
    def get_coefficients(self):
        """Get model coefficients"""
        if not self.is_trained:
            raise Exception("Model not trained yet")
        
        return {
            'intercept': float(self.model.intercept_),
            'coefficients': {
                name: float(coef) 
                for name, coef in zip(self.feature_names, self.model.coef_)
            }
        }
    
    def save_model(self, filepath):
        """Save trained model"""
        model_data = {
            'model': self.model,
            'feature_names': self.feature_names,
            'metrics': self.metrics
        }
        joblib.dump(model_data, filepath)
        
    def load_model(self, filepath):
        """Load trained model"""
        model_data = joblib.load(filepath)
        self.model = model_data['model']
        self.feature_names = model_data.get('feature_names')
        self.metrics = model_data.get('metrics')
        self.is_trained = True
