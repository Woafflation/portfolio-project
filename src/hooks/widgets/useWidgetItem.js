import { useDispatch, useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';

import { widgetItemSelector } from 'selectors/widgets/widgets';

/**
 * @param {WidgetType} widget
 * @param {WidgetActionCreators} actionCreators
 * @param {number?} id
 */
const useWidgetItem = ({ widget, actionCreators, id }) => {
  const { getItem } = actionCreators;

  const dispatch = useDispatch();

  const item = useSelector(widgetItemSelector(widget));

  useMount(() => {
    if (getItem) {
      dispatch(getItem(id));
    }
  });

  return item;
};

export default useWidgetItem;
