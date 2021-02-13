import React, { Component } from 'react'

const HNFooter = () => {
  return (
    <footer>
      <div>
        <ul className="list-unstyled d-flex flex-row justify-content-center mb-3">
          <li>
            <a href="https://news.ycombinator.com/newsguidelines.html">Guidelines</a>
          </li>
          <li>
            &nbsp;|&nbsp;
          </li>
          <li>
            <a href="https://news.ycombinator.com/newsfaq.html">FAQ</a>
          </li>
          <li>
            &nbsp;|&nbsp;
          </li>
          <li>
            <a href="mailto:hn@ycombinator.com">Support</a>
          </li>
          <li>
            &nbsp;|&nbsp;
          </li>
          <li>
            <a href="https://github.com/HackerNews/API">API</a>
          </li>
          <li>
            &nbsp;|&nbsp;
          </li>
          <li>
            <a href="https://news.ycombinator.com/security.html">Security</a>
          </li>
          <li>
            &nbsp;|&nbsp;
          </li>
          <li>
            <a href="https://news.ycombinator.com/lists">Lists</a>
          </li>
          <li>
            &nbsp;|&nbsp;
          </li>
          <li>
            <a href="https://news.ycombinator.com/bookmarklet.html">Bookmarklet</a>
          </li>
          <li>
            &nbsp;|&nbsp;
          </li>
          <li>
            <a href="https://www.ycombinator.com/legal/">Legal</a>
          </li>
          <li>
            &nbsp;|&nbsp;
          </li>
          <li>
            <a href="https://www.ycombinator.com/apply/">Apply to YC</a>
          </li>
          <li>
            &nbsp;|&nbsp;
          </li>
          <li>
            <a href="mailto:hn@ycombinator.com">Contact</a>
          </li>
        </ul>
      </div>
      <div className="algolia">
        <form className="d-flex justify-content-center align-items-center" id="algolia-search-form" method="get" action="//hn.algolia.com/">
          <span className="mr-1">Search:</span>
          <input className="flex-md-grow-0 flex-grow-1" type="text" name="algolia-search" id="algolia-search" defaultValue="" />
        </form>
      </div>
    </footer>
  )
}


export default HNFooter