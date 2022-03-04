import React from 'react'

function AppSpinner() {
    
  return (
    <div className=' h-50 w-50 absolute top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%]  ' >
        <svg  className="spinner w-16 h-16  text-blue-400" viewBox="0 0 60 60">
    <circle className="path" cx="30" cy="30" r="25" stroke="currentColor" fill="none" strokeWidth="5"></circle>
  </svg></div>
  )
}

export default AppSpinner;