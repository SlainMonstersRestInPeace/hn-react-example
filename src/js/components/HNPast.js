import React, { Component, Fragment } from 'react'

import { useState, useEffect, useRef } from 'react'

import { v4 as uuidv4 } from 'uuid'

import HNItemList from './HNItemList'
import HNStoryItem from './HNStoryItem'

function mapItem(item) {
  return <HNStoryItem {...item} />
}

import moment from 'moment'
import { timeFrameFromToday } from '../util'

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septemper",
  "October",
  "November",
  "December",
]


const HNPast = () => {
  const yesterday = moment();
  yesterday.subtract(1, "days");

  const conceptionDate = moment([2007, 1, 19]);

  const [date, setDate] = useState(yesterday);

  function moveAPeriod(count, measure) {
    const newDate = moment(date);

    newDate.add(count, measure);

    if (!newDate.isBefore(conceptionDate) && !newDate.isAfter(yesterday)) {
      setDate(newDate);
    }
  }

  function handleGoBackDay() {
    moveAPeriod(-1, "days");
  }

  function handleGoBackMonth() {
    moveAPeriod(-1, "months");
  }

  function handleGoBackYear() {
    moveAPeriod(-1, "years");
  }

  function handleGoFwdDay() {
    moveAPeriod(1, "days");
  }

  function handleGoFwdMonth() {
    moveAPeriod(1, "months");
  }

  function handleGoFwdYear() {
    moveAPeriod(1, "years");
  }

  const dateFilter = (() => {
    const thisDay = moment.unix(date.unix());
    thisDay.startOf("day");
    thisDay.subtract(1, "days")

    const tomorrow = moment.unix(thisDay.unix());
    tomorrow.add(1, "days");

    const lower = thisDay.unix();
    const upper = tomorrow.unix();

    return `created_at_i>${lower},created_at_i<${upper}`;
  })();

  const moveAdDateLinks = (() => {
    const labels = ["day", "month", "year", "day", "month", "year"];
    const classes = ["go-back-day", "go-back-month", "go-back-year", "go-forward-day", "go-forward-month", "go-forward-year"];
    const handlers = [handleGoBackDay, handleGoBackMonth, handleGoBackYear, handleGoFwdDay, handleGoFwdMonth, handleGoFwdYear];
    const measure = ["days", "months", "years", "days", "months", "years"];
    const count = [-1, -1, -1, 1, 1, 1];

    const links = labels.map((label, i) => {
      const newDate = moment(date);

      newDate.add(count[i], measure[i]);

      if (!newDate.isBefore(conceptionDate) && !newDate.isAfter(yesterday)) {
        return (
          <a key={uuidv4()} href="#" className={`link go-back ${classes[i]}`} onClick={handlers[i]}>
            {label}
          </a>
        )
      }

      return null;
    });

    return {
      back: links.slice(0, 3),
      forward: links.slice(3)
    }
  })();

  function createLinks(links, clause) {
    if (links) {
      const notnull = links.filter(l => l != null);

      const mapped = notnull.map((link, i) => {
        if (link) {
          return i < notnull.length - 1
            ? <Fragment key={uuidv4()}>{link},{' '}</Fragment>
            : <Fragment key={uuidv4()}>{link}</Fragment>
        } else return "";
      })

      return mapped.length > 0 ? <>Go {clause} a {mapped}.</> : "";
    }

    return null;
  }

  const backLinks = createLinks(moveAdDateLinks.back, "back");
  const forwardLinks = createLinks(moveAdDateLinks.forward, "forward");

  return (
    <div className="hn-past">
      <div className="hn-notice mt-2">
        <p className="m-0">Stories from {monthNames[date.month()]} {date.date()}, {date.year()} (UTC)</p>
        <p>
          {backLinks}{' '}{forwardLinks}
        </p>
      </div>
      <HNItemList
        tags="story"
        searchOption="search_by_date"
        mapItem={mapItem}
        numericFilters={dateFilter}
      />
    </div>
  )
}

export default HNPast