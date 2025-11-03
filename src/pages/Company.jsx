import React from 'react'

export default function Company(){
  return (
    <div className="container mx-auto px-6 py-16 max-w-[1400px] page-enter">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-base font-semibold text-primary">Our Company</p>
        <h1 className="mt-2 text-4xl font-bold">About EduInsight Analytics</h1>
        <p className="mt-4 text-lg text-text-secondary">Empowering educators and institutions with actionable insights to shape the future of learning.</p>
      </div>

      <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-surface dark:bg-gray-800 shadow-soft transition-transform transform hover:-translate-y-1 hover:shadow-lg">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-accent">🎯</div>
          <h3 className="mt-4 font-semibold">Our Mission</h3>
          <p className="mt-2 text-text-secondary">To provide accessible analytical tools that transform educational data into actionable insights.</p>
        </div>
        <div className="p-6 rounded-xl bg-surface dark:bg-gray-800 shadow-soft transition-transform transform hover:-translate-y-1 hover:shadow-lg">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-accent">👁️</div>
          <h3 className="mt-4 font-semibold">Our Vision</h3>
          <p className="mt-2 text-text-secondary">A future where educational decisions are data-informed and equitable for all learners.</p>
        </div>
        <div className="p-6 rounded-xl bg-surface dark:bg-gray-800 shadow-soft transition-transform transform hover:-translate-y-1 hover:shadow-lg">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-accent">🧩</div>
          <h3 className="mt-4 font-semibold">The Problem We Solve</h3>
          <p className="mt-2 text-text-secondary">Disparate and underutilized educational data that prevents personalized learning and improvement.</p>
        </div>
      </div>

      {/* Creators Section */}
      <div className="mt-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Meet the Creators</h2>
          <p className="mt-3 text-lg text-text-secondary">The team behind EduInsight Analytics</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-surface dark:bg-gray-800 shadow-soft transition-transform transform hover:-translate-y-2 hover:shadow-lg text-center">
            <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              SA
            </div>
            <h3 className="mt-4 font-semibold text-lg">Sebastian Lex Ampon</h3>
            <p className="mt-2 text-sm text-text-secondary">System Developer</p>
          </div>

          <div className="p-6 rounded-xl bg-surface dark:bg-gray-800 shadow-soft transition-transform transform hover:-translate-y-2 hover:shadow-lg text-center">
            <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-3xl font-bold">
              KA
            </div>
            <h3 className="mt-4 font-semibold text-lg">Kert Cain Abajo</h3>
            <p className="mt-2 text-sm text-text-secondary">System Developer</p>
          </div>

          <div className="p-6 rounded-xl bg-surface dark:bg-gray-800 shadow-soft transition-transform transform hover:-translate-y-2 hover:shadow-lg text-center">
            <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-3xl font-bold">
              DC
            </div>
            <h3 className="mt-4 font-semibold text-lg">Dan Justine Marion Cole</h3>
            <p className="mt-2 text-sm text-text-secondary">System Developer</p>
          </div>

          <div className="p-6 rounded-xl bg-surface dark:bg-gray-800 shadow-soft transition-transform transform hover:-translate-y-2 hover:shadow-lg text-center">
            <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              JM
            </div>
            <h3 className="mt-4 font-semibold text-lg">Jay Dee Magkidong</h3>
            <p className="mt-2 text-sm text-text-secondary">System Developer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
