import React, { Component } from 'react'

import hnLogoGif from "../../assets/imgs/hn-logo.gif"

import { Link, NavLink } from 'react-router-dom'

const HNHeader = () => {
  return (
    <header className="d-flex flex-row align-items-center site-header">
      <div className="d-flex flex-row mr-auto align-items-center">
        <div className="hn-brand d-flex flex-row">
          <Link to="/news" className="y-logo d-flex mr-1"><img src={hnLogoGif} /></Link>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-start ml-1">
          <Link to="/news" className="hacker-news mr-md-1 font-weight-bold">Hacker News</Link>
          <nav>
            <ul className="nav d-flex">
              <li className="nav-item">
                <NavLink to="/newest" className="nav-link p-0">new</NavLink>
              </li>
              &nbsp;<li>|</li>&nbsp;
              <li className="nav-item">
                <NavLink to="/past" className="nav-link p-0">past</NavLink>
              </li>
              &nbsp;<li>|</li>&nbsp;
              <li className="nav-item">
                <NavLink to="/comments" className="nav-link p-0">comments</NavLink>
              </li>
              &nbsp;<li>|</li>&nbsp;
              <li className="nav-item">
                <NavLink to="/ask" className="nav-link p-0">ask</NavLink>
              </li>
              &nbsp;<li>|</li>&nbsp;
              <li className="nav-item">
                <NavLink to="/show" className="nav-link p-0">show</NavLink>
              </li>
              &nbsp;<li>|</li>&nbsp;
              <li className="nav-item">
                <NavLink to="/jobs" className="nav-link p-0">jobs</NavLink>
              </li>
              &nbsp;<li>|</li>&nbsp;
              <li className="nav-item">
                <a className="nav-link p-0" href="#">submit</a>
              </li>
            </ul>
          </nav>
        </div>

      </div>
      <a className="hn-login" href="#">login</a>
    </header>
  )
}

export default HNHeader