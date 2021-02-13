import React, { Component } from 'react'

import { useState, useEffect, useRef, useCallback } from 'react'

const useFetch = (initialUrl, options = {
  method: 'GET',
  mode: 'cors'
}, data) => {
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setLoading(true);
    setResponse(null);
    setError(null);

    const fetchOptions = options.method === "GET" || options.method === "PUT" ? { 
      ...options,
      body: JSON.stringify(data)
    } : options;

    const urls = Array.isArray(url) ? url : [url];
    const promisedUrls = urls.map(url => {
      if (url) {
        return fetch(url, fetchOptions)
      } else {
        return null;
      }
    });

    Promise.all(promisedUrls)
      .then(results => {
        const promisedResults = results.map((result, i) => {
          if (result) {
            if (!result.ok) {
              throw new Error(`the response from ${result.url} was not OK: status ${result.status}: ${result.statusText}`)
            }

            return result.json().then(json => {
              return {
                url: result.url,
                data: json
              }
            })
          }

          return null;
        });

        return Promise.all(promisedResults);
      })
      .then(response => {
        if (Array.isArray(url)) {
          setResponse(response);
        } else {
          setResponse(response[0]);
        }
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [url]);

  return {
    response,
    loading,
    error,
    refetchUrl: setUrl
  }
};

export { useFetch }