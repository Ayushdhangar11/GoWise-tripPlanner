import React from 'react'

function Footer() {
  return (
    <div>
        <h2>
            <footer className="text-center text-gray-500 text-md mt-5 mb-5">
                &copy; {new Date().getFullYear()} Trip Planner. All rights reserved.
            </footer>
        </h2>
    </div>
  )
}

export default Footer