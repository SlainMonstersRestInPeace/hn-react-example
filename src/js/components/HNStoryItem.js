import React, { Component } from 'react'

import { calculateDateFromMs } from '../util'
import { extractDomain } from '../util'


const HNStoryItem = ({
  title,
  url,
  author,
  points,
  type,
  created_at_i,
  num_comments,
  number
}) => {
  const childrenLabel = num_comments && num_comments > 0 ? `${num_comments} comments` : 'discuss';
  const domainUrl = url && url !== "" ? (
    <span className="hn-item-url">
      <a className="link" href="#">({`${extractDomain(url)}`})</a>
    </span>
  ) : null;

  const date = calculateDateFromMs(created_at_i);

  return (
    <article className="hn-item mb-1 d-flex flex-row">
      <div className="mr-1">
        <span className="hn-item-number">{number+1}.</span>
        {' '}
        <span className="vote-up"></span>
      </div>
      <div>
        <header className="hn-item-header">
          <span className="hn-item-title">
            <a href={url}>{title}</a>
          </span>{' '}
          {domainUrl}
        </header>
        <div className="hn-item-bottom d-flex flex-row align-items-center">
          <div className="hn-item-info">
            {points}{' '}points{' '}by{' '}<a className="link" href="#">{author}</a>{' '}<a className="link" href="#">{date}</a>
          </div>
          <div className="hn-story-actions">
            <ul className="list-unstyled d-flex flex-row">
              <li>&nbsp;|&nbsp;</li>
              <li>
                <a className="link hn-story-hide" href="#">
                  hide
                </a>
              </li>
              <li>&nbsp;|&nbsp;</li>
              <li>
                <a className="link hn-story-pass" href="#">
                  past
                </a>
              </li>
              <li>&nbsp;|&nbsp;</li>
              <li>
                <a className="link hn-story-discuss" href="#">
                  {childrenLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

export default HNStoryItem