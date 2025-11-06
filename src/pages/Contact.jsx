import React from 'react'

export default function Contact(){
  return (
    <div className="page-enter">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center">
            <p className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Get in Touch</p>
            <h1 className="mt-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-700">Have questions or need help? We'd love to hear from you.</p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                <input 
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
                <input 
                  type="email"
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
              <input 
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                placeholder="How can we help you?" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea 
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                rows="6" 
                placeholder="Tell us more about your inquiry..." 
              />
            </div>

            <button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 font-semibold transition transform hover:scale-105 hover:shadow-lg active:scale-95">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <div className="text-4xl mb-3">📧</div>
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-sm text-gray-600">contact@eduinsight.com</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
            <p className="text-sm text-gray-600">Manila, Philippines</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
            <p className="text-sm text-gray-600">24/7 Available</p>
          </div>
        </div>
      </div>
    </div>
  )
}
