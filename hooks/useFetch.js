import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const { data } = await axios(url, { signal: controller.signal });
        setData(data);
      } catch (e) {
        setIsError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, isError };
}

export default useFetch;
