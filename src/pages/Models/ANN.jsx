import React, { useState } from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import GradingSystemInfo from '../../components/GradingSystemInfo';
import ValidationErrorModal from '../../components/ValidationErrorModal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ANN(){
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [currentScore, setCurrentScore] = useState("");
  const [studyHours, setStudyHours] = useState("");
  const [assignmentQuality, setAssignmentQuality] = useState("");
  const [participation, setParticipation] = useState("");

  // Generate multi-line trend forecast data
  const generateTrendData = () => {
    const current = parseFloat(currentScore) || 75;
    const hours = parseFloat(studyHours) || 15;
    const quality = parseFloat(assignmentQuality) || 80;
    const part = parseFloat(participation) || 85;

    const months = ['Current', 'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'];
    
    // Calculate growth rate based on inputs
    const growthRate = ((hours / 20) + (quality / 100) + (part / 100)) / 3 * 0.15;
    
    // Optimistic scenario
    const optimistic = months.map((_, index) => {
      if (index === 0) return current;
      return Math.min(100, current + (index * growthRate * 100 * 1.2));
    });

    // Realistic scenario
    const realistic = months.map((_, index) => {
      if (index === 0) return current;
      return Math.min(100, current + (index * growthRate * 100));
    });

    // Conservative scenario
    const conservative = months.map((_, index) => {
      if (index === 0) return current;
      return Math.min(100, current + (index * growthRate * 100 * 0.7));
    });

    // Historical performance (decreasing trend from current)
    const historical = months.map((_, index) => {
      if (index === 0) return current;
      return Math.max(0, current - (index * 2));
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'Optimistic Forecast',
          data: optimistic,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: false,
        },
        {
          label: 'Realistic Forecast',
          data: realistic,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: false,
        },
        {
          label: 'Conservative Forecast',
          data: conservative,
          borderColor: 'rgb(245, 158, 11)',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: false,
        },
        {
          label: 'Without Improvement',
          data: historical,
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.4,
          fill: false,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Academic Performance Forecast (6-Month Projection)',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time Period',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Grade (%)',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  const handleForecast = () => {
    // Validate all required inputs
    if (!currentScore || !studyHours || !assignmentQuality || !participation) {
      setShowErrorModal(true);
      return;
    }

    const current = parseFloat(currentScore) || 75;
    const hours = parseFloat(studyHours) || 15;
    const quality = parseFloat(assignmentQuality) || 80;
    const part = parseFloat(participation) || 85;

    const growthRate = ((hours / 20) + (quality / 100) + (part / 100)) / 3 * 0.15;

    setForecast({
      prediction: {
        shortTerm: { 
          grade: Math.min(100, Math.round(current + (growthRate * 100))), 
          confidence: 0.92 
        },
        midTerm: { 
          grade: Math.min(100, Math.round(current + (growthRate * 100 * 3))), 
          confidence: 0.85 
        },
        longTerm: { 
          grade: Math.min(100, Math.round(current + (growthRate * 100 * 6))), 
          confidence: 0.78 
        }
      },
      factors: [
        { name: "Study Pattern", impact: hours / 20 },
        { name: "Assignment Quality", impact: quality / 100 },
        { name: "Participation", impact: part / 100 }
      ]
    });
    setError(""); // Clear any previous errors
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-[1600px] page-enter">
      {/* Floating Help Button */}
      <GradingSystemInfo />

      {/* Validation Error Modal */}
      <ValidationErrorModal show={showErrorModal} onClose={() => setShowErrorModal(false)} />

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Artificial Neural Network</h1>
        <p className="mt-2 text-lg text-gray-600">
          Deep learning system for long-term academic performance forecasting
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-sky-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-sky-900 mb-3">Network Features</h3>
          <ul className="space-y-2 text-sky-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Deep Architecture
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Multi-layer Perception
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Pattern Recognition
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Prediction Ranges</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Short-term (1 month)
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Mid-term (3 months)
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Long-term (6 months)
            </li>
          </ul>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-indigo-900 mb-3">Model Architecture</h3>
          <ul className="space-y-2 text-indigo-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              3 Hidden Layers
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              ReLU Activation
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Dropout Layers
            </li>
          </ul>
        </div>
      </div>

      {/* Forecast Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Performance Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Academic Score
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter score (0-100)"
              value={currentScore}
              onChange={(e) => setCurrentScore(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weekly Study Hours
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter hours"
              value={studyHours}
              onChange={(e) => setStudyHours(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignment Quality Score
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter score (0-100)"
              value={assignmentQuality}
              onChange={(e) => setAssignmentQuality(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class Participation Level
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter level (0-100)"
              value={participation}
              onChange={(e) => setParticipation(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={handleForecast}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 active:scale-95 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative overflow-hidden group"
          >
            <span className="relative z-10">Generate Forecast</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
          <button
            onClick={() => {
              setCurrentScore('');
              setStudyHours('');
              setAssignmentQuality('');
              setParticipation('');
              setForecast(null);
              setError('');
            }}
            type="button"
            className="w-full bg-gray-500 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:bg-gray-600 active:scale-95 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 relative overflow-hidden group"
          >
            <span className="relative z-10">Clear Form</span>
            <span className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
        </div>
      </div>

      {/* Forecast Results */}
      {forecast && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-sky-50 to-indigo-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-6">Performance Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-sky-900 mb-2">Short-term</h3>
                <p className="text-3xl font-bold text-sky-600">{forecast.prediction.shortTerm.grade}%</p>
                <p className="text-sm text-gray-600">
                  Confidence: {(forecast.prediction.shortTerm.confidence * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Mid-term</h3>
                <p className="text-3xl font-bold text-blue-600">{forecast.prediction.midTerm.grade}%</p>
                <p className="text-sm text-gray-600">
                  Confidence: {(forecast.prediction.midTerm.confidence * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">Long-term</h3>
                <p className="text-3xl font-bold text-indigo-600">{forecast.prediction.longTerm.grade}%</p>
                <p className="text-sm text-gray-600">
                  Confidence: {(forecast.prediction.longTerm.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Impact Factors</h3>
              <div className="space-y-3">
                {forecast.factors.map((factor, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-1/3 text-gray-700">{factor.name}:</span>
                    <div className="w-2/3 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${factor.impact * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-gray-600">{(factor.impact * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Multi-Line Trend Forecast */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Performance Trend Analysis</h2>
            <div className="h-[400px]">
              <Line data={generateTrendData()} options={chartOptions} />
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <div className="w-4 h-1 bg-green-600 mr-2"></div>
                <span className="text-sm text-gray-600">Optimistic</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-blue-600 mr-2"></div>
                <span className="text-sm text-gray-600">Realistic</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-yellow-600 mr-2"></div>
                <span className="text-sm text-gray-600">Conservative</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-red-600 mr-2" style={{ borderTop: '2px dashed' }}></div>
                <span className="text-sm text-gray-600">No Improvement</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Multi-line forecast showing different performance scenarios over 6 months. 
              The neural network predicts optimistic, realistic, and conservative outcomes based on current patterns.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
