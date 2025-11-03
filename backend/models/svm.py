"""
Support Vector Machine Model for Student Classification
Classifies students into performance categories with decision boundaries
"""

import pandas as pd
import numpy as np
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib


class SVMModel:
    def __init__(self, kernel='rbf', C=1.0, gamma='scale'):
        self.model = SVC(kernel=kernel, C=C, gamma=gamma, probability=True)
        self.is_trained = False
        self.feature_names = None
        self.classes = None
        self.metrics = None
        
    def train(self, X, y, feature_names=None):
        """Train the SVM model"""
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
        Make prediction for a single instance
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
        
        # Get decision function values (distance from decision boundary)
        decision_values = self.model.decision_function(X)[0]
        
        return {
            'predicted_class': str(prediction),
            'probabilities': prob_dict,
            'confidence': float(max(probabilities)),
            'decision_scores': decision_values.tolist() if hasattr(decision_values, 'tolist') else [float(decision_values)]
        }
    
    def get_classification_details(self, features_dict):
        """
        Get detailed classification information
        """
        result = self.predict_single(features_dict)
        
        # Map numeric class labels to performance labels
        label_mapping = {
            '0': 'At-Risk',
            '1': 'Average',
            '2': 'Good'
        }
        
        # Convert predicted class to label
        predicted_label = label_mapping.get(str(result['predicted_class']), str(result['predicted_class']))
        
        # Convert probabilities to labeled
        labeled_probs = {}
        for numeric_label, prob in result['probabilities'].items():
            text_label = label_mapping.get(str(numeric_label), str(numeric_label))
            labeled_probs[text_label] = prob
        
        # Interpret performance level
        interpretations = {
            'Good': {
                'category': 'High Achiever',
                'description': 'Student is performing excellently',
                'recommendation': 'Continue current study habits and consider peer tutoring'
            },
            'Average': {
                'category': 'Moderate Performer',
                'description': 'Student has room for improvement',
                'recommendation': 'Focus on weak areas and increase study time'
            },
            'At-Risk': {
                'category': 'Needs Support',
                'description': 'Student requires immediate intervention',
                'recommendation': 'Seek additional help and consider tutoring programs'
            }
        }
        
        interpretation = interpretations.get(predicted_label, {
            'category': 'Unknown',
            'description': 'Performance level unclear',
            'recommendation': 'Additional assessment needed'
        })
        
        return {
            'predicted_label': predicted_label,
            'probabilities': labeled_probs,
            'confidence': result['confidence'],
            'decision_function': result['decision_scores'],
            'support_vectors_count': int(self.model.n_support_.sum()) if hasattr(self.model, 'n_support_') else 0,
            'category': interpretation['category'],
            'description': interpretation['description'],
            'recommendation': interpretation['recommendation']
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
    
    def get_support_vectors_info(self):
        """Get information about support vectors"""
        if not self.is_trained:
            raise Exception("Model not trained yet")
        
        return {
            'n_support_vectors': self.model.n_support_.tolist(),
            'total_support_vectors': int(np.sum(self.model.n_support_))
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
