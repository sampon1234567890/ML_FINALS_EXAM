# EduInsight Analytics - Complete Implementation Guide

## Project Overview

EduInsight Analytics is a full-stack machine learning application that predicts and analyzes student performance using 6 different ML models. The system provides visualizations, predictions, and insights to help identify at-risk students and forecast academic outcomes.

## What Has Been Built

### Frontend (React + Vite + Tailwind CSS)
- ✅ **6 Model Visualization Pages** with interactive charts
  - Linear Regression: Scatter plot with regression line
  - Naive Bayes: Stacked bar chart for risk probabilities
  - KNN: Scatter plot with student clusters
  - SVM: Decision boundary visualization
  - Decision Tree: Flowchart-style tree diagram
  - ANN: Multi-line trend forecast chart

- ✅ **Additional Pages**
  - Home: Landing page with hero image and animations
  - Models: Overview of all 6 ML models
  - About: Project information
  - Company: Team member profiles

### Backend (Flask + scikit-learn)
- ✅ **6 Complete ML Model Implementations**
  - Linear Regression Model (LinearRegressionModel)
  - Naive Bayes Model (NaiveBayesModel)
  - K-Nearest Neighbors Model (KNNModel)
  - Support Vector Machine Model (SVMModel)
  - Decision Tree Model (DecisionTreeModel)
  - Artificial Neural Network Model (ANNModel)

- ✅ **REST API with 11+ Endpoints**
  - Health check
  - Dataset information
  - Dataset sample viewer
  - 6 prediction endpoints
  - Model info endpoint

- ✅ **Data Processing Pipeline**
  - Dataset loading with custom separator
  - Performance label categorization
  - Feature preparation
  - Train/test splitting
  - Label encoding

- ✅ **Model Training Script**
  - Automated training for all 6 models
  - Performance metrics calculation
  - Model persistence (saves to .pkl files)

## How to Run the Complete Application

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Train all models (REQUIRED before first run)
python scripts/train_models.py

# This will output something like:
# Training Linear Regression Model...
# ✓ Linear Regression model saved - R²: 0.85, RMSE: 1.23
# Training Naive Bayes Model...
# ✓ Naive Bayes model saved - Accuracy: 0.78
# ... (continues for all 6 models)

# Start the Flask API server
python app.py

# Server will run at http://localhost:5000
```

### Step 2: Frontend Setup

```bash
# Navigate to project root (open a new terminal)
cd ML_FINALS_EXAM

# Install Node dependencies
npm install

# Start the development server
npm run dev

# Frontend will run at http://localhost:5173
```

### Step 3: Access the Application

Open your browser and navigate to `http://localhost:5173`

## Dataset Information

**File**: `backend/data/student-por.csv`
**Format**: CSV with semicolon (`;`) separator
**Source**: UCI Machine Learning Repository - Student Performance Dataset
**Records**: 649 Portuguese students
**Grading Scale**: 0-20 (Portuguese education system)

### Performance Labels (Custom)

The system adds a custom `performance_label` column:
- **Good**: Final grade (G3) ≥ 15
- **Average**: Final grade (G3) ≥ 10 and < 15
- **At-Risk**: Final grade (G3) < 10

### Features Used (15 total)

1. **age**: Student's age (15-22)
2. **Medu**: Mother's education level (0-4)
3. **Fedu**: Father's education level (0-4)
4. **traveltime**: Home to school travel time (1-4)
5. **studytime**: Weekly study time (1-4)
6. **failures**: Number of past class failures (0-4)
7. **famrel**: Quality of family relationships (1-5)
8. **freetime**: Free time after school (1-5)
9. **goout**: Going out with friends frequency (1-5)
10. **Dalc**: Workday alcohol consumption (1-5)
11. **Walc**: Weekend alcohol consumption (1-5)
12. **health**: Current health status (1-5)
13. **absences**: Number of school absences (0-93)
14. **G1**: First period grade (0-20)
15. **G2**: Second period grade (0-20)

**Target Variable**: **G3** - Final grade (0-20)

## Model Details

### 1. Linear Regression
- **Purpose**: Predict exact final grade (G3)
- **Type**: Regression
- **Output**: Predicted grade value (0-20)
- **Metrics**: R², RMSE, MAE
- **Use Case**: Grade forecasting

### 2. Naive Bayes
- **Purpose**: Risk assessment with probabilities
- **Type**: Classification (Gaussian)
- **Output**: Performance category + probability distribution
- **Metrics**: Accuracy, Classification Report
- **Use Case**: Early warning system

### 3. K-Nearest Neighbors (KNN)
- **Purpose**: Find similar students
- **Type**: Classification
- **K-value**: 5 (configurable)
- **Output**: Predicted category + nearest neighbors list
- **Metrics**: Accuracy
- **Use Case**: Peer comparison

### 4. Support Vector Machine (SVM)
- **Purpose**: Classify into performance categories
- **Type**: Classification (RBF kernel)
- **Output**: Category + recommendations
- **Metrics**: Accuracy, Confusion Matrix
- **Use Case**: Student categorization

### 5. Decision Tree
- **Purpose**: Interpretable rule-based classification
- **Type**: Classification
- **Max Depth**: 5
- **Output**: Category + decision path + feature importance
- **Metrics**: Accuracy, Feature Importance
- **Use Case**: Explain predictions

