"""
Artificial Neural Network Model for Student Performance Forecasting
Multi-layer perceptron for grade prediction and trend forecasting
"""

import pandas as pd
import numpy as np
from sklearn.neural_network import MLPRegressor, MLPClassifier
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.metrics import accuracy_score, classification_report
import joblib


class ANNModel:
    def __init__(self, task='regression', hidden_layers=(100, 50, 25)):
        """
        Initialize ANN model
        Args:
            task: 'regression' for grade prediction or 'classification' for category prediction
            hidden_layers: tuple defining the number of neurons in each hidden layer
        """
        self.task = task
        
        if task == 'regression':
            self.model = MLPRegressor(
                hidden_layer_sizes=hidden_layers,
                activation='relu',
                solver='adam',
                max_iter=500,
                random_state=42,
                early_stopping=True
            )
        else:  # classification
            self.model = MLPClassifier(
                hidden_layer_sizes=hidden_layers,
                activation='relu',
                solver='adam',
                max_iter=500,
                random_state=42,
                early_stopping=True
            )
        
        self.is_trained = False
        self.feature_names = None
        self.classes = None
        self.metrics = None
        
    def train(self, X, y, feature_names=None):
        """Train the ANN model"""
        self.model.fit(X, y)
        self.is_trained = True
        self.feature_names = feature_names if feature_names else [f'feature_{i}' for i in range(X.shape[1])]
        
        if self.task == 'classification':
            self.classes = self.model.classes_
        
        # Calculate training metrics
        if self.task == 'regression':
            train_predictions = self.model.predict(X)
            self.metrics = {
                'train_mse': mean_squared_error(y, train_predictions),
                'train_r2': r2_score(y, train_predictions),
                'train_mae': mean_absolute_error(y, train_predictions)
            }
        else:
            train_predictions = self.model.predict(X)
            self.metrics = {
                'train_accuracy': accuracy_score(y, train_predictions)
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
            prediction value or dict with class and probabilities
        """
        if not self.is_trained:
            raise Exception("Model not trained yet")
        
        # Convert to array in correct order
        X = np.array([[features_dict.get(name, 0) for name in self.feature_names]])
        
        if self.task == 'regression':
            prediction = self.model.predict(X)[0]
            # Clip prediction to valid grade range (0-20)
            return {
                'predicted_grade': float(np.clip(prediction, 0, 20))
            }
        else:
            prediction = self.model.predict(X)[0]
            probabilities = self.model.predict_proba(X)[0]
            
            prob_dict = {
                str(cls): float(prob) 
                for cls, prob in zip(self.classes, probabilities)
            }
            
            return {
                'predicted_class': str(prediction),
                'probabilities': prob_dict,
                'confidence': float(max(probabilities))
            }
    
    def forecast_trends(self, features_dict, scenarios=None):
        """
        Generate performance forecasts under different scenarios
        Args:
            features_dict: current student features
            scenarios: dict with scenario modifications (optional)
        Returns:
            dict with trend forecasts
        """
        if not self.is_trained or self.task != 'regression':
            raise Exception("Model not trained for regression or task is classification")
        
        # Default scenarios
        if scenarios is None:
            scenarios = {
                'optimistic': {
                    'studytime': 1.2,  # 20% increase
                    'absences': 0.5    # 50% decrease
                },
                'realistic': {
                    'studytime': 1.1,  # 10% increase
                    'absences': 0.8    # 20% decrease
                },
                'conservative': {
                    'studytime': 1.05, # 5% increase
                    'absences': 0.9    # 10% decrease
                },
                'no_change': {
                    'studytime': 1.0,
                    'absences': 1.0
                }
            }
        
        forecasts = {}
        
        for scenario_name, multipliers in scenarios.items():
            # Create modified features
            modified_features = features_dict.copy()
            
            for feature, multiplier in multipliers.items():
                if feature in modified_features:
                    modified_features[feature] *= multiplier
            
            # Get prediction
            result = self.predict_single(modified_features)
            forecasts[scenario_name] = result['predicted_grade']
        
        return {
            'current_prediction': self.predict_single(features_dict)['predicted_grade'],
            'scenarios': forecasts,
            'best_case': max(forecasts.values()),
            'worst_case': min(forecasts.values()),
            'range': max(forecasts.values()) - min(forecasts.values())
        }
    
    def get_time_series_forecast(self, features_dict, periods=4):
        """
        Generate time-series forecast
        Simulates progressive improvement over time
        """
        if not self.is_trained or self.task != 'regression':
            raise Exception("Model not trained for regression")
        
        current_pred = self.predict_single(features_dict)['predicted_grade']
        
        forecasts = [current_pred]
        
        # Simulate improvement scenarios
        improvement_rates = {
            'optimistic': 0.15,   # 15% improvement per period
            'realistic': 0.08,    # 8% improvement per period
            'conservative': 0.03, # 3% improvement per period
            'no_improvement': 0.0
        }
        
        timeline = {}
        
        for scenario, rate in improvement_rates.items():
            scenario_forecast = [current_pred]
            
            for period in range(1, periods + 1):
                # Calculate improvement
                improvement = current_pred * rate * period
                forecast_value = min(current_pred + improvement, 20)  # Cap at max grade
                scenario_forecast.append(forecast_value)
            
            timeline[scenario] = scenario_forecast
        
        return {
            'current_grade': current_pred,
            'periods': periods,
            'timeline': timeline,
            'period_labels': [f'Period {i}' for i in range(periods + 1)]
        }
    
    def evaluate(self, X_test, y_test):
        """Evaluate model performance"""
        predictions = self.predict(X_test)
        
        if self.task == 'regression':
            mse = mean_squared_error(y_test, predictions)
            return {
                'mse': float(mse),
                'rmse': float(np.sqrt(mse)),
                'r2_score': float(r2_score(y_test, predictions)),
                'mae': float(mean_absolute_error(y_test, predictions))
            }
        else:
            accuracy = accuracy_score(y_test, predictions)
            report = classification_report(y_test, predictions, output_dict=True, zero_division=0)
            
            return {
                'accuracy': float(accuracy),
                'classification_report': report
            }
    
    def get_network_info(self):
        """Get information about the neural network architecture"""
        if not self.is_trained:
            raise Exception("Model not trained yet")
        
        info = {
            'task': self.task,
            'n_layers': self.model.n_layers_,
            'n_iterations': int(self.model.n_iter_),
            'loss': float(self.model.loss_),
            'hidden_layer_sizes': self.model.hidden_layer_sizes
        }
        
        if self.task == 'classification':
            info['n_classes'] = len(self.classes)
            info['classes'] = self.classes.tolist()
        
        return info
    
    def save_model(self, filepath):
        """Save trained model"""
        model_data = {
            'model': self.model,
            'task': self.task,
            'feature_names': self.feature_names,
            'classes': self.classes,
            'metrics': self.metrics
        }
        joblib.dump(model_data, filepath)
        
    def load_model(self, filepath):
        """Load trained model"""
        model_data = joblib.load(filepath)
        self.model = model_data['model']
        self.task = model_data.get('task', 'regression')
        self.feature_names = model_data.get('feature_names')
        self.classes = model_data.get('classes')
        self.metrics = model_data.get('metrics')
        self.is_trained = True
