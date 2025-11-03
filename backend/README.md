# EduInsight Analytics - Backend

Machine Learning backend API for student performance prediction and analysis.

## Features

- **6 Machine Learning Models:**
  - Linear Regression: Grade prediction
  - Naive Bayes: Risk assessment with probabilities
  - K-Nearest Neighbors: Similar student analysis
  - Support Vector Machine: Performance classification
  - Decision Tree: Rule-based classification with decision paths
  - Artificial Neural Network: Time-series performance forecasting

- **REST API Endpoints:**
  - Health check and dataset information
  - Individual prediction endpoints for each model
  - Model information and metrics

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Train Models

```bash
python scripts/train_models.py
```

### 3. Run API Server

```bash
python app.py
```

The API will be available at: `http://localhost:5000`

## Dataset

The dataset (`student-por.csv`) contains Portuguese student performance data with:
- Demographics: age, sex, address
- Family: Medu, Fedu, Pjob, Mjob, famrel
- Academic: studytime, failures, absences, G1, G2, G3
- Lifestyle: freetime, goout, Dalc, Walc, health

## Performance Labels

Custom 3-tier categorization based on final grade (G3):
- **Good**: G3 ≥ 15
- **Average**: G3 ≥ 10 and < 15
- **At-Risk**: G3 < 10

## API Endpoints

### Health & Info
- `GET /api/health` - Health check
- `GET /api/dataset` - Dataset information
- `GET /api/dataset/sample?limit=20` - Sample data
- `GET /api/models/info` - Model information

### Predictions

All prediction endpoints accept POST with JSON body:
```json
{
  "features": {
    "age": 17,
    "Medu": 4,
    "Fedu": 4,
    "traveltime": 1,
    "studytime": 3,
    "failures": 0,
    "famrel": 4,
    "freetime": 3,
    "goout": 2,
    "Dalc": 1,
    "Walc": 1,
    "health": 5,
    "absences": 2,
    "G1": 15,
    "G2": 16
  }
}
```

#### Linear Regression
```
POST /api/predict/linear-regression
Response: { "predicted_grade": 14.5, "model_info": {...} }
```

#### Naive Bayes
```
POST /api/predict/naive-bayes
Response: { "predicted_performance": "Good", "risk_level": "Low", "confidence": 0.85 }
```

#### K-Nearest Neighbors
```
POST /api/predict/knn
Body: { "features": {...}, "k": 5 }
Response: { "predicted_performance": "Good", "nearest_neighbors": [...] }
```

#### Support Vector Machine
```
POST /api/predict/svm
Response: { "predicted_performance": "Good", "category": "High Achiever" }
```

#### Decision Tree
```
POST /api/predict/decision-tree
Response: { "predicted_class": "Good", "decision_path": [...] }
```

#### Artificial Neural Network
```
POST /api/predict/ann
Body: { "features": {...}, "periods": 4 }
Response: { "current_grade": 14.5, "timeline": {...} }
```

## Features Used

- `age`: Student's age (15-22)
- `Medu`: Mother's education (0-4)
- `Fedu`: Father's education (0-4)
- `traveltime`: Home to school travel time (1-4)
- `studytime`: Weekly study time (1-4)
- `failures`: Number of past failures (0-4)
- `famrel`: Family relationship quality (1-5)
- `freetime`: Free time after school (1-5)
- `goout`: Going out with friends (1-5)
- `Dalc`: Workday alcohol consumption (1-5)
- `Walc`: Weekend alcohol consumption (1-5)
- `health`: Current health status (1-5)
- `absences`: Number of absences (0-93)
- `G1`: First period grade (0-20)
- `G2`: Second period grade (0-20)

## Project Structure

```
backend/
├── app.py                      # Flask API server
├── requirements.txt            # Dependencies
├── README.md                   # This file
├── data/
│   └── student-por.csv        # Dataset
├── models/
│   ├── *.py                   # Model implementations
│   └── *.pkl                  # Trained models (after training)
├── utils/
│   └── data_preprocessing.py  # Data utilities
└── scripts/
    └── train_models.py        # Training script
```

## Testing

Test the API with curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Get dataset info
curl http://localhost:5000/api/dataset

# Make a prediction
curl -X POST http://localhost:5000/api/predict/linear-regression \
  -H "Content-Type: application/json" \
  -d '{"features": {"age": 17, "Medu": 4, "Fedu": 4, "studytime": 3, "failures": 0, "absences": 2, "G1": 15, "G2": 16, "traveltime": 1, "famrel": 4, "freetime": 3, "goout": 2, "Dalc": 1, "Walc": 1, "health": 5}}'
```

## Technologies

- Flask & Flask-CORS
- scikit-learn
- pandas & numpy
- joblib

## Authors

- Sebastian Lex Ampon
- Kert Cain Abajo
- Dan Justine Marion Cole
- Jay Dee Magkidong
