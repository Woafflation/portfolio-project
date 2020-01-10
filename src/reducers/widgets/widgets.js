import { map, filter, get, isNumber, find, isArray, isObject, isString, size } from 'lodash';

import {
  WIDGET_RESET_ERROR,
  WIDGET_RESET_MODAL,
  WIDGET_SET_ERROR,
  WIDGET_SET_MODAL,
  WIDGET_CREATE_REQUESTED,
  WIDGET_CREATE_SUCCEEDED,
  WIDGET_LIST_REQUESTED,
  WIDGET_LIST_SUCCEEDED,
  WIDGET_REMOVE_REQUESTED,
  WIDGET_REMOVE_SUCCEEDED,
  WIDGET_LIST_ITEM_UPDATE_REQUESTED,
  WIDGET_LIST_ITEM_UPDATE_SUCCEEDED,
  WIDGET_SET_PAGE,
  WIDGET_ITEM_REQUESTED,
  WIDGET_ITEM_SUCCEEDED,
  WIDGET_LIST_FAILED,
  WIDGET_ITEM_FAILED,
  WIDGET_SET_MODAL_ERROR,
  WIDGET_RESET_MODAL_ERROR,
  WIDGET_SET_MODAL_SUBMITTING_STATUS,
  WIDGET_LIST_RESET, WIDGET_SET_ANY_DATA, WIDGET_SET_ITEM, WIDGET_SHOW_CREATION_MODAL_AFTER_CREATING,
} from 'actionTypes';

import proxy from './proxy';
import wallet from './wallet';
import transaction from './transaction';

/**
 * @type {Set<string>}
 */
const widgetActions = new Set([
  WIDGET_LIST_REQUESTED,
  WIDGET_LIST_SUCCEEDED,
  WIDGET_LIST_FAILED,
  WIDGET_LIST_RESET,
  WIDGET_SET_MODAL,
  WIDGET_RESET_MODAL,
  WIDGET_SHOW_CREATION_MODAL_AFTER_CREATING,
  WIDGET_SET_ERROR,
  WIDGET_RESET_ERROR,
  WIDGET_CREATE_REQUESTED,
  WIDGET_CREATE_SUCCEEDED,
  WIDGET_REMOVE_REQUESTED,
  WIDGET_REMOVE_SUCCEEDED,
  WIDGET_LIST_ITEM_UPDATE_REQUESTED,
  WIDGET_LIST_ITEM_UPDATE_SUCCEEDED,
  WIDGET_SET_PAGE,
  WIDGET_ITEM_REQUESTED,
  WIDGET_ITEM_SUCCEEDED,
  WIDGET_ITEM_FAILED,
  WIDGET_SET_ITEM,
  WIDGET_SET_MODAL_ERROR,
  WIDGET_SET_MODAL_SUBMITTING_STATUS,
  WIDGET_RESET_MODAL_ERROR,
  WIDGET_SET_ANY_DATA,
]);

/**
 * @type WidgetState
 */
export const widgetDefaultState = {
  items: null,
  listLoading: false,
  itemLoading: false,
  error: null,
  modalError: null,
  modal: null,
  page: 1,
  nextPage: false,
  paginationLoading: false,
  showCreationModalAfterCreating: false,
};

/**
 * @param {WidgetState} state
 * @param {string} type
 * @param {*} payload
 * @param {WidgetLabels} labels
 * @param {boolean} incPage
 * @param {function(payload: *): Object} getExtraListPayload
 * @returns {WidgetState}
 */
