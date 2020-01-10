import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { find } from 'lodash';
import { replace } from 'connected-react-router';

import useRouteName from 'hooks/useRouteName';
import { userPermissionsSelector } from 'selectors/auth';

import listData from 'components/header/listData';

const useUserHasAccess = () => {
  const dispatch = useDispatch();

  const currentRoute = useRouteName();
  const userPermissions = useSelector(userPermissionsSelector);
  const pages = listData(userPermissions);
  const currentPagePermissions = find(pages, { path: currentRoute });

  useEffect(() => {
    if (currentRoute && currentPagePermissions) {
      if (!currentPagePermissions.hasAccess) {
        dispatch(replace(`/no-permissions`));
      }
    }
  }, [currentRoute]);
};

export default useUserHasAccess;
