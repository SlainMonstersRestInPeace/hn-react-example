import React, { Component } from 'react'

import { useState, useEffect } from 'react'

const useXHRAwait = (initialUrl, options = {
  method: "GET",
  withCredentials: false,
  responseType: "json"
}) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setResponse(null);
    setError(null);

    const method = options.method || "GET";
    const responseType = options.responseType || "json";

    const urls = Array.isArray(url) ? url : [url];

    (async () => {
      const promisedUrls = urls.map((url) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = responseType;

          xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status < 200 || xhr.status >= 400) {
                reject({ url, message: `the response status was < 200 or >= 400: ${xhr.status}: ${xhr.statusText}` });
              }

              resolve({ url, data: xhr.response });
            }
          }

          xhr.onError = () => {
            reject({ url, message: `error fetching ${url}; check your network connection` });
          }

          if (url) {
            xhr.open(method, url);
            xhr.send();
          } else {
            resolve(null);
          }
        })
      });

      const response = await Promise.all(promisedUrls);

      if (Array.isArray(url)) {
        setResponse(response);
      } else {
        setResponse(response[0]);
      }
    })()
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url])

  return {
    response,
    loading,
    error,
    refetchUrl: setUrl
  }
}

export { useXHRAwait }