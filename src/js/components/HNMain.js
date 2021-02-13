import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import HNNewest from './HNNewest'
import HNNewComments from './HNNewComments'
import HNNews from './HNNews'
import HNAsk from './HNAsk'
import HNShow from './HNShow'
import HNJobs from './HNJobs'
import HNPast from './HNPast'

const routes = [
  {
    path: '/',
    exact: true,
    component: <Redirect to="/news" />
  },
  {
    path: '/news',
    component: <HNNews />
  },
  {
    path: '/newest',
    component: <HNNewest />
  },
  {
    path: '/comments',
    component: <HNNewComments />
  },
  {
    path: '/past',
    component: <HNPast />
  },
  {
    path: '/ask',
    component: <HNAsk />
  },
  {
    path: '/show',
    component: <HNShow />
  },
  {
    path: '/jobs',
    component: <HNJobs />
  },
  {
    path: '/submit',
  },
  {
    path: '/login',
  },
  {
    path: "*",
    component: "No found yikes"
  }
]

const HNMain = () => {
  return (
    <main className="p-2">
      <div className="content">
        <Switch>
          {
            routes.map((route) => {
              return (
                <Route key={uuidv4()} exact={route.exact} path={route.path}>
                  {route.component}
                </Route>
              )
            })
          }
        </Switch>
      </div>
      <div className="stretch"></div>
    </main>
  )
}

export default HNMain