import React, { Component } from 'react'

import HNItemList from './HNItemList'
import HNCommentItem from './HNCommentItem'

function mapItem(item) {
  return <HNCommentItem {...item} />
}

const HNNewComments = () => {
  return (
    <div className="hn-new-comments">
      <HNItemList
        tags="comment"
        searchOption="search_by_date"
        mapItem={mapItem}
      />
    </div>
  )
}

export default HNNewComments