### 6. Artificial Neural Network (ANN)
- **Purpose**: Performance forecasting over time
- **Type**: Regression + Classification
- **Architecture**: 3 hidden layers (100, 50, 25 neurons)
- **Output**: Time-series forecast with scenarios
- **Metrics**: R², RMSE (regression), Accuracy (classification)
- **Use Case**: Long-term trends

## API Endpoints Reference

### Base URL: `http://localhost:5000/api`

#### GET Endpoints

| Endpoint | Description |
|----------|-------------|
| `/health` | Server health check |
| `/dataset` | Complete dataset statistics |
| `/dataset/sample?limit=20` | Get sample records |
| `/models/info` | Loaded models and metrics |

#### POST Prediction Endpoints

All require JSON body with `features` object:

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

| Endpoint | Model | Response |
|----------|-------|----------|
| `/predict/linear-regression` | Linear Regression | `predicted_grade`, coefficients |
| `/predict/naive-bayes` | Naive Bayes | `risk_level`, probabilities |
| `/predict/knn` | KNN | `nearest_neighbors`, distribution |
| `/predict/svm` | SVM | `category`, recommendations |
| `/predict/decision-tree` | Decision Tree | `decision_path`, feature importance |
| `/predict/ann` | ANN | `timeline`, scenarios |

## Frontend Features

### Interactive Visualizations
- Chart.js integration for all model charts
- Real-time data updates
- Responsive design with Tailwind CSS
- Smooth animations and transitions

### Form Inputs
- Input validation for all numeric fields
- Range restrictions matching dataset
- Clear feedback for invalid inputs

### Navigation
- React Router for seamless page transitions
- Active link highlighting
- Mobile-responsive sidebar

## Project Structure

```
ML_FINALS_EXAM/
├── src/                           # Frontend source
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Models.jsx
│   │   ├── About.jsx
│   │   ├── Company.jsx
│   │   └── Models/
│   │       ├── LinearRegression.jsx
│   │       ├── NaiveBayes.jsx
│   │       ├── KNN.jsx
│   │       ├── SVM.jsx
│   │       ├── DecisionTree.jsx
│   │       └── ANN.jsx
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── app.py                     # Flask server
│   ├── requirements.txt
│   ├── data/
│   │   └── student-por.csv       # Dataset
│   ├── models/
│   │   ├── linear_regression.py
│   │   ├── naive_bayes.py
│   │   ├── knn.py
│   │   ├── svm.py
│   │   ├── decision_tree.py
│   │   ├── ann.py
│   │   └── *.pkl                 # Trained models (after training)
│   ├── utils/
│   │   └── data_preprocessing.py
│   └── scripts/
│       └── train_models.py
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Dependencies

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.14.1",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0"
}
```

### Backend
```
Flask==3.0.0
Flask-CORS==4.0.0
scikit-learn==1.3.2
pandas==2.1.3
numpy==1.26.2
joblib==1.3.2
```

## Testing the System

### 1. Test Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Get dataset info
curl http://localhost:5000/api/dataset

# Test Linear Regression
curl -X POST http://localhost:5000/api/predict/linear-regression \
  -H "Content-Type: application/json" \
  -d '{"features": {"age": 17, "Medu": 4, "Fedu": 4, "studytime": 3, "failures": 0, "absences": 2, "G1": 15, "G2": 16, "traveltime": 1, "famrel": 4, "freetime": 3, "goout": 2, "Dalc": 1, "Walc": 1, "health": 5}}'
```

### 2. Test Frontend

1. Navigate to each model page
2. Fill in the form with valid values
3. Click "Predict" or "Analyze"
4. Verify chart displays correctly
5. Check prediction results

## Common Issues & Solutions

### Backend Not Loading Models

**Problem**: API returns "Model not loaded" error

**Solution**: Run the training script first
```bash
cd backend
python scripts/train_models.py
```

### Frontend Cannot Connect to Backend

**Problem**: CORS errors or connection refused

**Solution**: 
1. Ensure backend is running on port 5000
2. Check Flask-CORS is installed
3. Verify no firewall blocking

### Dataset File Not Found

**Problem**: "Dataset not found" error

**Solution**: Ensure `student-por.csv` is in `backend/data/` directory

### Import Errors

**Problem**: Module import errors in Python

**Solution**: 
```bash
cd backend
pip install -r requirements.txt
```

## Next Steps / Potential Enhancements

1. **Connect Frontend to Backend**
   - Replace mock data with actual API calls
   - Add loading states and error handling

2. **Add Authentication**
   - User login system
   - Save prediction history

3. **Enhanced Visualizations**
   - More chart types
   - Downloadable reports

4. **Model Retraining**
   - Upload new data through UI
   - Automatic retraining

5. **Deployment**
   - Docker containerization
   - Deploy to cloud platform

## Team Members

- **Sebastian Lex Ampon**
- **Kert Cain Abajo**
- **Dan Justine Marion Cole**
- **Jay Dee Magkidong**

## Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- Chart.js
- React Router

### Backend
- Python 3.8+
- Flask
- scikit-learn
- pandas
- numpy
- joblib

## License

Academic Project - 2024

---

**Status**: ✅ Complete Backend Implementation with All 6 ML Models
**Next Task**: Connect Frontend to Backend API Endpoints
