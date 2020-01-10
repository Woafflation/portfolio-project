import { useWindowSize } from 'react-use';

import { DESKTOP_SIZE } from 'utils/constants';

/**
 * @return {boolean}
 */
const useDesktopSize = () => {
  const { width } = useWindowSize();

  return width >= DESKTOP_SIZE;
};

export default useDesktopSize;
