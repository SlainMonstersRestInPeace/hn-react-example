import React, { Component } from 'react'

import HNHome from './HNHome'

import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <HNHome />
    </Router>
  )
}

export default App