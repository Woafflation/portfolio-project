import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';

import { widgetItemSelector, widgetModalSelector } from 'selectors/widgets/widgets';

/**
 * @param {ReactComponent} Component
 * @param {WidgetType} widget
 * @param {WidgetActionCreators} actionCreators
 * @return {function(*): ReactNode}
 */
const withShowWidget = (Component, { widget, actionCreators }) => {
  const { getItem } = actionCreators;

  return (props) => {
    const item = useSelector(widgetItemSelector(widget));
    const modal = useSelector(widgetModalSelector(widget));
    const dispatch = useDispatch();

    useMount(() => {
      if (modal && modal.id && getItem) {
        dispatch(getItem(modal.id));
      }
    });

    if (!item) {
      return null;
    }

    return <Component {...props} {...item} />;
  };
};

export default withShowWidget;
