import {
  WIDGET_LIST_REQUESTED,
  WIDGET_SET_PAGE,
  WIDGET_ITEM_REQUESTED,
  WIDGET_SET_ERROR,
  WIDGET_RESET_ERROR,
  WIDGET_LIST_ITEM_UPDATE_REQUESTED,
  WIDGET_CREATE_REQUESTED,
  WIDGET_REMOVE_REQUESTED,
  WIDGET_SET_MODAL,
  WIDGET_RESET_MODAL,
  WIDGET_LIST_RESET,
  WIDGET_ITEM_UPDATE_REQUESTED,
  WIDGET_SET_ANY_DATA,
  WIDGET_SET_ITEM,
  WIDGET_SHOW_CREATION_MODAL_AFTER_CREATING,
} from 'actionTypes';

/**
 * @param {WidgetActionMetaData} meta
 * @return {function(type: string): function(payload: *, extraMeta?: WidgetActionMetaData): Action}
 */
export const createWidgetAction = (meta) => (type) => (payload, extraMeta) => ({
  type,
  payload,
  meta: { ...meta, ...extraMeta },
});

/**
 * @param {WidgetActionMetaData} meta
 * @return {WidgetActionCreators}
 */
const widgetActionCreators = (meta) => {
  const actionCreator = createWidgetAction(meta);

  return {
    // Todo: change to actionCreator()
    getList: ({ payload, extraMeta = {} } = {}) => {
      return ({ type: WIDGET_LIST_REQUESTED, payload, meta: { ...meta, ...extraMeta } });
    },
    setPage: actionCreator(WIDGET_SET_PAGE),
    getItem: actionCreator(WIDGET_ITEM_REQUESTED),
    setItem: actionCreator(WIDGET_SET_ITEM),
    setError: actionCreator(WIDGET_SET_ERROR),
    resetError: actionCreator(WIDGET_RESET_ERROR),
    update: actionCreator(WIDGET_LIST_ITEM_UPDATE_REQUESTED),
    updateItem: actionCreator(WIDGET_ITEM_UPDATE_REQUESTED),
    create: actionCreator(WIDGET_CREATE_REQUESTED),
    remove: actionCreator(WIDGET_REMOVE_REQUESTED),
    showModal: actionCreator(WIDGET_SET_MODAL),
    showCreationModalAfterCreating: actionCreator(WIDGET_SHOW_CREATION_MODAL_AFTER_CREATING),
    hideModal: actionCreator(WIDGET_RESET_MODAL),
    resetList: actionCreator(WIDGET_LIST_RESET),
    setAnyData: actionCreator(WIDGET_SET_ANY_DATA),
  };
};

export default widgetActionCreators;
