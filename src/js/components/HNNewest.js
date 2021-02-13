import React, { Component } from 'react'

import HNItemList from './HNItemList'
import HNStoryItem from './HNStoryItem'

function mapItem(item) {
  return <HNStoryItem {...item} />
}

const HNNewest = () => {
  return (
    <div className="hn-newest">
      <HNItemList
        tags="story"
        searchOption="search_by_date"
        mapItem={mapItem}
      />
    </div>
  )
}

export default HNNewest