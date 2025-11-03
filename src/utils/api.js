/**
 * API utility for communicating with the EduInsight Analytics backend
 */

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL);

/**
 * Generic API request handler
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}

/**
 * Health check
 */
export async function checkHealth() {
  return apiRequest('/health');
}

/**
 * Get dataset information
 */
export async function getDatasetInfo() {
  return apiRequest('/dataset');
}

/**
 * Get dataset sample
 */
export async function getDatasetSample(limit = 20) {
  return apiRequest(`/dataset/sample?limit=${limit}`);
}

/**
 * Get models information
 */
export async function getModelsInfo() {
  return apiRequest('/models/info');
}

/**
 * Linear Regression - Predict grade
 */
export async function predictLinearRegression(features) {
  return apiRequest('/predict/linear-regression', {
    method: 'POST',
    body: JSON.stringify({ features }),
  });
}

/**
 * Naive Bayes - Risk assessment
 */
export async function predictNaiveBayes(features) {
  return apiRequest('/predict/naive-bayes', {
    method: 'POST',
    body: JSON.stringify({ features }),
  });
}

/**
 * KNN - Find similar students
 */
export async function predictKNN(features, k = 5) {
  return apiRequest('/predict/knn', {
    method: 'POST',
    body: JSON.stringify({ features, k }),
  });
}

/**
 * SVM - Classification
 */
export async function predictSVM(features) {
  return apiRequest('/predict/svm', {
    method: 'POST',
    body: JSON.stringify({ features }),
  });
}

/**
 * Decision Tree - Get decision path
 */
export async function predictDecisionTree(features) {
  return apiRequest('/predict/decision-tree', {
    method: 'POST',
    body: JSON.stringify({ features }),
  });
}

/**
 * ANN - Forecast trends
 */
export async function predictANN(features, periods = 4) {
  return apiRequest('/predict/ann', {
    method: 'POST',
    body: JSON.stringify({ features, periods }),
  });
}

/**
 * Helper: Create features object from form data
 */
export function createFeaturesObject(formData) {
  return {
    age: parseFloat(formData.age) || 17,
    Medu: parseFloat(formData.Medu) || 3,
    Fedu: parseFloat(formData.Fedu) || 3,
    traveltime: parseFloat(formData.traveltime) || 1,
    studytime: parseFloat(formData.studytime) || 2,
    failures: parseFloat(formData.failures) || 0,
    famrel: parseFloat(formData.famrel) || 4,
    freetime: parseFloat(formData.freetime) || 3,
    goout: parseFloat(formData.goout) || 3,
    Dalc: parseFloat(formData.Dalc) || 1,
    Walc: parseFloat(formData.Walc) || 1,
    health: parseFloat(formData.health) || 3,
    absences: parseFloat(formData.absences) || 0,
    G1: parseFloat(formData.G1) || 0,
    G2: parseFloat(formData.G2) || 0,
  };
}

export default {
  checkHealth,
  getDatasetInfo,
  getDatasetSample,
  getModelsInfo,
  predictLinearRegression,
  predictNaiveBayes,
  predictKNN,
  predictSVM,
  predictDecisionTree,
  predictANN,
  createFeaturesObject,
};
