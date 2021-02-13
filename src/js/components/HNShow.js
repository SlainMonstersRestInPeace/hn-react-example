import React, { Component } from 'react'

import HNItemList from './HNItemList'
import HNStoryItem from './HNStoryItem'

import moment from 'moment'


import { timeFrameWeekFromToday } from '../util'


function mapItem(item) {
  return <HNStoryItem {...item} />
}


const HNShow = () => {
  const dateFilter = (() => {
    const { lower, upper } = { ...timeFrameWeekFromToday() };

    return `created_at_i>${lower},created_at_i<${upper}`;
  })();

  return (
    <div className="hn-show">
      <HNItemList
        tags="show_hn"
        searchOption="search"
        mapItem={mapItem}
        numericFilters={dateFilter}
      />
    </div>
  )
}

export default HNShow