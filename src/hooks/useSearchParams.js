import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSearch } from 'connected-react-router';
import queryString from 'query-string';

/**
 * @return {Object}
 */
const useSearchParams = () => {
  const search = useSelector(getSearch);

  const [searchParams, setSearchParams] = useState(queryString.parse(search));

  useEffect(() => {
    setSearchParams(queryString.parse(search));
  }, [search]);

  return searchParams;
};

export default useSearchParams;
