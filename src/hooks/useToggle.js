import { useState, useRef } from 'react';
import useKeyPressEvent from 'react-use/lib/useKeyPressEvent';
import useClickAway from 'react-use/lib/useClickAway';

import { pressEsc } from 'utils';

/**
 * @param {boolean?} [hideOnClickAway=false]
 * @param {boolean?} [hideOnEsc=true]
 * @returns {{onToggle: function, onClose: function, ref: React.MutableRefObject, isOpened: boolean}}
 */
const useToggle = ({ hideOnClickAway = false, hideOnEsc = true } = {}) => {
  const [isOpened, setIsOpened] = useState(false);

  const onClose = () => setIsOpened(false);

  const ref = useRef(null);

  useKeyPressEvent(pressEsc, () => {
    if (hideOnEsc) {
      onClose();
    }
  });

  const onToggle = () => setIsOpened(!isOpened);

  useClickAway(ref, () => {
    if (hideOnClickAway) {
      onClose();
    }
  });

  return { onClose, onToggle, isOpened, ref };
};

export default useToggle;
