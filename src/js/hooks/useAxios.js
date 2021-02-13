import React, { Component } from 'react'

import { useEffect, useState } from 'react'

import axios from 'axios'

function useAxios(initialUrl, options = {
  method: "GET",
  widthCredentials: false,
  responseType: 'json'
}, data) {
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setResponse(null);
    setError(null);

    const validateStatus = (status) => status >= 200 && status < 400;

    const method = options.method ? options.method.toLowerCase() : "get";
    const axiosOptions = method === "post" || method === "put" || method === "patch" || method === "delete" 
      ? { ...options, method, validateStatus, data }
      : { ...options, method, validateStatus, };

    const urls = Array.isArray(url) ? url : [url];

    const promisedUrls = urls.map(url => {
      if (url) {
        return axios(url, axiosOptions).then(response => ({
          url,
          response
        }));
      }

      return null;
    });

    Promise.all(promisedUrls).then(results => {
      const responses =  results.map((result) => {
        return result ? { url: result.url, data: result.response.data } : null;
      });

      if (Array.isArray(url)) {
        setResponse(responses);
      } else {
        setResponse(responses[0]);
      }
    }).catch(error => {
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
    }).finally(() => {
      setLoading(false);
    })
  }, [url]);

  return {
    response,
    loading,
    error,
    refetchUrl: setUrl,
  }
}

export { useAxios }