export const widgetReducer = (
  state = widgetDefaultState,
  { type, payload = {}, meta: { labels = {}, incPage = false, getExtraListPayload } },
) => {
  switch (type) {
    case WIDGET_LIST_REQUESTED:
      return { ...state, listLoading: true, paginationLoading: incPage };
    case WIDGET_LIST_SUCCEEDED:
      const extraListPayload = getExtraListPayload ? getExtraListPayload(payload) : {};

      if (labels.withPagination) {
        const data = get(payload, `[${labels.itemsLabel}].data`);

        return {
          ...state,
          ...extraListPayload,
          items: incPage && isArray(data) ? [...state.items, ...data] : data,
          nextPage: !!get(payload, `[${labels.itemsLabel}].next_page_url`),
          page: incPage ? state.page + 1 : 1,
          paginationLoading: false,
          listLoading: false,
        };
      }

      return { ...state, ...extraListPayload, listLoading: false, items: payload[labels.itemsLabel] };
    case WIDGET_LIST_RESET:
      return { ...state, items: null, nextPage: false, page: 1, paginationLoading: false };
    case WIDGET_LIST_FAILED:
      return { ...state, error: payload, listLoading: false, paginationLoading: false };
    case WIDGET_ITEM_REQUESTED:
      return { ...state, itemLoading: true, item: null };
    case WIDGET_ITEM_SUCCEEDED:
      return { ...state, itemLoading: false, item: payload[labels.itemLabel] };
    case WIDGET_SET_ITEM:
      return { ...state, item: find(state.items, (item) => get(item, `id`) === payload) || null };
    case WIDGET_ITEM_FAILED:
      return { ...state, modalError: payload, itemLoading: false };
    case WIDGET_SET_MODAL:
      return { ...state, modal: { ...payload, submitting: false } };
    case WIDGET_SHOW_CREATION_MODAL_AFTER_CREATING:
      return { ...state, showCreationModalAfterCreating: payload };
    case WIDGET_SET_MODAL_SUBMITTING_STATUS:
      return { ...state, modal: state.modal ? { ...state.modal, submitting: payload } : null };
    case WIDGET_RESET_MODAL:
      return { ...state, modal: null };
    case WIDGET_SET_ERROR:
      return { ...state, error: payload };
    case WIDGET_RESET_ERROR:
      return { ...state, error: null };
    case WIDGET_SET_MODAL_ERROR:
      return { ...state, modalError: payload };
    case WIDGET_RESET_MODAL_ERROR:
      return { ...state, modalError: null };
    case WIDGET_CREATE_SUCCEEDED:
      const createdItem = get(payload, `${labels.itemLabel}`);

      if (createdItem) {
        return { ...state, items: state.items ? [createdItem, ...state.items] : [createdItem] };
      }

      return { ...state, error: `Creating item failed. item is not defined.` };
    case WIDGET_LIST_ITEM_UPDATE_SUCCEEDED:
      const id = get(payload, `${labels.itemLabel}.id`);
      const updatedItem = get(payload, `${labels.itemLabel}`);

      if (updatedItem && (isNumber(id) || (isString(id) && size(id) > 0))) {
        return { ...state, items: map(state.items, (item) => item.id === id ? { ...item, ...updatedItem } : item) };
      }

      return { ...state, error: `Updating item failed. id is not defined.` };
    case WIDGET_REMOVE_SUCCEEDED:
      return {
        ...state,
        items: filter(state.items, (item) => item.primary_id ? item.primary_id !== payload : item.id !== payload),
      };
    case WIDGET_SET_PAGE:
      return { ...state, page: payload };
    case WIDGET_SET_ANY_DATA:
      return isObject(payload) ? { ...state, ...payload } : state;
    default:
      return state;
  }
};

/**
 * @type {WidgetExtraData[]}
 */
const extraWidgets = [proxy, wallet, transaction];

/**
 * @param {Object<WidgetState>} state
 * @param {WidgetAction} action
 * @return {Object<WidgetState>}
 */
export const widgets = (state = {}, action) => {
  const widget = get(action, `meta.widget`);

  if (widget) {
    if (widgetActions.has(action.type)) {
      return { ...state, [widget]: widgetReducer(state[widget], action) };
    } else {
      const widgetData = find(extraWidgets, ({ actionTypes }) => actionTypes.has(action.type));
      if (widgetData) {
        return { ...state, [widget]: widgetData.reducer(state[widget], action) };
      }
    }
  }

  return state;
};
