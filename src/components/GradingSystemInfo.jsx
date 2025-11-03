import React, { useState } from 'react';

export default function GradingSystemInfo() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('features'); // 'grading' or 'features'

  return (
    <>
      {/* Floating Help Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-4 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 pulse-slow"
        title="Show Input Guide"
      >
        <span className="font-semibold">Need Help?</span>
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col modal-content">
            {/* Modal Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📚</span>
                <h2 className="text-xl font-bold">Input Guide & Grading System</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-blue-700 rounded-full p-2 transition-all duration-300 transform hover:rotate-90 active:scale-90"
                title="Close"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 px-4 pt-4 bg-gray-50">
              <button
                onClick={() => setActiveTab('features')}
                className={`px-4 py-2 font-medium transition-colors rounded-t-lg ${
                  activeTab === 'features'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                📝 What to Enter
              </button>
              <button
                onClick={() => setActiveTab('grading')}
                className={`px-4 py-2 font-medium transition-colors rounded-t-lg ${
                  activeTab === 'grading'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                📊 Grading Scale
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Understanding Input Fields</h3>
              
              <div className="p-3 bg-blue-100 border-l-4 border-blue-500 rounded mb-4">
                <p className="text-sm text-blue-900">
                  <strong>ℹ️ Why These Scales?</strong> Some fields use ranges (1-4, 1-5) instead of exact numbers because the model groups similar values together. 
                  For example, studying 2 hours vs 3 hours/week has similar impact - both fall in the "2-5 hours" category. 
                  Just pick the range that best matches your situation!
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Demographics */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">👤 Demographics</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Age:</strong> Student's age (15-22 years)</li>
                  </ul>
                </div>

                {/* Family Background */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">👨‍👩‍👧 Family Background</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Mother's Education (0-4):</strong>
                      <ul className="ml-4 mt-1 text-xs">
                        <li>0 = None</li>
                        <li>1 = Primary (4th grade)</li>
                        <li>2 = 5th-9th grade</li>
                        <li>3 = Secondary (high school)</li>
                        <li>4 = Higher education (college)</li>
                      </ul>
                    </li>
                    <li><strong>Father's Education (0-4):</strong> Same scale as above</li>
                    <li><strong>Family Relations (1-5):</strong> Quality (1=very bad, 5=excellent)</li>
                  </ul>
                </div>

                {/* School Activities */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">🏫 School</h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li>
                      <strong>Travel Time (1-4):</strong>
                      <ul className="ml-4 mt-1 text-xs">
                        <li>1 = &lt;15 min</li>
                        <li>2 = 15-30 min</li>
                        <li>3 = 30 min - 1 hour</li>
                        <li>4 = &gt;1 hour</li>
                      </ul>
                      <p className="ml-4 mt-1 text-xs text-blue-700 italic">💡 Choose the category that matches your commute time</p>
                    </li>
                    <li>
                      <strong>Study Time (1-4) - Weekly Hours:</strong>
                      <ul className="ml-4 mt-1 text-xs">
                        <li>1 = &lt;2 hours/week (minimal study)</li>
                        <li>2 = 2-5 hours/week (light study)</li>
                        <li>3 = 5-10 hours/week (moderate study)</li>
                        <li>4 = &gt;10 hours/week (intensive study)</li>
                      </ul>
                      <p className="ml-4 mt-1 text-xs text-blue-700 italic">💡 Add up your total study hours per week across all subjects, then pick the matching range</p>
                    </li>
                    <li>
                      <strong>Past Failures (0-4):</strong>
                      <ul className="ml-4 mt-1 text-xs">
                        <li>0 = Never failed a class</li>
                        <li>1 = Failed 1 class before</li>
                        <li>2 = Failed 2 classes</li>
                        <li>3 = Failed 3 classes</li>
                        <li>4 = Failed 4+ classes</li>
                      </ul>
                      <p className="ml-4 mt-1 text-xs text-blue-700 italic">💡 Count how many times you've had to repeat/retake a class. If more than 4, enter 4</p>
                    </li>
                    <li>
                      <strong>Absences (0-93):</strong> 
                      <p className="ml-4 mt-1 text-xs">Enter the actual number of days you've been absent this school year (no conversion needed)</p>
                    </li>
                  </ul>
                </div>

                {/* Lifestyle */}
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">🎯 Lifestyle & Social</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Free Time (1-5):</strong> After school (1=very low, 5=very high)</li>
                    <li><strong>Going Out (1-5):</strong> With friends (1=very low, 5=very high)</li>
                    <li><strong>Weekday Alcohol (1-5):</strong> Consumption (1=very low, 5=very high)</li>
                    <li><strong>Weekend Alcohol (1-5):</strong> Consumption (1=very low, 5=very high)</li>
                    <li><strong>Health (1-5):</strong> Current status (1=very bad, 5=very good)</li>
                  </ul>
                </div>

                {/* Grades - Most Important */}
                <div className="md:col-span-2 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-400">
                  <h4 className="font-semibold text-yellow-900 mb-2">⭐ Grades (Portuguese 0-20 Scale)</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Period 1 Grade (G1):</strong> First term grade (0-20)</li>
                    <li><strong>Period 2 Grade (G2):</strong> Second term grade (0-20)</li>
                  </ul>
                  <div className="mt-3 p-3 bg-yellow-100 rounded">
                    <p className="text-sm text-yellow-900">
                      <strong>💡 Important:</strong> G1 and G2 are the most influential features. Use your actual mid-term grades converted to the 0-20 scale (see Grading Scale tab for conversions).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grading Tab */}
          {activeTab === 'grading' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Portuguese Grading System (0-20)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-green-100 border border-green-300 rounded p-3">
                  <p className="font-bold text-green-800">✅ Good (15-20)</p>
                  <p className="text-sm text-green-700">High achiever - Excellent performance</p>
                </div>
                <div className="bg-yellow-100 border border-yellow-300 rounded p-3">
                  <p className="font-bold text-yellow-800">⚠️ Average (10-14)</p>
                  <p className="text-sm text-yellow-700">Moderate performer - Room for improvement</p>
                </div>
                <div className="bg-red-100 border border-red-300 rounded p-3">
                  <p className="font-bold text-red-800">🚨 At-Risk (0-9)</p>
                  <p className="text-sm text-red-700">Needs support - Requires intervention</p>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4">
                <h4 className="font-bold text-gray-900 mb-3">🌍 Grade Conversions for International Users</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded p-4 border border-blue-200">
                    <p className="font-semibold text-blue-900 mb-2">🇺🇸 US System (0-100%)</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>100% → 20</li>
                      <li>75% → 15 (Good)</li>
                      <li>50% → 10 (Minimum pass)</li>
                      <li>0% → 0</li>
                    </ul>
                    <p className="text-xs text-blue-600 mt-2"><strong>Formula:</strong> Divide by 5</p>
                  </div>

                  <div className="bg-purple-50 rounded p-4 border border-purple-200">
                    <p className="font-semibold text-purple-900 mb-2">🎓 GPA System (0-4.0)</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>4.0 → 18-20</li>
                      <li>3.0 → 15-17 (Good)</li>
                      <li>2.0 → 12-14</li>
                      <li>1.0 → 10-11</li>
                    </ul>
                    <p className="text-xs text-purple-600 mt-2"><strong>Formula:</strong> Multiply by 5</p>
                  </div>

                  <div className="bg-green-50 rounded p-4 border border-green-200">
                    <p className="font-semibold text-green-900 mb-2">🇬🇧 UK Letter Grades</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>A/A* → 18-20</li>
                      <li>B → 15-17 (Good)</li>
                      <li>C → 12-14</li>
                      <li>D → 10-11</li>
                      <li>E/F → 0-9</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-800">
                    <strong>📌 Quick Reference:</strong> If you're unsure, use this rule of thumb:
                  </p>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1 ml-4">
                    <li>• <strong>Excellent student (A grade):</strong> Enter 17-18 for G1/G2</li>
                    <li>• <strong>Good student (B grade):</strong> Enter 14-16 for G1/G2</li>
                    <li>• <strong>Average student (C grade):</strong> Enter 11-13 for G1/G2</li>
                    <li>• <strong>Struggling student (D/F grade):</strong> Enter 8-10 for G1/G2</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
