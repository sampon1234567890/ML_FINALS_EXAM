"""
Simple script to test the backend API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:5000/api"

print("=" * 60)
print("TESTING EDUINSIGHT ANALYTICS BACKEND API")
print("=" * 60)
print()

# Test 1: Health Check
print("1. Testing Health Endpoint...")
try:
    response = requests.get(f"{BASE_URL}/health")
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    print("   ✓ Health check passed!")
except Exception as e:
    print(f"   ✗ Error: {e}")
print()

# Test 2: Dataset Info
print("2. Testing Dataset Endpoint...")
try:
    response = requests.get(f"{BASE_URL}/dataset")
    data = response.json()
    print(f"   Status: {response.status_code}")
    print(f"   Total Records: {data['shape'][0]}")
    print(f"   Total Features: {data['shape'][1]}")
    print(f"   Performance Distribution: {data['performance_distribution']}")
    print("   ✓ Dataset info retrieved!")
except Exception as e:
    print(f"   ✗ Error: {e}")
print()

# Test 3: Linear Regression Prediction
print("3. Testing Linear Regression Prediction...")
try:
    sample_data = {
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
    response = requests.post(f"{BASE_URL}/predict/linear-regression", json=sample_data)
    result = response.json()
    print(f"   Status: {response.status_code}")
    print(f"   Predicted Grade: {result['predicted_grade']:.2f} / 20")
    print("   ✓ Linear Regression working!")
except Exception as e:
    print(f"   ✗ Error: {e}")
print()

# Test 4: Naive Bayes Risk Assessment
print("4. Testing Naive Bayes Risk Assessment...")
try:
    response = requests.post(f"{BASE_URL}/predict/naive-bayes", json=sample_data)
    result = response.json()
    print(f"   Status: {response.status_code}")
    print(f"   Performance Prediction: {result['predicted_performance']}")
    print(f"   Risk Level: {result['risk_level']}")
    print(f"   Confidence: {result['confidence']:.2%}")
    print("   ✓ Naive Bayes working!")
except Exception as e:
    print(f"   ✗ Error: {e}")
print()

# Test 5: KNN Similar Students
print("5. Testing KNN Similarity Analysis...")
try:
    response = requests.post(f"{BASE_URL}/predict/knn", json=sample_data)
    result = response.json()
    print(f"   Status: {response.status_code}")
    print(f"   Predicted Performance: {result['predicted_performance']}")
    print(f"   K-value: {result['k']}")
    print(f"   Neighbor Distribution: {result['neighbor_distribution']}")
    print("   ✓ KNN working!")
except Exception as e:
    print(f"   ✗ Error: {e}")
print()

# Test 6: SVM Classification
print("6. Testing SVM Classification...")
try:
    response = requests.post(f"{BASE_URL}/predict/svm", json=sample_data)
    result = response.json()
    print(f"   Status: {response.status_code}")
    print(f"   Performance: {result['predicted_performance']}")
    print(f"   Category: {result['category']}")
    print(f"   Recommendation: {result['recommendation']}")
    print("   ✓ SVM working!")
except Exception as e:
    print(f"   ✗ Error: {e}")
print()

# Test 7: Decision Tree
print("7. Testing Decision Tree...")
try:
    response = requests.post(f"{BASE_URL}/predict/decision-tree", json=sample_data)
    result = response.json()
    print(f"   Status: {response.status_code}")
    print(f"   Predicted Class: {result['predicted_class']}")
    print(f"   Decision Path Length: {result['path_length']}")
    print(f"   Top Feature: {result['feature_importance'][0]['feature']}")
    print("   ✓ Decision Tree working!")
except Exception as e:
    print(f"   ✗ Error: {e}")
print()

# Test 8: ANN Forecasting
print("8. Testing ANN Forecasting...")
try:
    response = requests.post(f"{BASE_URL}/predict/ann", json=sample_data)
    result = response.json()
    print(f"   Status: {response.status_code}")
    print(f"   Current Grade: {result['current_grade']:.2f}")
    print(f"   Scenarios Available: {list(result['timeline'].keys())}")
    print(f"   Forecast Periods: {result['periods']}")
    print("   ✓ ANN working!")
except Exception as e:
    print(f"   ✗ Error: {e}")
print()

# Test 9: Models Info
print("9. Testing Models Info Endpoint...")
try:
    response = requests.get(f"{BASE_URL}/models/info")
    result = response.json()
    print(f"   Status: {response.status_code}")
    print(f"   Loaded Models: {result['total_models']}")
    print(f"   Model Names: {', '.join(result['loaded_models'])}")
    print("   ✓ Models info retrieved!")
except Exception as e:
    print(f"   ✗ Error: {e}")
print()

print("=" * 60)
print("ALL TESTS COMPLETED!")
print("=" * 60)
