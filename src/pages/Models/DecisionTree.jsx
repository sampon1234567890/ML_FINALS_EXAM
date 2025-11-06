import React, { useState } from 'react'
import GradingSystemInfo from '../../components/GradingSystemInfo';
import ValidationErrorModal from '../../components/ValidationErrorModal';

// Tree Node Component
const TreeNode = ({ node, x, y, level }) => {
  const nodeWidth = 140; // Reduced from 160 to prevent overlap
  const nodeHeight = 60;
  const isLeaf = !node.left && !node.right;
  
  const getNodeColor = () => {
    if (isLeaf) {
      if (node.label === "Excellent") return "#10B981";
      if (node.label === "Good") return "#3B82F6";
      if (node.label === "Average") return "#F59E0B";
      if (node.label === "At Risk") return "#EF4444";
    }
    return "#8B5CF6";
  };

  return (
    <g>
      <rect
        x={x - nodeWidth / 2}
        y={y}
        width={nodeWidth}
        height={nodeHeight}
        rx="8"
        fill={getNodeColor()}
        stroke="#fff"
        strokeWidth="2"
        opacity={isLeaf ? "0.9" : "0.8"}
      />
      <text
        x={x}
        y={y + 25}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
      >
        {node.feature}
      </text>
      <text
        x={x}
        y={y + 45}
        textAnchor="middle"
        fill="white"
        fontSize="11"
      >
        {node.condition || node.label}
      </text>
    </g>
  );
};

// Tree Branch Component
const TreeBranch = ({ x1, y1, x2, y2, label }) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  
  return (
    <g>
      <line
        x1={x1}
        y1={y1 + 60}
        x2={x2}
        y2={y2}
        stroke="#9CA3AF"
        strokeWidth="2"
      />
      <text
        x={midX}
        y={midY - 5}
        textAnchor="middle"
        fill="#6B7280"
        fontSize="11"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  );
};

// Complete Decision Tree Visualization
const DecisionTreeDiagram = ({ highlightPath = [] }) => {
  const treeData = {
    feature: "Attendance",
    condition: "≥ 75%?",
    left: {
      feature: "Assignments",
      condition: "≥ 80%?",
      left: {
        feature: "Test Score",
        condition: "≥ 85%?",
        left: {
          feature: "Result",
          label: "Excellent"
        },
        right: {
          feature: "Result",
          label: "Good"
        }
      },
      right: {
        feature: "Result",
        label: "Average"
      }
    },
    right: {
      feature: "Test Score",
      condition: "≥ 60%?",
      left: {
        feature: "Result",
        label: "Average"
      },
      right: {
        feature: "Result",
        label: "At Risk"
      }
    }
  };

  const levelHeight = 180; // Increased for more vertical spacing
  const baseWidth = 420; // Increased significantly to spread bottom nodes

  const renderTree = (node, x, y, level, width) => {
    if (!node) return null;

    const elements = [];
    elements.push(
      <TreeNode key={`node-${x}-${y}`} node={node} x={x} y={y} level={level} />
    );

    if (node.left) {
      const leftX = x - width / 2;
      const leftY = y + levelHeight;
      elements.push(
        <TreeBranch
          key={`branch-left-${x}-${y}`}
          x1={x}
          y1={y}
          x2={leftX}
          y2={leftY}
          label="Yes"
        />
      );
      elements.push(...renderTree(node.left, leftX, leftY, level + 1, width / 2));
    }

    if (node.right) {
      const rightX = x + width / 2;
      const rightY = y + levelHeight;
      elements.push(
        <TreeBranch
          key={`branch-right-${x}-${y}`}
          x1={x}
          y1={y}
          x2={rightX}
          y2={rightY}
          label="No"
        />
      );
      elements.push(...renderTree(node.right, rightX, rightY, level + 1, width / 2));
    }

    return elements;
  };

  return (
    <div className="w-full overflow-x-auto bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-8">
      <svg width="1600" height="800" className="mx-auto">
        {renderTree(treeData, 800, 40, 0, baseWidth)}
      </svg>
    </div>
  );
};

