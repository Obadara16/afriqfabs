import React from 'react'
import FlowMenu from './FlowMenu'
import Navbar from './Navbar'

const CombinedNav = () => {
  return (
    <div className="w-full">
        <Navbar />
        <FlowMenu/>
    </div>
  )
}

export default CombinedNav