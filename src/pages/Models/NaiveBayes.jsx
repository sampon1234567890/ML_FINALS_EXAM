import React, { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { predictNaiveBayes, createFeaturesObject } from '../../utils/api';
import GradingSystemInfo from '../../components/GradingSystemInfo';
import ValidationErrorModal from '../../components/ValidationErrorModal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function NaiveBayes(){
  const [riskAssessment, setRiskAssessment] = useState(null);
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

  // Generate probability chart data
  const generateProbabilityData = () => {
    if (!riskAssessment || !riskAssessment.probabilities) {
      // Default empty data
      return {
        labels: ['Risk Probability Distribution'],
        datasets: [
          { label: 'High Risk', data: [0], backgroundColor: 'rgba(239, 68, 68, 0.8)' },
          { label: 'Medium Risk', data: [0], backgroundColor: 'rgba(251, 191, 36, 0.8)' },
          { label: 'Low Risk', data: [0], backgroundColor: 'rgba(34, 197, 94, 0.8)' },
        ]
      };
    }

    const probs = riskAssessment.probabilities;
    const highRisk = (probs.High || probs['At-Risk'] || 0) * 100;
    const mediumRisk = (probs.Medium || probs.Average || 0) * 100;
    const lowRisk = (probs.Low || probs.Good || 0) * 100;

    return {
      labels: ['Risk Probability Distribution'],
      datasets: [
        {
          label: 'High Risk',
          data: [highRisk],
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 2,
        },
        {
          label: 'Medium Risk',
          data: [mediumRisk],
          backgroundColor: 'rgba(245, 158, 11, 0.8)',
          borderColor: 'rgb(245, 158, 11)',
          borderWidth: 2,
        },
        {
          label: 'Low Risk',
          data: [lowRisk],
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 2,
        },
      ],
    };
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Probability Distribution of Academic Risk Levels',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
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
          label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`
        }
      },
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12
          }
        }
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Probability (%)',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          stepSize: 10
        }
      }
    },
    maintainAspectRatio: false
  };

  const handleAssess = async () => {
    // Validate all required inputs
    if (!age || !studytime || !absences || !G1 || !G2) {
      setShowErrorModal(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const features = createFeaturesObject({
        age,
        Medu: Medu || 2,
        Fedu: Fedu || 2,
        traveltime: 1,
        studytime,
        failures: failures || 0,
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

      const result = await predictNaiveBayes(features);
      
      // Map numeric labels back to text
      const labelMap = { '0': 'At-Risk', '1': 'Average', '2': 'Good' };
      const performanceLabel = labelMap[result.predicted_performance] || result.predicted_performance;
      
      setRiskAssessment({
        performance: performanceLabel,
        risk: result.risk_level,
        probabilities: result.risk_probabilities || result.performance_probabilities,
        confidence: result.confidence
      });
    } catch (err) {
      setError('Failed to get risk assessment. Make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-[1600px] page-enter">
      {/* Grading System Info Banner */}
      <GradingSystemInfo />

      {/* Validation Error Modal */}
      <ValidationErrorModal show={showErrorModal} onClose={() => setShowErrorModal(false)} />

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Naive Bayes Classifier</h1>
        <p className="mt-2 text-lg text-gray-600">
          Probabilistic assessment of student academic risk levels based on behavioral and performance patterns
        </p>
      </div>

      {/* Model Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-yellow-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">Risk Factors</h3>
          <ul className="space-y-2 text-yellow-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Attendance Patterns
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Assignment Completion
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Test Performance
            </li>
          </ul>
        </div>
        
        <div className="bg-indigo-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-indigo-900 mb-3">Probability Output</h3>
          <ul className="space-y-2 text-indigo-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Risk Level Probability
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Success Likelihood
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Confidence Score
            </li>
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-red-900 mb-3">Alert Levels</h3>
          <ul className="space-y-2 text-red-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              High Risk (&gt;70%)
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Medium Risk (30-70%)
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Low Risk (&lt;30%)
            </li>
          </ul>
        </div>
      </div>

      {/* Assessment Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Risk Assessment Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="15"
              max="22"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Study Time (1-4)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              value={studytime}
              onChange={(e) => setStudytime(e.target.value)}
              min="1"
              max="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Absences
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
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
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
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
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
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
            onClick={handleAssess}
            disabled={loading}
            className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:bg-yellow-700 active:scale-95 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
          >
            <span className="relative z-10">{loading ? 'Analyzing...' : 'Calculate Risk Level'}</span>
            {!loading && (
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-700 to-yellow-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            )}
          </button>
          <button
            onClick={() => {
              setAge('');
              setStudytime('');
              setAbsences('');
              setG1('');
              setG2('');
              setFailures('');
              setMedu('');
              setFedu('');
              setRiskAssessment(null);
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
      {riskAssessment && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-yellow-50 to-red-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Risk Assessment Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-700">Performance Category:</p>
                <p className="text-3xl font-bold text-blue-600">{riskAssessment.performance}</p>
              </div>
              <div>
                <p className="text-gray-700">Risk Level:</p>
                <p className="text-3xl font-bold text-yellow-600">{riskAssessment.risk}</p>
              </div>
              <div>
                <p className="text-gray-700">Model Confidence:</p>
                <p className="text-3xl font-bold text-green-600">{(riskAssessment.confidence * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Risk Probability Visualization</h2>
            <div className="h-[450px]">
              <Bar data={generateProbabilityData()} options={chartOptions} />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center p-3 bg-red-50 rounded-lg">
                <div className="w-4 h-4 rounded bg-red-500 mr-2"></div>
                <span className="text-sm font-medium text-red-700">High Risk - Needs Intervention</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-yellow-50 rounded-lg">
                <div className="w-4 h-4 rounded bg-yellow-500 mr-2"></div>
                <span className="text-sm font-medium text-yellow-700">Medium Risk - Monitor Closely</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                <div className="w-4 h-4 rounded bg-green-500 mr-2"></div>
                <span className="text-sm font-medium text-green-700">Low Risk - On Track</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Stacked bar chart showing the probability distribution across different risk levels using Bayesian classification.
              The model calculates conditional probabilities based on attendance, assignment completion, and test performance.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
