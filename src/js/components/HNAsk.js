import React, { Component } from 'react'

import HNItemList from './HNItemList'
import HNStoryItem from './HNStoryItem'

import { timeFrameWeekFromToday } from '../util'

function mapItem(item) {
  return <HNStoryItem {...item} />
}

const HNAsk = () => {
  const dateFilter = (() => {
    const { lower, upper } = { ...timeFrameWeekFromToday() };

    return `created_at_i>${lower},created_at_i<${upper}`;
  })();

  return (
    <div className="hn-ask">
      <HNItemList
        tags="ask_hn"
        searchOption="search"
        mapItem={mapItem}
        numericFilters={dateFilter}
      />
    </div>
  )
}

export default HNAsk