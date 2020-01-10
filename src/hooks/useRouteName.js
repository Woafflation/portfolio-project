import { useState, useEffect } from 'react';
import { getLocation } from 'connected-react-router';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

const useRouteName = () => {
  const [route, setRoute] = useState();

  const location = useSelector(getLocation);

  useEffect(() => {
    setRoute(get(location, `pathname`));
  }, [location]);

  return route;
};

export default useRouteName;
