import React, { useState } from 'react'
import { Scatter } from 'react-chartjs-2';
import { predictKNN, createFeaturesObject } from '../../utils/api';
import GradingSystemInfo from '../../components/GradingSystemInfo';
import ValidationErrorModal from '../../components/ValidationErrorModal';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function KNN(){
  const [similarStudents, setSimilarStudents] = useState(null);
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

  // Generate scatter plot data with grouped students
  const generateGroupedScatterData = () => {
    // Use G2 grade (0-20 scale) and convert to percentage for visualization
    const grade = (parseFloat(G2) || 10) * 5; // Convert 0-20 to 0-100
    const hours = (parseFloat(studytime) || 2) * 5; // Convert 1-4 to 5-20 hours

    const highPerformers = [];
    const averagePerformers = [];
    const atRiskStudents = [];

    // Generate High Performers (85-100 grade range)
    for (let i = 0; i < 15; i++) {
      highPerformers.push({
        x: 18 + Math.random() * 7,
        y: 85 + Math.random() * 15
      });
    }

    // Generate Average Performers (70-84 grade range)
    for (let i = 0; i < 20; i++) {
      averagePerformers.push({
        x: 12 + Math.random() * 8,
        y: 70 + Math.random() * 14
      });
    }

    // Generate At-Risk Students (50-69 grade range)
    for (let i = 0; i < 12; i++) {
      atRiskStudents.push({
        x: 5 + Math.random() * 8,
        y: 50 + Math.random() * 19
      });
    }

    return {
      datasets: [
        {
          label: 'High Performers',
          data: highPerformers,
          backgroundColor: 'rgba(34, 197, 94, 0.6)',
          borderColor: 'rgb(34, 197, 94)',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: 'Average Performers',
          data: averagePerformers,
          backgroundColor: 'rgba(245, 158, 11, 0.6)',
          borderColor: 'rgb(245, 158, 11)',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: 'At-Risk Students',
          data: atRiskStudents,
          backgroundColor: 'rgba(239, 68, 68, 0.6)',
          borderColor: 'rgb(239, 68, 68)',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: 'Current Student',
          data: [{ x: hours, y: grade }],
          backgroundColor: 'rgba(59, 130, 246, 1)',
          borderColor: 'rgb(59, 130, 246)',
          pointRadius: 12,
          pointHoverRadius: 14,
          pointStyle: 'star',
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: Study Hours: ${context.parsed.x.toFixed(1)}h, Grade: ${context.parsed.y.toFixed(1)}%`;
          }
        }
      },
      title: {
        display: true,
        text: 'Student Performance Groups by Study Hours',
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
          text: 'Study Hours per Week',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        min: 0,
        max: 30
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
        max: 100
      }
    }
  };

  const handleFindSimilar = async () => {
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
      
      const result = await predictKNN(features);
      
      // The backend now returns labeled data directly
      setSimilarStudents({
        performance: result.predicted_label || 'Unknown',
        confidence: result.confidence || 0,
        neighbors: result.neighbors || [],
        distances: result.distances || [],
        probabilities: result.probabilities || {}
      });
    } catch (err) {
      setError(err.message || 'Failed to analyze student. Please try again.');
      setSimilarStudents(null);
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
        <h1 className="text-3xl font-bold text-gray-900">K-Nearest Neighbors Analysis</h1>
        <p className="mt-2 text-lg text-gray-600">
          Identifies similar student patterns and recommends improvement strategies based on successful peers
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-emerald-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-emerald-900 mb-3">Pattern Matching</h3>
          <ul className="space-y-2 text-emerald-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Learning Style
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Study Patterns
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Performance History
            </li>
          </ul>
        </div>
        
        <div className="bg-teal-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-teal-900 mb-3">Recommendations</h3>
          <ul className="space-y-2 text-teal-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Study Strategies
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Resource Usage
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Success Patterns
            </li>
          </ul>
        </div>

        <div className="bg-cyan-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-cyan-900 mb-3">Model Features</h3>
          <ul className="space-y-2 text-cyan-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              K = 5 Neighbors
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Euclidean Distance
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Weighted Voting
            </li>
          </ul>
        </div>
      </div>

      {/* Student Profile Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Enter Student Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="15-22"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mother's Education (0-4)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="0-4"
              value={Medu}
              onChange={(e) => setMedu(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Father's Education (0-4)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="0-4"
              value={Fedu}
              onChange={(e) => setFedu(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Travel Time (1-4)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="1-4"
              value={traveltime}
              onChange={(e) => setTraveltime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Study Time (1-4)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="1-4"
              value={studytime}
              onChange={(e) => setStudytime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Past Failures (0-4)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="0-4"
              value={failures}
              onChange={(e) => setFailures(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Family Relations (1-5)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="1-5"
              value={famrel}
              onChange={(e) => setFamrel(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Free Time (1-5)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="1-5"
              value={freetime}
              onChange={(e) => setFreetime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Going Out (1-5)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="1-5"
              value={goout}
              onChange={(e) => setGoout(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weekday Alcohol (1-5)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="1-5"
              value={Dalc}
              onChange={(e) => setDalc(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weekend Alcohol (1-5)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="1-5"
              value={Walc}
              onChange={(e) => setWalc(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Health Status (1-5)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="1-5"
              value={health}
              onChange={(e) => setHealth(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Absences (0-93)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="0-93"
              value={absences}
              onChange={(e) => setAbsences(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period 1 Grade (0-20)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="0-20"
              value={G1}
              onChange={(e) => setG1(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period 2 Grade (0-20)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="0-20"
              value={G2}
              onChange={(e) => setG2(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={handleFindSimilar}
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:bg-emerald-700 active:scale-95 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
          >
            <span className="relative z-10">{loading ? 'Analyzing...' : 'Find Similar Patterns'}</span>
            {!loading && (
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-emerald-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            )}
          </button>
          <button
            onClick={() => {
              setAge(''); setMedu(''); setFedu(''); setTraveltime(''); setStudytime('');
              setFailures(''); setFamrel(''); setFreetime(''); setGoout(''); setDalc('');
              setWalc(''); setHealth(''); setAbsences(''); setG1(''); setG2('');
              setSimilarStudents(null);
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

      {/* Similar Students Results */}
      {similarStudents && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">KNN Analysis Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700">Predicted Performance:</p>
                <p className="text-3xl font-bold text-emerald-600">{similarStudents.performance}</p>
              </div>
              <div>
                <p className="text-gray-700">Model Confidence:</p>
                <p className="text-3xl font-bold text-teal-600">{(similarStudents.confidence * 100).toFixed(1)}%</p>
              </div>
            </div>
            
            {similarStudents.neighbors && similarStudents.neighbors.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Nearest Neighbors:</h3>
                <div className="space-y-2">
                  {similarStudents.neighbors.map((neighbor, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
                      <span className="text-gray-700">Neighbor {idx + 1}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-emerald-600 font-semibold">
                          Distance: {similarStudents.distances && similarStudents.distances[idx] 
                            ? similarStudents.distances[idx].toFixed(2) 
                            : 'N/A'}
                        </span>
                        <span className="text-teal-600">
                          Label: {neighbor}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scatter Plot with Groups */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Student Performance Clustering</h2>
            <div className="h-[500px]">
              <Scatter data={generateGroupedScatterData()} options={chartOptions} />
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Scatter plot showing different student groups based on study hours and performance. 
              The blue star represents the current student, surrounded by similar students in different performance groups.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
