import React from 'react'
import { Link } from 'react-router-dom' 

const NotFoundPage = () => {
  return (
    <div class="text-center">
        <h1 class="text-9xl font-extrabold text-gray-900">404</h1>
        <p class="text-2xl font-semibold text-white mt-4">Oops! Page not found.</p>
        <p class="text-white/90 mt-2">The page you are looking for might have been removed or is temporarily unavailable.</p>
        <Link to={"/"} className='mt-6 inline-block px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg text-lg font-medium'>Go Home</Link>   
    </div>
  )
}

export default NotFoundPage
