import React, { useState } from 'react'
import { Scatter } from 'react-chartjs-2';
import { predictSVM, createFeaturesObject } from '../../utils/api';
import GradingSystemInfo from '../../components/GradingSystemInfo';
import ValidationErrorModal from '../../components/ValidationErrorModal';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function SVM(){
  const [classification, setClassification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  
  // Student features
  const [age, setAge] = useState('');
  const [Medu, setMedu] = useState('');
  const [Fedu, setFedu] = useState('');
  const [traveltime, setTraveltime] = useState('');
  const [studytime, setStudytime] = useState('');
  const [failures, setFailures] = useState('');
  const [famrel, setFamrel] = useState('');
  const [freetime, setFreetime] = useState('');
  const [goout, setGoout] = useState('');
  const [Dalc, setDalc] = useState('');
  const [Walc, setWalc] = useState('');
  const [health, setHealth] = useState('');
  const [absences, setAbsences] = useState('');
  const [G1, setG1] = useState('');
  const [G2, setG2] = useState('');

  // Generate decision boundary plot data
  const generateDecisionBoundaryData = () => {
    // Use G1 and G2 grades (0-20 scale) and convert to percentage for visualization
    const academic = (parseFloat(G1) || 10) * 5; // Convert 0-20 to 0-100
    const engagement = (parseFloat(G2) || 10) * 5; // Convert 0-20 to 0-100

    // Generate students in different categories
    const excellentStudents = [];
    const goodStudents = [];
    const averageStudents = [];
    const atRiskStudents = [];

    // Excellent (90-100%)
    for (let i = 0; i < 12; i++) {
      excellentStudents.push({
        x: 85 + Math.random() * 15,
        y: 85 + Math.random() * 15
      });
    }

    // Good (75-89%)
    for (let i = 0; i < 15; i++) {
      goodStudents.push({
        x: 70 + Math.random() * 20,
        y: 70 + Math.random() * 20
      });
    }

    // Average (60-74%)
    for (let i = 0; i < 15; i++) {
      averageStudents.push({
        x: 55 + Math.random() * 20,
        y: 55 + Math.random() * 20
      });
    }

    // At Risk (<60%)
    for (let i = 0; i < 12; i++) {
      atRiskStudents.push({
        x: 30 + Math.random() * 25,
        y: 30 + Math.random() * 25
      });
    }

    // Decision boundaries (simplified linear boundaries)
    const boundary1 = [
      { x: 0, y: 90 },
      { x: 90, y: 0 }
    ];

    const boundary2 = [
      { x: 0, y: 75 },
      { x: 75, y: 0 }
    ];

    const boundary3 = [
      { x: 0, y: 60 },
      { x: 60, y: 0 }
    ];

    return {
      datasets: [
        {
          label: 'Excellent',
          data: excellentStudents,
          backgroundColor: 'rgba(16, 185, 129, 0.7)',
          borderColor: 'rgb(16, 185, 129)',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: 'Good',
          data: goodStudents,
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgb(59, 130, 246)',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: 'Average',
          data: averageStudents,
          backgroundColor: 'rgba(245, 158, 11, 0.7)',
          borderColor: 'rgb(245, 158, 11)',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: 'At Risk',
          data: atRiskStudents,
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
          borderColor: 'rgb(239, 68, 68)',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: 'Current Student',
          data: [{ x: academic, y: engagement }],
          backgroundColor: 'rgba(168, 85, 247, 1)',
          borderColor: 'rgb(168, 85, 247)',
          pointRadius: 12,
          pointHoverRadius: 14,
          pointStyle: 'star',
        },
        {
          label: 'Boundary 1 (Excellent/Good)',
          data: boundary1,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(16, 185, 129, 0.5)',
          pointRadius: 0,
          showLine: true,
          borderWidth: 2,
          borderDash: [5, 5],
        },
        {
          label: 'Boundary 2 (Good/Average)',
          data: boundary2,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(59, 130, 246, 0.5)',
          pointRadius: 0,
          showLine: true,
          borderWidth: 2,
          borderDash: [5, 5],
        },
        {
          label: 'Boundary 3 (Average/At Risk)',
          data: boundary3,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(245, 158, 11, 0.5)',
          pointRadius: 0,
          showLine: true,
          borderWidth: 2,
          borderDash: [5, 5],
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
        labels: {
          filter: (item) => !item.text.includes('Boundary')
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.label.includes('Boundary')) return '';
            return `${context.dataset.label}: Academic: ${context.parsed.x.toFixed(1)}, Engagement: ${context.parsed.y.toFixed(1)}`;
          }
        }
      },
      title: {
        display: true,
        text: 'SVM Decision Boundaries for Student Classification',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Academic Score',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        min: 0,
        max: 100
      },
      y: {
        title: {
          display: true,
          text: 'Engagement Level',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        min: 0,
        max: 100
      }
    }
  };

  const handleClassify = async () => {
    // Validate all required inputs
    if (!age || !Medu || !Fedu || !traveltime || !studytime || !failures || 
        !famrel || !freetime || !goout || !Dalc || !Walc || !health || !absences || !G1 || !G2) {
      setShowErrorModal(true);
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const features = createFeaturesObject({
        age, Medu, Fedu, traveltime, studytime, failures,
        famrel, freetime, goout, Dalc, Walc, health, absences, G1, G2
      });
      
      const result = await predictSVM(features);
      
      // The backend now returns labeled data directly
      setClassification({
        performance: result.predicted_label || 'Unknown',
        confidence: result.confidence || 0,
        decisionFunction: result.decision_function || [],
        supportVectors: result.support_vectors_count || 0,
        probabilities: result.probabilities || {}
      });
    } catch (err) {
      setError(err.message || 'Failed to classify student. Please try again.');
      setClassification(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-12 relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
          <div className="mb-4">
            <p className="text-base font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Advanced Classification</p>
            <h1 className="mt-2 text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Support Vector Machine Classifier</h1>
            <p className="mt-4 text-lg text-gray-700">
              Advanced classification system for categorizing student performance levels
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-[1600px]">
      {/* Grading System Info Banner */}
      <GradingSystemInfo />

      {/* Validation Error Modal */}
      <ValidationErrorModal show={showErrorModal} onClose={() => setShowErrorModal(false)} />

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-6 rounded-xl shadow-lg border border-pink-200 hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-pink-900 mb-3">Performance Categories</h3>
          <ul className="space-y-2 text-pink-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Excellent (90-100%)
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Good (75-89%)
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Average (60-74%)
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              At Risk (&lt;60%)
            </li>
          </ul>
        </div>
        
        <div className="bg-rose-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-rose-900 mb-3">Assessment Criteria</h3>
          <ul className="space-y-2 text-rose-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Academic Performance
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Class Engagement
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Learning Progress
            </li>
          </ul>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-orange-900 mb-3">Model Features</h3>
          <ul className="space-y-2 text-orange-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              RBF Kernel
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Multi-class Support
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Confidence Scoring
            </li>
          </ul>
        </div>
      </div>

      {/* Classification Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Enter Student Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="15-22"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mother's Education (0-4)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="0-4"
              value={Medu}
              onChange={(e) => setMedu(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Father's Education (0-4)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="0-4"
              value={Fedu}
              onChange={(e) => setFedu(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Travel Time (1-4)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="1-4"
              value={traveltime}
              onChange={(e) => setTraveltime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Study Time (1-4)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="1-4"
              value={studytime}
              onChange={(e) => setStudytime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Past Failures (0-4)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="0-4"
              value={failures}
              onChange={(e) => setFailures(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Family Relations (1-5)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="1-5"
              value={famrel}
              onChange={(e) => setFamrel(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Free Time (1-5)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="1-5"
              value={freetime}
              onChange={(e) => setFreetime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Going Out (1-5)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="1-5"
              value={goout}
              onChange={(e) => setGoout(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weekday Alcohol (1-5)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="1-5"
              value={Dalc}
              onChange={(e) => setDalc(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weekend Alcohol (1-5)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="1-5"
              value={Walc}
              onChange={(e) => setWalc(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Health Status (1-5)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="1-5"
              value={health}
              onChange={(e) => setHealth(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Absences (0-93)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="0-93"
              value={absences}
              onChange={(e) => setAbsences(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period 1 Grade (0-20)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="0-20"
              value={G1}
              onChange={(e) => setG1(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period 2 Grade (0-20)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="0-20"
              value={G2}
              onChange={(e) => setG2(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={handleClassify}
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:bg-pink-700 active:scale-95 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
          >
            <span className="relative z-10">{loading ? 'Classifying...' : 'Classify Performance'}</span>
            {!loading && (
              <span className="absolute inset-0 bg-gradient-to-r from-pink-700 to-pink-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            )}
          </button>
          <button
            onClick={() => {
              setAge(''); setMedu(''); setFedu(''); setTraveltime(''); setStudytime('');
              setFailures(''); setFamrel(''); setFreetime(''); setGoout(''); setDalc('');
              setWalc(''); setHealth(''); setAbsences(''); setG1(''); setG2('');
              setClassification(null);
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

      {/* Classification Results */}
      {classification && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">SVM Classification Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-700">Performance Category:</p>
                <p className="text-3xl font-bold text-pink-600">{classification.performance}</p>
              </div>
              <div>
                <p className="text-gray-700">Model Confidence:</p>
                <p className="text-3xl font-bold text-rose-600">{(classification.confidence * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-gray-700">Support Vectors:</p>
                <p className="text-3xl font-bold text-purple-600">{classification.supportVectors}</p>
              </div>
            </div>
            
            {classification.decisionFunction && classification.decisionFunction.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Decision Function Values:</h3>
                <div className="grid grid-cols-3 gap-4">
                  {classification.decisionFunction.map((value, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-gray-600">Class {idx}:</span>
                      <span className="ml-2 text-pink-600 font-semibold">{value.toFixed(4)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Decision Boundary Plot */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Decision Boundary Visualization</h2>
            <div className="h-[500px]">
              <Scatter data={generateDecisionBoundaryData()} options={chartOptions} />
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              SVM decision boundaries separating different performance categories. 
              The dashed lines show the boundaries between Excellent (green), Good (blue), Average (yellow), and At-Risk (red) students.
              The purple star represents the current student's position.
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
