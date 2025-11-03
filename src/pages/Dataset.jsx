import React, { useState, useEffect } from 'react'

const API_BASE_URL = 'http://localhost:5000/api';

export default function Dataset(){
  const [datasetInfo, setDatasetInfo] = useState(null);
  const [sampleData, setSampleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDatasetInfo();
    fetchSampleData();
  }, []);

  const fetchDatasetInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dataset`);
      const data = await response.json();
      // Transform the data to include total_records and num_features
      data.total_records = data.shape ? data.shape[0] : 0;
      data.num_features = data.shape ? data.shape[1] : 0;
      setDatasetInfo(data);
    } catch (err) {
      setError('Failed to load dataset information');
      console.error(err);
    }
  };

  const fetchSampleData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/dataset/sample?limit=100`);
      const data = await response.json();
      setSampleData(data.sample || []);
    } catch (err) {
      setError('Failed to load sample data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sampleData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(sampleData.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Download CSV function
  const downloadCSV = () => {
    // Create CSV content from sample data
    if (!sampleData || sampleData.length === 0) return;

    // Headers
    const headers = ['Age', 'Gender', 'Mother_Education', 'Father_Education', 'Study_Time', 'Failures', 'Absences', 'G1', 'G2', 'G3', 'Performance_Label'];
    
    // Rows
    const rows = sampleData.map(record => [
      record.age,
      record.sex === 'M' ? 'Male' : 'Female',
      record.Medu,
      record.Fedu,
      record.studytime,
      record.failures,
      record.absences,
      record.G1,
      record.G2,
      record.G3,
      record.performance_label
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'student_performance_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get badge color based on performance
  const getPerformanceBadge = (label) => {
    if (label === 'Good') return 'bg-green-100 text-green-800';
    if (label === 'Average') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-[1600px] page-enter">
      {/* Floating Dataset Context Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center gap-2 pulse-slow"
        title="Show Dataset Context"
      >
        <span className="text-2xl">📊</span>
        <span className="font-semibold hidden md:inline">Dataset Info</span>
      </button>

      {/* Dataset Context Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col modal-content">
            {/* Modal Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📊</span>
                <h2 className="text-xl font-bold">About This Dataset</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-blue-700 rounded-full p-2 transition-all duration-300 transform hover:rotate-90 active:scale-90"
                title="Close"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">🎓 Origin</h3>
                  <p>
                    This dataset originates from the <strong>UCI Machine Learning Repository's Student Performance Dataset</strong>, 
                    containing student academic and behavioral data collected from two Portuguese secondary schools during the 
                    2005-2006 academic year.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-blue-900 mb-2">📈 Grading System (Portuguese 0-20 Scale)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
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
                </div>

                <div>
                  <h3 className="font-bold text-blue-900 mb-2">🌍 Universal Applicability</h3>
                  <p>
                    While the grading scale is Portuguese (0-20), the core features are <strong>universal indicators</strong> 
                    of student performance across all educational contexts:
                  </p>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li><strong>Study habits:</strong> Time spent studying affects grades everywhere</li>
                    <li><strong>Attendance:</strong> Absences correlate with poor performance globally</li>
                    <li><strong>Prior performance:</strong> Past grades predict future outcomes universally</li>
                    <li><strong>Family support:</strong> Parental education influences student success worldwide</li>
                    <li><strong>Lifestyle factors:</strong> Social activities and health impact learning capacity everywhere</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-blue-900 mb-2">🔄 Global Adaptability</h3>
                  <p>
                    The EduInsight Analytics framework can be retrained with local datasets from any country. 
                    Grade ranges can be normalized or converted to align with different grading systems (0-100%, GPA 0-4.0, etc.), 
                    while the behavioral patterns and predictive logic remain valid globally.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-blue-900 mb-2">📚 Dataset Statistics</h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li><strong>Total Students:</strong> 395 records</li>
                    <li><strong>Features:</strong> 34 attributes (demographics, family, school, lifestyle, grades)</li>
                    <li><strong>Target Variable:</strong> G3 (Final grade, 0-20 scale)</li>
                    <li><strong>15 Core Predictive Features:</strong> age, Medu, Fedu, traveltime, studytime, failures, famrel, freetime, goout, Dalc, Walc, health, absences, G1, G2</li>
                  </ul>
                </div>

                <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-sm">
                    <strong>📖 Citation:</strong> P. Cortez and A. Silva. <em>Using Data Mining to Predict Secondary School Student Performance.</em> 
                    In Proceedings of 5th FUture BUsiness TEChnology Conference (FUBUTEC 2008) pp. 5-12, Porto, Portugal, April, 2008.
                  </p>
                </div>
              </div>
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

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Student Performance Dataset</h1>
          <p className="text-text-secondary">
            {datasetInfo ? `${datasetInfo.total_records} student records from Portuguese secondary schools` : 'Loading dataset information...'}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={downloadCSV}
            disabled={!sampleData || sampleData.length === 0}
            className="rounded-full bg-green-600 text-white px-4 py-2 font-bold transition transform hover:scale-105 hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Download CSV
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      {datasetInfo && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total Students</p>
            <p className="text-2xl font-bold text-blue-600">{datasetInfo.total_records}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total Features</p>
            <p className="text-2xl font-bold text-green-600">{datasetInfo.num_features}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Average Grade (G3)</p>
            <p className="text-2xl font-bold text-purple-600">
              {datasetInfo.statistics?.G3?.mean ? datasetInfo.statistics.G3.mean.toFixed(2) : 'N/A'}/20
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Grade Range</p>
            <p className="text-2xl font-bold text-orange-600">0-20</p>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-surface dark:bg-gray-800 rounded-lg shadow-soft overflow-hidden border border-gray-200 dark:border-gray-800">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">Loading dataset...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-gray-500 mt-2">Make sure the backend server is running</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-900/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Age</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Gender</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">M.Edu</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">F.Edu</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Study Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Failures</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Absences</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">G1</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">G2</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">G3</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentRecords.map((record, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <td className="px-4 py-3 text-sm">{record.age}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{record.sex === 'M' ? 'Male' : 'Female'}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{record.Medu}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{record.Fedu}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{record.studytime}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{record.failures}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{record.absences}</td>
                      <td className="px-4 py-3 text-sm font-medium text-blue-600">{record.G1}</td>
                      <td className="px-4 py-3 text-sm font-medium text-blue-600">{record.G2}</td>
                      <td className="px-4 py-3 text-sm font-medium text-green-600">{record.G3}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPerformanceBadge(record.performance_label)}`}>
                          {record.performance_label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-text-secondary">
                Showing <span className="font-medium">{indexOfFirstRecord + 1}</span> to{' '}
                <span className="font-medium">{Math.min(indexOfLastRecord, sampleData.length)}</span> of{' '}
                <span className="font-medium">{sampleData.length}</span> results
              </p>
              <nav className="flex items-center gap-2">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`px-3 py-1 rounded ${
                        currentPage === pageNum
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                {totalPages > 5 && <span className="px-3 py-1">...</span>}
                
                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
