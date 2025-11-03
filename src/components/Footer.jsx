import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="bg-white dark:bg-gray-900/50">
      <div className="container mx-auto px-6 py-8 max-w-[1600px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path></svg>
            </div>
            <span className="font-bold font-heading">EduInsight Analytics</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <Link to="/company" className="hover:text-primary transition-colors duration-150">About</Link>
            <Link to="/contact" className="hover:text-primary transition-colors duration-150">Contact</Link>
            <Link to="#" className="hover:text-primary transition-colors duration-150">Privacy Policy</Link>
          </div>
        </div>
        <p className="mt-6 text-sm text-text-secondary">© 2024 EduInsight. All rights reserved.</p>
      </div>
    </footer>
  )
}
