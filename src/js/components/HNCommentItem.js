import React, { Component } from 'react'

import { calculateDateFromMs } from '../util'

const HNCommentItem = ({
  author,
  story_title,
  story_url,
  comment_text,
  created_at_i,
  number
}) => {
  const date = calculateDateFromMs(created_at_i);

  if (!story_title || story_title === "") {
    console.log();
  }

  return (
    <div className="hn-item hn-comment mb-3">
      <div className="hn-item-header">
        <ul className="hn-comment-info list-unstyled d-flex mb-1">
          <li>
            <div className="vote-up"></div>
          </li>
          &nbsp;
          <li>
            <div className="hn-comment-by">
              <a className="link" href="#">
                {author}
              </a>
            </div>
          </li>
          &nbsp;
          <li>
            <div className="hn-comment-time">
              <a className="link" href="#">
                {date}
              </a>
            </div>
          </li>
          <li>&nbsp;|&nbsp;</li>
          <li>
            <div className="hn-comment-parent">
              <a className="link" href="#">
                parent
              </a>
            </div>
          </li>
          <li>&nbsp;|&nbsp;</li>
          <li>
            <div className="hn-comment-on">
              <span>on: </span>
              <a className="link" href="#">
                <span>
                  {story_title}
                </span>
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="hn-comment-text" dangerouslySetInnerHTML={{ __html: comment_text }}>
        {/* <div className="hn-comment-text" > */}
        {/* {comment_text} */}
        {/* <div dangerouslySetInnerHTML={{ __html: comment_text }}></div> */}
      </div>
    </div>
  )
}

export default HNCommentItem