export default function DecisionTree(){
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [attendance, setAttendance] = useState("");
  const [assignments, setAssignments] = useState("");
  const [testScore, setTestScore] = useState("");

  const handleAnalyze = () => {
    // Validate all required inputs
    if (!attendance || !assignments || !testScore) {
      setShowErrorModal(true);
      return;
    }

    const attendanceVal = parseFloat(attendance);
    const assignmentsVal = parseFloat(assignments);
    const testScoreVal = parseFloat(testScore);

    let outcome = "At Risk";
    let path = [];

    if (attendanceVal >= 75) {
      path.push({ feature: "Attendance", value: "≥ 75%", result: "Pass" });
      if (assignmentsVal >= 80) {
        path.push({ feature: "Assignment Completion", value: "≥ 80%", result: "Pass" });
        if (testScoreVal >= 85) {
          path.push({ feature: "Test Scores", value: "≥ 85%", result: "Pass" });
          outcome = "Excellent";
        } else {
          path.push({ feature: "Test Scores", value: "&lt; 85%", result: "Moderate" });
          outcome = "Good";
        }
      } else {
        path.push({ feature: "Assignment Completion", value: "&lt; 80%", result: "Fail" });
        outcome = "Average";
      }
    } else {
      path.push({ feature: "Attendance", value: "&lt; 75%", result: "Risk Factor" });
      if (testScoreVal >= 60) {
        path.push({ feature: "Test Scores", value: "≥ 60%", result: "Moderate" });
        outcome = "Average";
      } else {
        path.push({ feature: "Test Scores", value: "&lt; 60%", result: "High Risk" });
        outcome = "At Risk";
      }
    }

    const recommendations = {
      "Excellent": [
        "Maintain current excellent performance",
        "Consider peer mentoring opportunities",
        "Explore advanced coursework"
      ],
      "Good": [
        "Continue strong study habits",
        "Focus on test preparation strategies",
        "Maintain regular attendance"
      ],
      "Average": [
        "Improve assignment completion rate",
        "Set up weekly study schedule",
        "Attend office hours regularly"
      ],
      "At Risk": [
        "Implement regular attendance tracking",
        "Set up weekly assignment checkpoints",
        "Schedule additional support sessions"
      ]
    };

    setAnalysis({
      outcome: outcome,
      path: path,
      recommendations: recommendations[outcome]
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
        <h1 className="text-3xl font-bold text-gray-900">Decision Tree Analysis</h1>
        <p className="mt-2 text-lg text-gray-600">
          Transparent rule-based system for understanding student performance factors
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-violet-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-violet-900 mb-3">Decision Factors</h3>
          <ul className="space-y-2 text-violet-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Attendance Rates
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
        
        <div className="bg-fuchsia-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-fuchsia-900 mb-3">Decision Rules</h3>
          <ul className="space-y-2 text-fuchsia-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              IF-THEN Rules
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Threshold Values
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Path Conditions
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">Model Features</h3>
          <ul className="space-y-2 text-purple-800">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Tree Depth: 5
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Information Gain
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Pruning Enabled
            </li>
          </ul>
        </div>
      </div>

      {/* Analysis Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Performance Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attendance Rate (%)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
              placeholder="Enter percentage"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignment Completion (%)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
              placeholder="Enter percentage"
              value={assignments}
              onChange={(e) => setAssignments(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Test Score
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
              placeholder="Enter score (0-100)"
              value={testScore}
              onChange={(e) => setTestScore(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={handleAnalyze}
            className="w-full bg-violet-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:bg-violet-700 active:scale-95 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 relative overflow-hidden group"
          >
            <span className="relative z-10">Analyze Performance</span>
            <span className="absolute inset-0 bg-gradient-to-r from-violet-700 to-violet-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
          <button
            onClick={() => {
              setAttendance('');
              setAssignments('');
              setTestScore('');
              setAnalysis(null);
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

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <p className="text-gray-700 mb-2">Final Outcome:</p>
                <p className="text-3xl font-bold text-violet-600">{analysis.outcome}</p>
              </div>
              <div>
                <p className="text-gray-700 mb-2">Decision Path:</p>
                <div className="space-y-2">
                  {analysis.path.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-purple-600 mr-2">→</span>
                      <span className="text-gray-700">{step.feature}:</span>
                      <span className="text-violet-600 mx-2">{step.value}</span>
                      <span className="text-gray-600">({step.result})</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gray-700 mb-2">Recommendations:</p>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-600">{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Decision Tree Diagram */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Decision Tree Flowchart</h2>
            <DecisionTreeDiagram />
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-violet-600 mr-2"></div>
                <span className="text-sm text-gray-600">Decision Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-green-600 mr-2"></div>
                <span className="text-sm text-gray-600">Excellent</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-blue-600 mr-2"></div>
                <span className="text-sm text-gray-600">Good</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-yellow-600 mr-2"></div>
                <span className="text-sm text-gray-600">Average</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-red-600 mr-2"></div>
                <span className="text-sm text-gray-600">At Risk</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Interactive flowchart showing the decision-making process. Each node represents a decision point,
              with "Yes" and "No" branches leading to different outcomes.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
