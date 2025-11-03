"""
K-Nearest Neighbors Model for Student Similarity Analysis
Finds similar students and predicts performance based on K nearest neighbors
"""

import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib


class KNNModel:
    def __init__(self, n_neighbors=5):
        self.model = KNeighborsClassifier(n_neighbors=n_neighbors)
        self.is_trained = False
        self.feature_names = None
        self.classes = None
        self.metrics = None
        self.X_train = None
        self.y_train = None
        
    def train(self, X, y, feature_names=None):
        """Train the KNN model"""
        self.model.fit(X, y)
        self.is_trained = True
        self.feature_names = feature_names if feature_names else [f'feature_{i}' for i in range(X.shape[1])]
        self.classes = np.unique(y)
        self.X_train = X
        self.y_train = y
        
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
        
        return {
            'predicted_class': str(prediction),
            'probabilities': prob_dict,
            'confidence': float(max(probabilities))
        }
    
    def find_nearest_neighbors(self, features_dict, k=None):
        """
        Find K nearest neighbors for a given student
        Args:
            features_dict: dict with feature names and values
            k: number of neighbors (default: model's n_neighbors)
        Returns:
            dict with neighbor information
        """
        if not self.is_trained:
            raise Exception("Model not trained yet")
        
        k = k or self.model.n_neighbors
        
        # Map numeric class labels to performance labels
        label_mapping = {
            '0': 'At-Risk',
            '1': 'Average',
            '2': 'Good'
        }
        
        # Convert to array in correct order
        X = np.array([[features_dict.get(name, 0) for name in self.feature_names]])
        
        # Find nearest neighbors
        distances, indices = self.model.kneighbors(X, n_neighbors=k)
        
        neighbors = []
        neighbor_labels_text = []
        for i, (dist, idx) in enumerate(zip(distances[0], indices[0])):
            neighbor_features = self.X_train[idx]
            neighbor_label = self.y_train[idx]
            neighbor_label_text = label_mapping.get(str(neighbor_label), str(neighbor_label))
            neighbor_labels_text.append(neighbor_label_text)
            
            neighbors.append({
                'rank': i + 1,
                'distance': float(dist),
                'performance_label': neighbor_label_text,
                'features': {
                    name: float(val) 
                    for name, val in zip(self.feature_names, neighbor_features)
                }
            })
        
        # Count labels in neighbors
        label_counts = {}
        for label in neighbor_labels_text:
            label_counts[label] = label_counts.get(label, 0) + 1
        
        # Get prediction
        prediction = self.predict_single(features_dict)
        predicted_label = label_mapping.get(str(prediction['predicted_class']), str(prediction['predicted_class']))
        
        # Convert probabilities to labeled
        labeled_probs = {}
        for numeric_label, prob in prediction['probabilities'].items():
            text_label = label_mapping.get(str(numeric_label), str(numeric_label))
            labeled_probs[text_label] = prob
        
        return {
            'predicted_label': predicted_label,
            'confidence': prediction['confidence'],
            'probabilities': labeled_probs,
            'neighbors': neighbor_labels_text,
            'distances': distances[0].tolist(),
            'neighbor_details': neighbors,
            'neighbor_distribution': label_counts,
            'k': k
        }
    
    def evaluate(self, X_test, y_test):
        """Evaluate model performance"""
        predictions = self.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)
        
        # Get classification report as dict
        report = classification_report(y_test, predictions, output_dict=True, zero_division=0)
        
        return {
            'accuracy': float(accuracy),
            'classification_report': report
        }
    
    def save_model(self, filepath):
        """Save trained model"""
        model_data = {
            'model': self.model,
            'feature_names': self.feature_names,
            'classes': self.classes,
            'metrics': self.metrics,
            'X_train': self.X_train,
            'y_train': self.y_train
        }
        joblib.dump(model_data, filepath)
        
    def load_model(self, filepath):
        """Load trained model"""
        model_data = joblib.load(filepath)
        self.model = model_data['model']
        self.feature_names = model_data.get('feature_names')
        self.classes = model_data.get('classes')
        self.metrics = model_data.get('metrics')
        self.X_train = model_data.get('X_train')
        self.y_train = model_data.get('y_train')
        self.is_trained = True
