"""
Decision Tree Model for Interpretable Student Classification
Provides rule-based classification with decision paths
"""

import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib


class DecisionTreeModel:
    def __init__(self, max_depth=5, min_samples_split=20):
        self.model = DecisionTreeClassifier(
            max_depth=max_depth,
            min_samples_split=min_samples_split,
            random_state=42
        )
        self.is_trained = False
        self.feature_names = None
        self.classes = None
        self.metrics = None
        
    def train(self, X, y, feature_names=None):
        """Train the Decision Tree model"""
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
        
        return {
            'predicted_class': str(prediction),
            'probabilities': prob_dict,
            'confidence': float(max(probabilities))
        }
    
    def get_decision_path(self, features_dict):
        """
        Get the decision path for a prediction
        Args:
            features_dict: dict with feature names and values
        Returns:
            dict with decision path information
        """
        if not self.is_trained:
            raise Exception("Model not trained yet")
        
        # Convert to array in correct order
        X = np.array([[features_dict.get(name, 0) for name in self.feature_names]])
        
        # Get decision path
        node_indicator = self.model.decision_path(X)
        leaf_id = self.model.apply(X)
        
        # Get prediction
        prediction = self.predict_single(features_dict)
        
        # Extract path
        node_index = node_indicator.indices[node_indicator.indptr[0]:node_indicator.indptr[1]]
        
        path_rules = []
        for node_id in node_index:
            # Check if not a leaf node
            if leaf_id[0] == node_id:
                continue
            
            # Get feature and threshold
            feature_idx = self.model.tree_.feature[node_id]
            threshold = self.model.tree_.threshold[node_id]
            
            if feature_idx != -2:  # -2 indicates leaf node
                feature_name = self.feature_names[feature_idx]
                feature_value = features_dict.get(feature_name, 0)
                
                # Determine direction
                if feature_value <= threshold:
                    direction = '<='
                else:
                    direction = '>'
                
                path_rules.append({
                    'feature': feature_name,
                    'threshold': float(threshold),
                    'value': float(feature_value),
                    'condition': f"{feature_name} {direction} {threshold:.2f}"
                })
        
        return {
            'predicted_class': prediction['predicted_class'],
            'probabilities': prediction['probabilities'],
            'confidence': prediction['confidence'],
            'decision_path': path_rules,
            'path_length': len(path_rules)
        }
    
    def get_feature_importance(self):
        """Get feature importance scores"""
        if not self.is_trained:
            raise Exception("Model not trained yet")
        
        importances = self.model.feature_importances_
        
        feature_importance = {
            name: float(importance)
            for name, importance in zip(self.feature_names, importances)
        }
        
        # Sort by importance
        sorted_features = sorted(
            feature_importance.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        return {
            'feature_importance': dict(sorted_features),
            'top_features': [
                {'feature': name, 'importance': imp}
                for name, imp in sorted_features[:5]
            ]
        }
    
    def get_tree_rules(self):
        """Get tree rules as text"""
        if not self.is_trained:
            raise Exception("Model not trained yet")
        
        tree_rules = export_text(
            self.model,
            feature_names=self.feature_names
        )
        
        return {
            'tree_depth': int(self.model.get_depth()),
            'n_leaves': int(self.model.get_n_leaves()),
            'rules_text': tree_rules
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
