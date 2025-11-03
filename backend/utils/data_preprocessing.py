"""
Data preprocessing utilities for student performance data
"""

import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split


def load_dataset(filepath, sep=';'):
    """Load dataset from CSV file"""
    df = pd.read_csv(filepath, sep=sep)
    return df


def add_performance_label(df):
    """
    Add performance_label column based on G3 (final grade)
    Custom EduInsight categorization:
    - G3 >= 15: Good
    - G3 >= 10: Average
    - G3 < 10: At-Risk
    """
    def categorize_performance(grade):
        if grade >= 15:
            return "Good"
        elif grade >= 10:
            return "Average"
        else:
            return "At-Risk"
    
    df['performance_label'] = df['G3'].apply(categorize_performance)
    return df


def preprocess_data(df, add_label=True):
    """
    Preprocess the dataset
    - Add performance label
    - Handle missing values
    - Encode categorical variables
    - Scale numerical features
    """
    # Make a copy
    df_processed = df.copy()
    
    # Add performance label if requested
    if add_label:
        df_processed = add_performance_label(df_processed)
    
    # Handle missing values
    df_processed.fillna(df_processed.mean(numeric_only=True), inplace=True)
    
    return df_processed


def encode_categorical_features(df):
    """
    Encode categorical variables for ML models
    """
    df_encoded = df.copy()
    
    # Identify categorical columns
    categorical_cols = df_encoded.select_dtypes(include=['object']).columns
    
    # Create label encoders for each categorical column
    encoders = {}
    for col in categorical_cols:
        if col != 'performance_label':  # Don't encode the target label yet
            le = LabelEncoder()
            df_encoded[col] = le.fit_transform(df_encoded[col].astype(str))
            encoders[col] = le
    
    return df_encoded, encoders


def prepare_features(df):
    """
    Prepare features for regression (predicting G3)
    Returns X (features) and y (target G3)
    """
    # Important features for prediction
    feature_cols = ['age', 'Medu', 'Fedu', 'traveltime', 'studytime', 
                    'failures', 'famrel', 'freetime', 'goout', 'Dalc', 'Walc',
                    'health', 'absences', 'G1', 'G2']
    
    # Keep only rows where all features are present
    df_clean = df[feature_cols + ['G3']].dropna()
    
    X = df_clean[feature_cols].values
    y = df_clean['G3'].values
    
    return X, y


def prepare_features_for_models(df):
    """
    Prepare features specifically for model training
    Returns encoded numerical dataframe
    """
    df_prep = df.copy()
    
    # Encode categorical features
    df_encoded, encoders = encode_categorical_features(df_prep)
    
    return df_encoded, encoders


def get_features_and_target(df, target_column='G3'):
    """
    Separate features and target variable
    """
    # Exclude target and performance_label from features
    exclude_cols = [target_column, 'performance_label']
    feature_cols = [col for col in df.columns if col not in exclude_cols]
    
    X = df[feature_cols]
    y = df[target_column]
    
    return X, y


def load_and_preprocess_data(filepath, test_size=0.2, random_state=42):
    """
    Complete pipeline: load, preprocess, and split data
    Returns: X_train, X_test, y_train, y_test, feature_names, label_encoder
    """
    # Load dataset
    df = load_dataset(filepath, sep=';')
    
    # Add performance label
    df = add_performance_label(df)
    
    # Select important features
    feature_cols = ['age', 'Medu', 'Fedu', 'traveltime', 'studytime', 
                    'failures', 'famrel', 'freetime', 'goout', 'Dalc', 'Walc',
                    'health', 'absences', 'G1', 'G2']
    
    # Keep only rows where all features and target are present
    df_clean = df[feature_cols + ['performance_label']].dropna()
    
    # Prepare X and y
    X = df_clean[feature_cols].values
    y = df_clean['performance_label'].values
    
    # Encode labels
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=test_size, random_state=random_state, stratify=y_encoded
    )
    
    return X_train, X_test, y_train, y_test, feature_cols, label_encoder


def get_dataset_info(filepath, sep=';'):
    """
    Get detailed information about the dataset
    """
    df = pd.read_csv(filepath, sep=sep)
    
    # Add performance label
    df = add_performance_label(df)
    
    info = {
        'shape': df.shape,
        'columns': list(df.columns),
        'dtypes': {k: str(v) for k, v in df.dtypes.to_dict().items()},
        'missing_values': df.isnull().sum().to_dict(),
        'statistics': df.describe().to_dict(),
        'sample': df.head(10).to_dict('records'),
        'performance_distribution': df['performance_label'].value_counts().to_dict(),
        'grade_range': {
            'min': float(df['G3'].min()),
            'max': float(df['G3'].max()),
            'mean': float(df['G3'].mean())
        }
    }
    
    return info

