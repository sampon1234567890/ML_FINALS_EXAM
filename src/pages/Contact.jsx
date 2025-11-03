import React from 'react'

export default function Contact(){
  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl page-enter">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-text-secondary mt-2">Have questions or need help? This is a placeholder contact page.</p>

      <div className="mt-6 bg-surface dark:bg-gray-800 p-6 rounded-lg shadow-soft">
        <form className="grid gap-4">
          <input className="border px-3 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your name" />
          <input className="border px-3 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your email" />
          <textarea className="border px-3 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-primary/30" rows="6" placeholder="Message" />
          <button className="self-start rounded-full bg-primary text-white px-6 py-2 transition transform hover:scale-105 hover:shadow-md">Send Message</button>
        </form>
      </div>
    </div>
  )
}
