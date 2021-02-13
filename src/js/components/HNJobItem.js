import React, { Component } from 'react'

import { calculateDateFromMs } from '../util'
import { extractDomain } from '../util'

const HNJobItem = ({
  title,
  url,
  created_at_i,
}) => {
  const domainUrl = url ? (
    url !== "" ? (
      <span className="hn-item-url">
        <a className="link" href="#">({`${extractDomain(url)}`})</a>
      </span>
    ) : null) : null;

  const date = calculateDateFromMs(created_at_i);

  return (
    <article className="hn-item">
      <header className="hn-item-header">
        <span className="hn-item-title">
          <a href={url}>{title}</a>
        </span>
        &nbsp;{domainUrl}
      </header>
      <div className="hn-item-bottom">
        <div className="hn-item-info">
          <a className="link" href="#">
            {date}
          </a>
        </div>
      </div>
    </article>
  )
}

export default HNJobItem
