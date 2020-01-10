import useUpdateEffect from 'react-use/lib/useUpdateEffect';
import useMount from 'react-use/lib/useMount';
import useUnmount from 'react-use/lib/useUnmount';
import { useDispatch, useSelector } from 'react-redux';
import { isString, isObject, isArray, size, find, has } from 'lodash';

import { widgetSelector } from 'selectors/widgets/widgets';
import useSearchParams from 'hooks/useSearchParams';
import useScrollPagination from 'hooks/useScrollPagination';

/**
 * @param {WidgetType} widget
 * @param {WidgetActionCreators} actionCreators
 * @param {string?} filterFormName
 * @param {Object?} queryParams
 * @param {boolean?} [withPagination=false]
 * @param {boolean?} [resetOnUnmount=true]
 * @param {boolean?} [loadOnlyIfNecessary=false]
 * @param {boolean?} [statusBar=false]
 * @param {boolean?} [loadOnMount=true]
 * @param {string[]?} loadOnlyFilters
 * @return {{state: WidgetState, dispatch: function}}
 */
const useTable = ({
  widget,
  actionCreators: { getList, resetError, resetList } = {},
  filterFormName,
  queryParams,
  withPagination = false,
  resetOnUnmount = true,
  loadOnlyIfNecessary = false,
  statusBar = false,
  loadOnMount = true,
  loadOnlyFilters,
}) => {
  /**
   * @type {function}
   */
  const dispatch = useDispatch();

  /**
   * @type {WidgetState}
   */
  const state = useSelector(widgetSelector(widget));
  const search = useSearchParams();

  useMount(() => {
    if (!loadOnMount) {
      return;
    }

    if (loadOnlyIfNecessary && state.items) {
      return;
    }

    if (getList) {
      if (isObject(queryParams)) {
        dispatch(getList({ payload: queryParams, extraMeta: { statusBar } }));
      } else if (!filterFormName) {
        dispatch(getList({ extraMeta: { statusBar } }));
      }
    }
  });

  useUnmount(() => {
    if (resetError && resetList) {
      if (resetOnUnmount) {
        dispatch(resetList());
      }
      dispatch(resetError());
    }
  });

  useUpdateEffect(() => {
    if (isString(filterFormName) && getList) {
      if (isArray(loadOnlyFilters) && size(loadOnlyFilters) > 0) {
        if (!find(loadOnlyFilters, (filter) => !has(search, filter))) {
          dispatch(getList({ payload: search, extraMeta: { statusBar } }));
        } else {
          dispatch(resetList());
        }
      } else {
        dispatch(getList({ payload: search, extraMeta: { statusBar } }));
      }
    }
  }, [search]);

  useScrollPagination({
    disable: !withPagination || !state.nextPage,
    callback: () => {
      if (getList && !state.listLoading) {
        dispatch(getList({
          payload: isString(filterFormName) ? { ...search, page: state.page + 1 } : { page: state.page + 1 },
          extraMeta: { incPage: true },
        }));
      }
    },
    page: state.page,
  });

  return { state, dispatch };
};

export default useTable;
