import React, { Component } from 'react'

import { useState, useEffect } from 'react'

const useFetchAwait = (initialUrl, options = {
  mode: 'cors',
  method: 'GET'
}, data) => {
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setResponse(null);
      setError(null);

      const fetchOptions = data
        ? { ...options, body: data }
        : options;

      const urls = Array.isArray(url) ? url : [url];

      const promisedUrls = await Promise.all(urls.map(url => {
        if (url) {
          return fetch(url, fetchOptions);
        } else {
          return null;
        }
      }));

      const promisedResults = await Promise.all(promisedUrls.map(async (result) => {
        if (result) {
          if (!result.ok) {
            throw new Error(`the response from ${result.url} was ot OK: ${result.status}: ${result.statusText}`);
          }

          const data = await result.json();

          return {
            url: result.url,
            data
          }

        } else {
          return null;
        }
      }));

      if (Array.isArray(url)) {
        setResponse(promisedResults)
      } else {
        setResponse(promisedResults[0])
      };
    })()
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

export { useFetchAwait }