import { useState, useEffect } from "react";

function useFetchData(url, options = {}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(`Error: ${err}`));
  }, [url]);

  return { data };
}

export default useFetchData;
