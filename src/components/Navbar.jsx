import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const closeTimer = useRef(null)

  // close when clicking outside
  useEffect(() => {
    function onDocClick(e){
      if(menuRef.current && !menuRef.current.contains(e.target)){
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  // close on Escape key for accessibility
  useEffect(() => {
    function onKey(e){
      if(e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // helper to set a short delay before closing to avoid flicker when moving pointer
  function scheduleClose(delay = 120){
    if(closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), delay)
  }

  function cancelScheduledClose(){
    if(closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/90 dark:bg-background-dark/90 backdrop-blur-sm shadow-soft">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-[1600px]">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path></svg>
          </div>
          <Link to="/" className="text-xl font-bold font-heading">EduInsight Analytics</Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
          <Link to="/" className="link-animated hover:text-primary transition-colors duration-300">Home</Link>
          <Link to="/company" className="link-animated hover:text-primary transition-colors duration-300">Company</Link>
          <Link to="/dataset" className="link-animated hover:text-primary transition-colors duration-300">Dataset</Link>

          {/* Models dropdown: use controlled open state to avoid hover flicker */}
          <div
            ref={menuRef}
            className="relative"
            onMouseEnter={() => { cancelScheduledClose(); setOpen(true) }}
            onMouseLeave={() => scheduleClose(150)}
          >
            <button
              onClick={() => setOpen((s) => !s)}
              onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(s => !s) } }}
              aria-expanded={open}
              aria-haspopup="menu"
              className="flex items-center gap-1 hover:text-primary transition-all duration-300"
            >
              <span>Models</span>
              <span className={`material-symbols-outlined text-base transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-surface dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
            >
              <Link to="/models/linear-regression" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-text-secondary hover:bg-background-light hover:text-primary transition-all duration-200 first:rounded-t-lg">Linear Regression</Link>
              <Link to="/models/naive-bayes" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-text-secondary hover:bg-background-light hover:text-primary transition-all duration-200">Naive Bayes</Link>
              <Link to="/models/knn" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-text-secondary hover:bg-background-light hover:text-primary transition-all duration-200">KNN</Link>
              <Link to="/models/svm" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-text-secondary hover:bg-background-light hover:text-primary transition-all duration-200">SVM</Link>
              <Link to="/models/decision-tree" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-text-secondary hover:bg-background-light hover:text-primary transition-all duration-200">Decision Tree</Link>
              <Link to="/models/ann" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-text-secondary hover:bg-background-light hover:text-primary transition-all duration-200 last:rounded-b-lg">ANN</Link>
            </div>
          </div>

          <Link to="/contact" className="link-animated hover:text-primary transition-colors duration-300">Contact</Link>
        </nav>

        <div className="md:hidden">
          <button className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  )
}
