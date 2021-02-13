import '../css/react-xhr-fetch-requests-example.scss'

import React, { Component } from 'react'
import { default as ReactDom } from 'react-dom'


import App from './components/App'
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

