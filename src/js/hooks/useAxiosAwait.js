import React, { Component } from 'react'

import { useState, useEffect } from 'react'

import axios from 'axios'

const useAxiosAwait = (initialUrl, options = {
  method: "get",
  withCredentials: false
}, data) => {
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url) {
      setLoading(true);
      setResponse(null);
      setError(null);

      const validateStatus = (status) => status >= 200 && status < 400;

      const method = options.method ? options.method.toLowerCase() : 'get';
      const axiosOptions = data ? { ...options, method, validateStatus, data } : { ...options, method, validateStatus };

      const urls = Array.isArray(url) ? url : [url];

      (async () => {
        const promisedUrls = urls.map(url => {
          return url ? axios(url, axiosOptions).then(response => ({ url, response })) : null;
        })

        const results = await Promise.all(promisedUrls);

        const responses = results.map(result => {
          return result ? { url: result.url, data: result.response.data } : null;
        });

        if (Array.isArray(url)) {
          setResponse(responses);
        } else {
          setResponse(responses[0]);
        }
      })()
        .catch(error => {
          if (error.response) {
            setError({
              status: error.response.status,
              statusText: error.response.statusText,
              message: `the response status was < 200 or >= 400: ${error.response.status}: ${error.response.statusText}`
            })
          } else if (error.request) {
            setError({
              message: `error handling request; check your network connection`
            })
          } else {
            setError(error);
          }
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [url]);

  return {
    response,
    loading,
    error,
    refetchUrl: setUrl
  }
}

export { useAxiosAwait }