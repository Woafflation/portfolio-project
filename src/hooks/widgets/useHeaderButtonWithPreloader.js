import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

import { Size } from 'utils/enums';

import Preloader from 'components/preloader/Preloader';

const useHeaderButtonWithPreloader = ({ buttonProps: { children, ...buttonProps }, loadingSelector }) => {
  const [content, setContent] = useState(children);

  const loading = useSelector(loadingSelector);

  useUpdateEffect(() => {
    if (loading) {
      setContent(
        <div className="flex align-items-center">
          {children}
          <Preloader size={Size.MINI} className="ml-5"/>
        </div>
      );
    } else {
      setContent(children);
    }
  }, [loading]);

  return { ...buttonProps, children: content };
};

export default useHeaderButtonWithPreloader;
