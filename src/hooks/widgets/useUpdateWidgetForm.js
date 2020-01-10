import { useDispatch, useSelector } from 'react-redux';
import { widgetItemSelector, widgetModalSelector } from 'selectors/widgets/widgets';
import { useState } from 'react';
import useMount from 'react-use/lib/useMount';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';
import { get } from 'lodash';

/**
 * @param {WidgetType} widget
 * @param {function(data: Object): FieldProps[]?} getFields
 * @param {WidgetActionCreators} actionCreators
 * @param {function(data: Object)} initialize
 * @param {function(item: Object): Object} itemAdapter
 * @param {boolean?} [setFromList=false]
 * @return {{submitting: boolean, onSubmit: function, fields: FieldProps[], item: Object|null}}
 */
const useUpdateWidgetForm = ({ widget, getFields, actionCreators, initialize, itemAdapter, setFromList = false }) => {
  const { getItem, update, setItem } = actionCreators;

  const item = useSelector(widgetItemSelector(widget));
  const modal = useSelector(widgetModalSelector(widget));
  const dispatch = useDispatch();

  const [fields, setFields] = useState([]);

  useMount(() => {
    if (modal && modal.id) {
      if (setFromList) {
        dispatch(setItem(modal.id));
      } else if (getItem) {
        dispatch(getItem(modal.id));
      }
      if (getFields) {
        setFields(getFields(item));
      }
    }
  });

  useUpdateEffect(() => {
    if (getFields) {
      setFields(getFields(item));
    }
  }, [getFields]);

  useUpdateEffect(() => {
    if (item) {
      initialize(itemAdapter(item));
    }
  }, [item]);

  /**
   * @param {Object} values
   */
  const onSubmit = (values) => dispatch(update({ id: get(modal, `id`), ...values }));

  const submitting = get(modal, `submitting`) || false;

  return { onSubmit, fields, submitting, item };
};

export default useUpdateWidgetForm;
