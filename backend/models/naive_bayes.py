"""
Naive Bayes Model for Student Risk Assessment
Classifies students into performance categories and provides probability distributions
"""

import pandas as pd
import numpy as np
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib


class NaiveBayesModel:
    def __init__(self):
        self.model = GaussianNB()
        self.is_trained = False
        self.feature_names = None
        self.classes = None
        self.metrics = None
        
    def train(self, X, y, feature_names=None):
        """Train the Naive Bayes model"""
        self.model.fit(X, y)
        self.is_trained = True
        self.feature_names = feature_names if feature_names else [f'feature_{i}' for i in range(X.shape[1])]
        self.classes = self.model.classes_
        
        # Calculate training metrics
        train_predictions = self.model.predict(X)
        self.metrics = {
            'train_accuracy': accuracy_score(y, train_predictions)
        }
        
    def predict(self, X):
        """Make predictions"""
        if not self.is_trained:
            raise Exception("Model not trained yet")
        return self.model.predict(X)
    
    def predict_proba(self, X):
        """Get probability distributions"""
        if not self.is_trained:
            raise Exception("Model not trained yet")
        return self.model.predict_proba(X)
    
    def predict_single(self, features_dict):
        """
        Make prediction for a single instance with probabilities
        Args:
            features_dict: dict with feature names and values
        Returns:
            dict with predicted class and probabilities
        """
        if not self.is_trained:
            raise Exception("Model not trained yet")
        
        # Convert to array in correct order
        X = np.array([[features_dict.get(name, 0) for name in self.feature_names]])
        
        # Get prediction and probabilities
        prediction = self.model.predict(X)[0]
        probabilities = self.model.predict_proba(X)[0]
        
        # Create probability dict
        prob_dict = {
            str(cls): float(prob) 
            for cls, prob in zip(self.classes, probabilities)
        }
        
        return {
            'predicted_class': str(prediction),
            'probabilities': prob_dict,
            'confidence': float(max(probabilities))
        }
    
    def evaluate(self, X_test, y_test):
        """Evaluate model performance"""
        predictions = self.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)
        
        # Get classification report as dict
        report = classification_report(y_test, predictions, output_dict=True, zero_division=0)
        
        return {
            'accuracy': float(accuracy),
            'classification_report': report,
            'confusion_matrix': confusion_matrix(y_test, predictions).tolist()
        }
    
    def get_risk_assessment(self, features_dict):
        """
        Get risk assessment with detailed probabilities
        Maps performance labels to risk levels
        """
        result = self.predict_single(features_dict)
        
        # Map numeric class labels to performance labels
        # LabelEncoder encodes alphabetically: At-Risk=0, Average=1, Good=2
        label_mapping = {
            '0': 'At-Risk',
            '1': 'Average',
            '2': 'Good'
        }
        
        # Map performance labels to risk levels
        risk_mapping = {
            'At-Risk': 'High',
            'Average': 'Medium',
            'Good': 'Low'
        }
        
        # Convert numeric probabilities to labeled probabilities
        labeled_probs = {}
        risk_probs = {}
        
        for numeric_label, prob in result['probabilities'].items():
            perf_label = label_mapping.get(str(numeric_label), 'Unknown')
            labeled_probs[perf_label] = prob
            
            risk_level = risk_mapping.get(perf_label, 'Unknown')
            risk_probs[risk_level] = risk_probs.get(risk_level, 0) + prob
        
        # Determine primary risk level
        primary_risk = max(risk_probs.items(), key=lambda x: x[1])[0]
        
        # Convert predicted class to label
        predicted_label = label_mapping.get(str(result['predicted_class']), 'Unknown')
        
        return {
            'predicted_performance': predicted_label,
            'risk_level': primary_risk,
            'risk_probabilities': risk_probs,
            'performance_probabilities': labeled_probs,
            'confidence': result['confidence']
        }
    
    def save_model(self, filepath):
        """Save trained model"""
        model_data = {
            'model': self.model,
            'feature_names': self.feature_names,
            'classes': self.classes,
            'metrics': self.metrics
        }
        joblib.dump(model_data, filepath)
        
    def load_model(self, filepath):
        """Load trained model"""
        model_data = joblib.load(filepath)
        self.model = model_data['model']
        self.feature_names = model_data.get('feature_names')
        self.classes = model_data.get('classes')
        self.metrics = model_data.get('metrics')
        self.is_trained = True
