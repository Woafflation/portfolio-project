import { useEffect } from 'react';
import { isNull } from 'lodash';

/**
 * Hook for scroll pagination
 * @param {number} page,
 * @param {number?} [extraPixels=50],
 * @param {function} callback,
 * @param {number?} [timeout=100],
 * @param {boolean?} [disable=false],
 * @param {React.RefObject} [ref=null],
 */
const useScrollPagination = ({ page, extraPixels = 200, callback, timeout = 200, disable = false, ref = null }) => {
  if (!page || !callback) {
    throw new Error(`Not all required settings in useScrollPagination`);
  }

  // Scroll pagination
  useEffect(() => {
    if (disable) {
      return;
    }
    /**
     * @type {number}
     */
    let timer;

    const onScrollAsync = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        /**
         * @type {HTMLElement}
         */
        const elem = isNull(ref) ? document.documentElement : ref.current;

        if (elem) {
          const { scrollTop, clientHeight, scrollHeight } = elem;

          if (scrollHeight - scrollTop - clientHeight <= extraPixels) {
            callback();
          }
        }
      }, timeout);
    };

    if (isNull(ref)) {
      document.addEventListener(`scroll`, onScrollAsync);

      return () => document.removeEventListener(`scroll`, onScrollAsync);
    } else {
      ref.current.addEventListener(`scroll`, onScrollAsync);

      return () => ref.current.removeEventListener(`scroll`, onScrollAsync);
    }
  }, [page, disable, callback]);
};

export default useScrollPagination;
