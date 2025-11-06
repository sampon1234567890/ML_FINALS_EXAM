import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="page-enter">
      {/* Hero Section with Gradient Background */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold animate-fade-in bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Data-Driven Support for Student Success</h1>
              <p className="mt-6 text-lg text-gray-700 max-w-2xl animate-fade-in" style={{animationDelay: '0.1s'}}>Our platform leverages advanced analytics to provide actionable insights, helping institutions improve educational outcomes and foster student growth.</p>
              <Link to="/dataset" className="inline-block mt-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 font-bold btn-primary btn-ripple relative overflow-hidden group shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="relative z-10">Explore Insights</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative w-full rounded-xl shadow-2xl bg-center bg-cover aspect-[4/3] overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl" style={{backgroundImage: `url('https://media.istockphoto.com/id/1588288383/photo/back-view-of-student-raising-his-hand-to-answer-teachers-question-during-education-training.jpg?s=612x612&w=0&k=20&c=ZSyPrLqe6WdE81WXiESD5AqIVw1a7hKv85UI5I-Vwco=')`}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section with Gradient Cards */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Key Features</h2>
            <p className="mt-4 text-lg text-gray-600">Unlock the full potential of your educational data.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 shadow-lg hover:shadow-xl text-center card-hover cursor-pointer border border-blue-100 transition-all duration-300">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">📈</div>
              <h3 className="mt-4 font-semibold text-xl text-blue-900 transition-colors duration-300">Predictive Analytics</h3>
              <p className="text-gray-600 mt-2">Identify at-risk students early with powerful predictive models.</p>
            </div>
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 shadow-lg hover:shadow-xl text-center card-hover cursor-pointer border border-purple-100 transition-all duration-300" style={{animationDelay: '0.1s'}}>
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">⚙️</div>
              <h3 className="mt-4 font-semibold text-xl text-purple-900 transition-colors duration-300">Performance Tracking</h3>
              <p className="text-gray-600 mt-2">Monitor and analyze student performance trends across cohorts.</p>
            </div>
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 shadow-lg hover:shadow-xl text-center card-hover cursor-pointer border border-indigo-100 transition-all duration-300" style={{animationDelay: '0.2s'}}>
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">🧭</div>
              <h3 className="mt-4 font-semibold text-xl text-indigo-900 transition-colors duration-300">Curriculum Optimization</h3>
              <p className="text-gray-600 mt-2">Use data to refine curriculum and improve engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visualization Section with Gradient Background */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Visualize Your Institution's Data</h2>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">Gain a clear, comprehensive view of your data through intuitive dashboards.</p>
          </div>
          <div className="mt-8 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
              <div className="w-full aspect-video bg-center bg-cover rounded-xl transition-transform transform hover:scale-[1.02] duration-500" style={{backgroundImage: `url('https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1400&q=60')`}} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
