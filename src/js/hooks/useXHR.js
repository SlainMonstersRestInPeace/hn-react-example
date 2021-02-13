import { useEffect, useState, useRef } from 'react'

function useXHR(initialUrl, options = {
  method: "GET",
  responseType: "json",
  withCredentials: false
}) {
  const [urls, setUrls] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const isArray = useRef(null);

  useEffect(() => {
    setLoading(true);
    setResponse(null);
    setError(null);

    isArray.current = Array.isArray(urls);

    const urlsArray = isArray.current ? urls : [urls];

    const promisedUrls = urlsArray.map((url, i) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = options.withCredentials || false;
      xhr.responseType = options.responseType || "json";

      const method = options.method || "GET";

      return new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status < 200 && xhr.status >= 400) {
              reject({ url, message: `${url}: response status was < 200 and >= 400: ${xhr.status}: ${xhr.statusText}` });
            }

            resolve({ url, data: xhr.response });
          }
        }

        xhr.onerror = () => {
          reject({ url, message: `${url}: error handling request: check your network connection` });
        };

        if (url) {
          xhr.open(method, url);
          xhr.send();
        } else {
          resolve(null);
        }
      });
    });

    Promise.all(promisedUrls)
      .then(
        (results) => {
          if (isArray.current) {
            setResponse(results);
          } else {
            setResponse(results[0]);
          }
        },
        (reason) => {
          setError(reason);
        })
      .finally(() => {
        setLoading(false);
      });
  }, [urls]);

  return {
    response,
    loading,
    error,
    refetchUrl: setUrls
  };
}

export { useXHR }