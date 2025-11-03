import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="page-enter">
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold animate-fade-in">Data-Driven Support for Student Success</h1>
              <p className="mt-6 text-lg text-text-secondary max-w-2xl animate-fade-in" style={{animationDelay: '0.1s'}}>Our platform leverages advanced analytics to provide actionable insights, helping institutions improve educational outcomes and foster student growth.</p>
              <Link to="/dataset" className="inline-block mt-8 rounded-full bg-primary text-white px-8 py-3 font-bold btn-primary btn-ripple relative overflow-hidden group">
                <span className="relative z-10">Explore Insights</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </div>
            <div className="flex-1">
              <div className="w-full rounded-xl shadow-soft bg-center bg-cover aspect-[4/3] overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-1" style={{backgroundImage: `url('https://media.istockphoto.com/id/1588288383/photo/back-view-of-student-raising-his-hand-to-answer-teachers-question-during-education-training.jpg?s=612x612&w=0&k=20&c=ZSyPrLqe6WdE81WXiESD5AqIVw1a7hKv85UI5I-Vwco=')`}} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900/50">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Key Features</h2>
            <p className="mt-4 text-lg text-text-secondary">Unlock the full potential of your educational data.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group p-6 rounded-xl bg-background-light shadow-soft text-center card-hover cursor-pointer">
              <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">📈</div>
              <h3 className="mt-4 font-semibold transition-colors duration-300 group-hover:text-primary">Predictive Analytics</h3>
              <p className="text-text-secondary mt-2">Identify at-risk students early with powerful predictive models.</p>
            </div>
            <div className="group p-6 rounded-xl bg-background-light shadow-soft text-center card-hover cursor-pointer" style={{animationDelay: '0.1s'}}>
              <div className="mx-auto h-14 w-14 rounded-full bg-accent/10 text-accent flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">⚙️</div>
              <h3 className="mt-4 font-semibold transition-colors duration-300 group-hover:text-accent">Performance Tracking</h3>
              <p className="text-text-secondary mt-2">Monitor and analyze student performance trends across cohorts.</p>
            </div>
            <div className="group p-6 rounded-xl bg-background-light shadow-soft text-center card-hover cursor-pointer" style={{animationDelay: '0.2s'}}>
              <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">🧭</div>
              <h3 className="mt-4 font-semibold transition-colors duration-300 group-hover:text-primary">Curriculum Optimization</h3>
              <p className="text-text-secondary mt-2">Use data to refine curriculum and improve engagement.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Visualize Your Institution's Data</h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Gain a clear, comprehensive view of your data through intuitive dashboards.</p>
          </div>
          <div className="mt-8 bg-surface dark:bg-background-dark rounded-xl shadow-soft p-6">
            <div className="w-full aspect-video bg-center bg-cover rounded-lg transition-transform transform hover:scale-105" style={{backgroundImage: `url('https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1400&q=60')`}} />
          </div>
        </div>
      </section>
    </div>
  )
}
