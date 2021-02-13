import React, { Component } from 'react'

import HNItemList from './HNItemList'
import HNStoryItem from './HNStoryItem'

function mapItem(item) {
  return <HNStoryItem {...item} />
}

const HNNews = () => {
  return (
    <div className="hn-news">
      <HNItemList
        tags="front_page"
        searchOption="search"
        mapItem={mapItem}
      />
    </div>
  )
}

export default HNNews