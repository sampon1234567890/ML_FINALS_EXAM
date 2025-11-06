import React from 'react'

export default function Company(){
  return (
    <div className="page-enter">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Company</p>
            <h1 className="mt-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About EduInsight Analytics</h1>
            <p className="mt-4 text-lg text-gray-700">Empowering educators and institutions with actionable insights to shape the future of learning.</p>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Problem Cards */}
      <div className="container mx-auto px-6 py-16 max-w-[1400px]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">🎯</div>
            <h3 className="mt-4 font-semibold text-xl text-blue-900">Our Mission</h3>
            <p className="mt-2 text-gray-600">To provide accessible analytical tools that transform educational data into actionable insights.</p>
          </div>
          <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">👁️</div>
            <h3 className="mt-4 font-semibold text-xl text-purple-900">Our Vision</h3>
            <p className="mt-2 text-gray-600">A future where educational decisions are data-informed and equitable for all learners.</p>
          </div>
          <div className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">🧩</div>
            <h3 className="mt-4 font-semibold text-xl text-indigo-900">The Problem We Solve</h3>
            <p className="mt-2 text-gray-600">Disparate and underutilized educational data that prevents personalized learning and improvement.</p>
          </div>
        </div>
      </div>

      {/* Creators Section with Gradient Background */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Meet the Creators</h2>
            <p className="mt-3 text-lg text-gray-600">The team behind EduInsight Analytics</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  SA
                </div>
              </div>
              <h3 className="mt-4 font-semibold text-lg text-gray-900">Sebastian Lex Ampon</h3>
              <p className="mt-2 text-sm text-gray-600">System Developer</p>
            </div>

            <div className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-green-400 to-teal-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  KA
                </div>
              </div>
              <h3 className="mt-4 font-semibold text-lg text-gray-900">Kert Cain Abajo</h3>
              <p className="mt-2 text-sm text-gray-600">System Developer</p>
            </div>

            <div className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  DC
                </div>
              </div>
              <h3 className="mt-4 font-semibold text-lg text-gray-900">Dan Justine Marion Cole</h3>
              <p className="mt-2 text-sm text-gray-600">System Developer</p>
            </div>

            <div className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  JM
                </div>
              </div>
              <h3 className="mt-4 font-semibold text-lg text-gray-900">Jay Dee Magkidong</h3>
              <p className="mt-2 text-sm text-gray-600">System Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
