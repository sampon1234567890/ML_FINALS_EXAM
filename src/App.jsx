import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Company from './pages/Company'
import Dataset from './pages/Dataset'
import Contact from './pages/Contact'
import LinearRegression from './pages/Models/LinearRegression'
import NaiveBayes from './pages/Models/NaiveBayes'
import KNN from './pages/Models/KNN'
import SVM from './pages/Models/SVM'
import DecisionTree from './pages/Models/DecisionTree'
import ANN from './pages/Models/ANN'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-primary dark:text-gray-200">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/company" element={<Company/>} />
          <Route path="/dataset" element={<Dataset/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/models/linear-regression" element={<LinearRegression/>} />
          <Route path="/models/naive-bayes" element={<NaiveBayes/>} />
          <Route path="/models/knn" element={<KNN/>} />
          <Route path="/models/svm" element={<SVM/>} />
          <Route path="/models/decision-tree" element={<DecisionTree/>} />
          <Route path="/models/ann" element={<ANN/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
