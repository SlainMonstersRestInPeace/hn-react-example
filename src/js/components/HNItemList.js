import React, { Component } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useState, useEffect, useRef } from 'react'

import { useHttpRequest } from '../hooks/useHttpRequest'

import { v4 as uuidv4 } from 'uuid'

function makeAlgoliaAPIUrl(searchOption = "search", query = "", tags = "story", page = 0, hitsPerPage = 30, numericFilters = "") {
  const searchSegment = searchOption || "search";
  const querySegment = query && query != "" ? `query=${query}` : "";
  const tagsSegment = tags && tags != "" ? `&tags=${tags}` : "";
  const pageSegment = page && page != "" ? `&page=${page}` : "";
  const hitsSegment = hitsPerPage && hitsPerPage != "" ? `&hitsPerPage=${hitsPerPage}` : "";
  const numericFiltersSegment = numericFilters && numericFilters != "" ? `&numericFilters=${numericFilters}` : "";

  return `http://hn.algolia.com/api/v1/${searchSegment}?${querySegment}${tagsSegment}${pageSegment}${hitsSegment}${numericFiltersSegment}`
}

const HNItemList = ({
  searchOption,
  query,
  tags,
  numericFilters,
  mapItem
}) => {
  const itemsPerPage = useSelector((state) => state.appState.itemsPerPage);

  const [items, setItems] = useState(null);
  const fetchItems = useHttpRequest(makeAlgoliaAPIUrl(searchOption, query, tags, 0, itemsPerPage, numericFilters));

  const page = useRef(0);
  const dirty = useRef(false);

  useEffect(() => {
    if (fetchItems.response && !fetchItems.error) {
      setItems(fetchItems.response);
    }

    if (!fetchItems.loading) {
      dirty.current = false;
    }
  }, [fetchItems.loading]);

  const itemsList = (() => {
    if (items && !dirty.current) {
      const itemsListItems = items.data.hits.map((item, i) => {
        return <React.Fragment key={uuidv4()}>
          {mapItem({ ...item, number: page.current*itemsPerPage + i })}
        </React.Fragment>
      });

      const more = page.current < items.data.nbPages - 1 ? <a onClick={handleMoreClick} className="more" >More</a> : null;

      return (
        <>
          <ul className="item-list list-unstyled mb-4">
            {itemsListItems}
          </ul>
          {more}
        </>
      )
    }

    return null;
  })();

  const errorMessage = ((error) => {
    if (error) {
      return (
        <div className="error-message">
          {error.message || String(error)}
        </div>
      )
    }

    return null;
  })(fetchItems.error);

  function handleMoreClick(e) {
    page.current += 1;
    dirty.current = true;

    const url = makeAlgoliaAPIUrl(searchOption, query, tags, page.current, itemsPerPage, numericFilters);
    fetchItems.refetchUrl(url);
  }
  
  console.log('render' + new Date().getTime());

  return (
    <div className="hn-item-list">
      {itemsList || errorMessage || "waiting responce from the server"}
    </div>
  )
}

export default HNItemList