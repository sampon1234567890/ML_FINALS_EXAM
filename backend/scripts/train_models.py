"""
Train all ML models on the student performance dataset
"""

import os
import sys
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from models.linear_regression import LinearRegressionModel
from models.naive_bayes import NaiveBayesModel
from models.knn import KNNModel
from models.svm import SVMModel
from models.decision_tree import DecisionTreeModel
from models.ann import ANNModel
from utils.data_preprocessing import load_and_preprocess_data


def train_all_models(data_path):
    """
    Train all ML models and save them
    """
    print("Loading and preprocessing data...")
    
    # Load and preprocess data
    X_train, X_test, y_train, y_test, feature_names, label_encoder = load_and_preprocess_data(data_path)
    
    print(f"Training data shape: {X_train.shape}")
    print(f"Test data shape: {X_test.shape}")
    print(f"Features: {feature_names}")
    print()
    
    # Create models directory if it doesn't exist
    models_dir = os.path.join(os.path.dirname(__file__), '../models')
    os.makedirs(models_dir, exist_ok=True)
    
    # 1. Train Linear Regression (for grade prediction)
    print("=" * 50)
    print("Training Linear Regression Model...")
    print("=" * 50)
    
    lr_model = LinearRegressionModel()
    
    # For regression, use actual G3 values
    df = pd.read_csv(data_path, sep=';')
    from utils.data_preprocessing import prepare_features
    X_reg, y_reg = prepare_features(df)
    X_train_reg, X_test_reg, y_train_reg, y_test_reg = train_test_split(
        X_reg, y_reg, test_size=0.2, random_state=42
    )
    
    lr_model.train(X_train_reg, y_train_reg, feature_names=feature_names)
    lr_metrics = lr_model.evaluate(X_test_reg, y_test_reg)
    
    print(f"Linear Regression Metrics:")
    print(f"  MSE: {lr_metrics['mse']:.4f}")
    print(f"  RMSE: {lr_metrics['rmse']:.4f}")
    print(f"  R²: {lr_metrics['r2_score']:.4f}")
    print(f"  MAE: {lr_metrics['mae']:.4f}")
    
    lr_model.save_model(os.path.join(models_dir, 'linear_regression.pkl'))
    print("✓ Linear Regression model saved")
    print()
    
    # 2. Train Naive Bayes
    print("=" * 50)
    print("Training Naive Bayes Model...")
    print("=" * 50)
    
    nb_model = NaiveBayesModel()
    nb_model.train(X_train, y_train, feature_names=feature_names)
    nb_metrics = nb_model.evaluate(X_test, y_test)
    
    print(f"Naive Bayes Metrics:")
    print(f"  Accuracy: {nb_metrics['accuracy']:.4f}")
    
    nb_model.save_model(os.path.join(models_dir, 'naive_bayes.pkl'))
    print("✓ Naive Bayes model saved")
    print()
    
    # 3. Train KNN
    print("=" * 50)
    print("Training K-Nearest Neighbors Model...")
    print("=" * 50)
    
    knn_model = KNNModel(n_neighbors=5)
    knn_model.train(X_train, y_train, feature_names=feature_names)
    knn_metrics = knn_model.evaluate(X_test, y_test)
    
    print(f"KNN Metrics:")
    print(f"  Accuracy: {knn_metrics['accuracy']:.4f}")
    
    knn_model.save_model(os.path.join(models_dir, 'knn.pkl'))
    print("✓ KNN model saved")
    print()
    
    # 4. Train SVM
    print("=" * 50)
    print("Training Support Vector Machine Model...")
    print("=" * 50)
    
    svm_model = SVMModel(kernel='rbf', C=1.0)
    svm_model.train(X_train, y_train, feature_names=feature_names)
    svm_metrics = svm_model.evaluate(X_test, y_test)
    
    print(f"SVM Metrics:")
    print(f"  Accuracy: {svm_metrics['accuracy']:.4f}")
    
    svm_model.save_model(os.path.join(models_dir, 'svm.pkl'))
    print("✓ SVM model saved")
    print()
    
    # 5. Train Decision Tree
    print("=" * 50)
    print("Training Decision Tree Model...")
    print("=" * 50)
    
    dt_model = DecisionTreeModel(max_depth=5)
    dt_model.train(X_train, y_train, feature_names=feature_names)
    dt_metrics = dt_model.evaluate(X_test, y_test)
    
    print(f"Decision Tree Metrics:")
    print(f"  Accuracy: {dt_metrics['accuracy']:.4f}")
    
    # Get feature importance
    importance = dt_model.get_feature_importance()
    print(f"  Top 3 Features:")
    for feat in importance['top_features'][:3]:
        print(f"    - {feat['feature']}: {feat['importance']:.4f}")
    
    dt_model.save_model(os.path.join(models_dir, 'decision_tree.pkl'))
    print("✓ Decision Tree model saved")
    print()
    
    # 6. Train ANN (Regression)
    print("=" * 50)
    print("Training Artificial Neural Network Model (Regression)...")
    print("=" * 50)
    
    ann_reg_model = ANNModel(task='regression', hidden_layers=(100, 50, 25))
    ann_reg_model.train(X_train_reg, y_train_reg, feature_names=feature_names)
    ann_reg_metrics = ann_reg_model.evaluate(X_test_reg, y_test_reg)
    
    print(f"ANN (Regression) Metrics:")
    print(f"  MSE: {ann_reg_metrics['mse']:.4f}")
    print(f"  RMSE: {ann_reg_metrics['rmse']:.4f}")
    print(f"  R²: {ann_reg_metrics['r2_score']:.4f}")
    print(f"  MAE: {ann_reg_metrics['mae']:.4f}")
    
    ann_reg_model.save_model(os.path.join(models_dir, 'ann_regression.pkl'))
    print("✓ ANN (Regression) model saved")
    print()
    
    # 7. Train ANN (Classification)
    print("=" * 50)
    print("Training Artificial Neural Network Model (Classification)...")
    print("=" * 50)
    
    ann_clf_model = ANNModel(task='classification', hidden_layers=(100, 50, 25))
    ann_clf_model.train(X_train, y_train, feature_names=feature_names)
    ann_clf_metrics = ann_clf_model.evaluate(X_test, y_test)
    
    print(f"ANN (Classification) Metrics:")
    print(f"  Accuracy: {ann_clf_metrics['accuracy']:.4f}")
    
    ann_clf_model.save_model(os.path.join(models_dir, 'ann_classification.pkl'))
    print("✓ ANN (Classification) model saved")
    print()
    
    # Summary
    print("=" * 50)
    print("TRAINING SUMMARY")
    print("=" * 50)
    print("\nRegression Models (Grade Prediction):")
    print(f"  Linear Regression - R²: {lr_metrics['r2_score']:.4f}, RMSE: {lr_metrics['rmse']:.4f}")
    print(f"  ANN Regression    - R²: {ann_reg_metrics['r2_score']:.4f}, RMSE: {ann_reg_metrics['rmse']:.4f}")
    
    print("\nClassification Models (Performance Category):")
    print(f"  Naive Bayes      - Accuracy: {nb_metrics['accuracy']:.4f}")
    print(f"  KNN              - Accuracy: {knn_metrics['accuracy']:.4f}")
    print(f"  SVM              - Accuracy: {svm_metrics['accuracy']:.4f}")
    print(f"  Decision Tree    - Accuracy: {dt_metrics['accuracy']:.4f}")
    print(f"  ANN Classifier   - Accuracy: {ann_clf_metrics['accuracy']:.4f}")
    
    print("\n✓ All models trained and saved successfully!")
    
    return {
        'linear_regression': lr_metrics,
        'naive_bayes': nb_metrics,
        'knn': knn_metrics,
        'svm': svm_metrics,
        'decision_tree': dt_metrics,
        'ann_regression': ann_reg_metrics,
        'ann_classification': ann_clf_metrics
    }


if __name__ == '__main__':
    # Get data path
    data_dir = os.path.join(os.path.dirname(__file__), '../data')
    data_file = 'student-mat.csv'  # Math dataset
    data_path = os.path.join(data_dir, data_file)
    
    if not os.path.exists(data_path):
        print(f"Error: Dataset not found at {data_path}")
        print("Please ensure the student performance dataset is in the data directory.")
        sys.exit(1)
    
    print("=" * 50)
    print("EduInsight Analytics - Model Training")
    print("=" * 50)
    print(f"Dataset: {data_file}")
    print()
    
    try:
        metrics = train_all_models(data_path)
    except Exception as e:
        print(f"\nError during training: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
