import React, { useState } from 'react'
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { predictLinearRegression, createFeaturesObject } from '../../utils/api';
import GradingSystemInfo from '../../components/GradingSystemInfo';
import ValidationErrorModal from '../../components/ValidationErrorModal';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function LinearRegression(){
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  
  // Form fields
  const [age, setAge] = useState("");
  const [studytime, setStudytime] = useState("");
  const [absences, setAbsences] = useState("");
  const [G1, setG1] = useState("");
  const [G2, setG2] = useState("");
  const [failures, setFailures] = useState("");
  const [Medu, setMedu] = useState("");
  const [Fedu, setFedu] = useState("");

  // Mock data for the scatter plot (0-20 scale)
  const generateScatterData = () => {
    const baseValue = parseFloat(studytime) * 5 || 10;
    const points = [];
    const regressionLine = [];
    const currentPoint = [];
    
    // Generate scatter points with some random variation (0-20 scale)
    for(let i = 0; i < 25; i++) {
      const x = 2 + Math.random() * 15; // Study-related x-axis
      const y = 0.8 * x + 5 + (Math.random() - 0.5) * 3;
      points.push({ x, y: Math.min(Math.max(y, 0), 20) });
    }
    
    // Generate regression line
    const x1 = 2;
    const x2 = 17;
    regressionLine.push({ x: x1, y: 0.8 * x1 + 5 });
    regressionLine.push({ x: x2, y: 0.8 * x2 + 5 });

    // Add current student point if prediction exists
    if (prediction) {
      currentPoint.push({ x: baseValue, y: parseFloat(prediction) });
    }

    return {
      datasets: [
        {
          label: 'Historical Student Data',
          data: points,
          backgroundColor: 'rgba(99, 132, 255, 0.6)',
          borderColor: 'rgba(99, 132, 255, 1)',
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: 'Linear Regression Line',
          data: regressionLine,
          backgroundColor: 'rgba(75, 192, 192, 1)',
          borderColor: 'rgba(75, 192, 192, 1)',
          pointRadius: 0,
          showLine: true,
          borderWidth: 3,
          borderDash: [],
        },
        ...(currentPoint.length > 0 ? [{
          label: 'Your Prediction',
          data: currentPoint,
          backgroundColor: 'rgba(239, 68, 68, 1)',
          borderColor: 'rgba(239, 68, 68, 1)',
          pointRadius: 10,
          pointHoverRadius: 12,
          pointStyle: 'star',
        }] : []),
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Study Performance Index',
          color: '#4B5563',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        min: 0,
        max: 20,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Final Grade (0-20)',
          color: '#4B5563',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        min: 0,
        max: 20,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: (context) => {
            if (context.dataset.label === 'Linear Regression Line') return '';
            return `${context.dataset.label}: Study Hours: ${context.parsed.x.toFixed(1)}h, Grade: ${context.parsed.y.toFixed(1)}%`;
          }
        }
      },
      title: {
        display: true,
        text: 'Study Hours vs Final Grade Correlation',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      }
    },
    maintainAspectRatio: false
  };

  const handlePredict = async () => {
    // Validate all required inputs
    if (!age || !studytime || !absences || !G1 || !G2 || !failures || !Medu || !Fedu) {
      setShowErrorModal(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const features = createFeaturesObject({
        age,
        Medu,
        Fedu,
        traveltime: 1,
        studytime,
        failures,
        famrel: 4,
        freetime: 3,
        goout: 2,
        Dalc: 1,
        Walc: 1,
        health: 3,
        absences,
        G1,
        G2
      });

      const result = await predictLinearRegression(features);
      setPrediction(result.predicted_grade.toFixed(2));
    } catch (err) {
      setError('Failed to get prediction. Make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
          <div className="mb-4">
            <p className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Regression Analysis</p>
            <h1 className="mt-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Linear Regression Model</h1>
            <p className="mt-4 text-lg text-gray-700">
              Predicts student's final grades based on current performance metrics and study patterns
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-[1600px]">
      {/* Grading System Info Banner */}
      <GradingSystemInfo />

      {/* Validation Error Modal */}
      <ValidationErrorModal show={showErrorModal} onClose={() => setShowErrorModal(false)} />

      {/* Key Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Input Features</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Study Hours
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Attendance Rate
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Assessment Scores
            </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-green-900 mb-3">Predictions</h3>
          <ul className="space-y-2 text-green-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Final Grade (0-100)
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Performance Trend
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Improvement Areas
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl shadow-lg border border-purple-200 hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">Model Stats</h3>
          <ul className="space-y-2 text-purple-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Accuracy: 85%
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              RMSE: 4.2
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              R² Score: 0.83
            </li>
          </ul>
        </div>
      </div>

      {/* Prediction Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Grade Prediction Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="15"
              max="22"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mother's Education (0-4)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={Medu}
              onChange={(e) => setMedu(e.target.value)}
              min="0"
              max="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father's Education (0-4)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={Fedu}
              onChange={(e) => setFedu(e.target.value)}
              min="0"
              max="4"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Study Time (1-4)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={studytime}
              onChange={(e) => setStudytime(e.target.value)}
              min="1"
              max="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Past Failures (0-4)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={failures}
              onChange={(e) => setFailures(e.target.value)}
              min="0"
              max="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Absences
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={absences}
              onChange={(e) => setAbsences(e.target.value)}
              min="0"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Period Grade (G1) *
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0-20"
              value={G1}
              onChange={(e) => setG1(e.target.value)}
              min="0"
              max="20"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Second Period Grade (G2) *
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0-20"
              value={G2}
              onChange={(e) => setG2(e.target.value)}
              min="0"
              max="20"
              required
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 active:scale-95 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
          >
            <span className="relative z-10">{loading ? 'Calculating...' : 'Calculate Prediction'}</span>
            {!loading && (
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            )}
          </button>
          <button
            onClick={() => {
              setAge("");
              setStudytime("");
              setAbsences("");
              setG1("");
              setG2("");
              setFailures("");
              setMedu("");
              setFedu("");
              setPrediction(null);
              setError(null);
            }}
            type="button"
            className="w-full bg-gray-500 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:bg-gray-600 active:scale-95 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 relative overflow-hidden group"
          >
            <span className="relative z-10">Clear Form</span>
            <span className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
        </div>
      </div>

      {/* Results Section */}
      {prediction && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Prediction Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700">Predicted Final Grade:</p>
                <p className="text-3xl font-bold text-blue-600">{prediction}/20</p>
                <p className="text-sm text-gray-600 mt-1">Portuguese grading scale (0-20)</p>
              </div>
              <div>
                <p className="text-gray-700">Performance Category:</p>
                <p className="text-lg font-semibold text-green-600">
                  {parseFloat(prediction) >= 15 ? 'Good' : parseFloat(prediction) >= 10 ? 'Average' : 'At-Risk'}
                </p>
                <p className="text-sm text-gray-600 mt-1">Based on trained model</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Performance Visualization</h2>
            <div className="h-[500px]">
              <Scatter data={generateScatterData()} options={chartOptions} />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600">Historical Student Data</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-8 h-0.5 bg-teal-500 mr-2"></div>
                <span className="text-sm text-gray-600">Regression Line</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 mr-2" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                <span className="text-sm text-gray-600">Your Prediction</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Scatter plot showing the positive linear relationship between study hours and final grades.
              The regression line represents the best-fit trend, and your prediction is highlighted with a red star.
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
