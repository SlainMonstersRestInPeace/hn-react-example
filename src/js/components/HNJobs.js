import React, { Component } from 'react'

import HNItemList from './HNItemList'
import HNJobItem from './HNJobItem'

function mapItem(item) {
  return <HNJobItem {...item} />
}

const HNJobs = () => {
  return (
    <div className="hn-jobs">
      <div className="hn-jobs-notice mt-2">
        <p>
          These are jobs at YC startups. See more at <a href="#">Work at a Startup</a> or attend <a href="#">YC's GTM Jobs Expo March 3rd</a> for sales, marketing and operational roles at YC startups.
        </p>
      </div>
      <HNItemList
        tags="job"
        searchOption="search_by_date"
        mapItem={mapItem}
      />
    </div>
  )
}

export default HNJobs