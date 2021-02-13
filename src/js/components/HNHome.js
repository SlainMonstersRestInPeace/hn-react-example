import React, { Component } from 'react'

import HNHeader from './HNHeader'
import HNMain from './HNMain'
import HNFooter from './HNFooter'

const HNHome = () => {
  return (
    <div className="wrapper">
      <HNHeader />
      <HNMain />
      <HNFooter />
    </div>
  )
}

export default HNHome