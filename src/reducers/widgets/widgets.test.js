import {
  WIDGET_CREATE_SUCCEEDED, WIDGET_ITEM_FAILED,
  WIDGET_ITEM_REQUESTED,
  WIDGET_ITEM_SUCCEEDED, WIDGET_LIST_FAILED,
  WIDGET_LIST_REQUESTED, WIDGET_LIST_RESET,
  WIDGET_LIST_SUCCEEDED, WIDGET_REMOVE_SUCCEEDED,
  WIDGET_RESET_ERROR,
  WIDGET_RESET_MODAL, WIDGET_RESET_MODAL_ERROR,
  WIDGET_SET_ERROR,
  WIDGET_SET_MODAL, WIDGET_SET_MODAL_ERROR, WIDGET_SET_MODAL_SUBMITTING_STATUS,
  WIDGET_LIST_ITEM_UPDATE_SUCCEEDED, WIDGET_SET_ANY_DATA, WIDGET_SET_ITEM, WIDGET_SHOW_CREATION_MODAL_AFTER_CREATING,
} from 'actionTypes';
import { widgetDefaultState, widgetReducer } from 'reducers/widgets/widgets';
import { proxyPayloadLabels } from 'actions/widgets/proxy';
import { ModalType } from 'utils/enums';
import { transactionPayloadLabels } from 'actions/widgets/transactions/transactions';

/**
 * @param {string} type
 * @param {*} payload
 * @return {WidgetAction}
 */
const getAction = (type, payload = {}) => ({
  type,
  payload,
  meta: { labels: proxyPayloadLabels },
});

/**
 * @type {WidgetState}
 */
const state = {
  ...widgetDefaultState,
  items: [
    {
      id: 2,
      name: `test`,
    },
    {
      id: 3,
      name: `test`,
    },
  ],
  modal: {
    id: 1,
    type: ModalType.UPDATE,
    submitting: false,
  },
};

describe(`Widget reducer`, () => {
  it(`${WIDGET_LIST_REQUESTED} without pagination`, () => {
    expect(widgetReducer(state, getAction(WIDGET_LIST_REQUESTED)))
      .toEqual({ ...state, listLoading: true });
  });

  it(`${WIDGET_LIST_REQUESTED} with pagination`, () => {
    expect(widgetReducer(state, { type: WIDGET_LIST_REQUESTED, meta: { incPage: true } }))
      .toEqual({ ...state, listLoading: true, paginationLoading: true });
  });

  it(WIDGET_LIST_RESET, () => {
    expect(widgetReducer(state, getAction(WIDGET_LIST_RESET)))
      .toEqual({ ...state, items: null, nextPage: false, page: 1 });
  });

  it(`${WIDGET_LIST_SUCCEEDED} without pagination`, () => {
    const payload = {
      proxies: [
        {
          id: 1,
          name: `test`,
        },
      ],
    };

    expect(widgetReducer(state, getAction(WIDGET_LIST_SUCCEEDED, payload)))
      .toEqual({ ...state, items: payload.proxies, listLoading: false });
  });

  it(`${WIDGET_LIST_SUCCEEDED} with pagination`, () => {
    const payload = {
      transactions: {
        data: [
          {
            id: 1,
            name: `test`,
          },
        ],
        next_page_url: `someNextPage`,
        page: 1,
      },
    };

    expect(widgetReducer(
      state,
      { type: WIDGET_LIST_SUCCEEDED, payload, meta: { labels: transactionPayloadLabels, incPage: true } },
    ))
      .toEqual({
        ...state,
        items: [
          {
            id: 2,
            name: `test`,
          },
          {
            id: 3,
            name: `test`,
          },
          ...payload.transactions.data,
        ],
        listLoading: false,
        nextPage: true,
        page: 2,
        paginationLoading: false,
      });
  });

  it(WIDGET_LIST_FAILED, () => {
    const payload = `testError`;

    expect(widgetReducer(state, getAction(WIDGET_LIST_FAILED, payload)))
      .toEqual({ ...state, error: payload, listLoading: false });
  });

  it(WIDGET_ITEM_REQUESTED, () => {
    expect(widgetReducer(state, getAction(WIDGET_ITEM_REQUESTED)))
      .toEqual({ ...state, item: null, itemLoading: true });
  });

  it(WIDGET_ITEM_SUCCEEDED, () => {
    const payload = {
      proxy: {
        id: 1,
        name: `test`,
      },
    };

    expect(widgetReducer(state, getAction(WIDGET_ITEM_SUCCEEDED, payload)))
      .toEqual({ ...state, item: payload.proxy, itemLoading: false });
  });

  it(WIDGET_ITEM_FAILED, () => {
    const payload = `testError`;

    expect(widgetReducer(state, getAction(WIDGET_ITEM_FAILED, payload)))
      .toEqual({ ...state, modalError: payload, itemLoading: false });
  });

  it(WIDGET_SET_ITEM, () => {
    expect(widgetReducer(state, getAction(WIDGET_SET_ITEM, 2)))
      .toEqual({ ...state, item: { id: 2, name: `test` } });

    expect(widgetReducer(state, getAction(WIDGET_SET_ITEM)))
      .toEqual({ ...state, item: null });

    expect(widgetReducer(state, getAction(WIDGET_SET_ITEM, 9999)))
      .toEqual({ ...state, item: null });
  });

  it(WIDGET_SET_MODAL, () => {
    /**
     * @type {WidgetModal}
     */
    const payload = {
      type: ModalType.SHOW,
      id: 1,
    };

    expect(widgetReducer(state, getAction(WIDGET_SET_MODAL, payload)))
      .toEqual({ ...state, modal: { ...payload, submitting: false } });
  });

  it(WIDGET_RESET_MODAL, () => {
    expect(widgetReducer(state, getAction(WIDGET_RESET_MODAL)))
      .toEqual({ ...state, modal: null });
  });

  it(WIDGET_SET_ERROR, () => {
    const error = `testError`;

    expect(widgetReducer(state, getAction(WIDGET_SET_ERROR, error)))
      .toEqual({ ...state, error });
  });

  it(WIDGET_RESET_ERROR, () => {
    expect(widgetReducer(state, getAction(WIDGET_RESET_ERROR)))
      .toEqual({ ...state, error: null });
  });

  it(WIDGET_SET_MODAL_ERROR, () => {
    const modalError = `testError`;

    expect(widgetReducer(state, getAction(WIDGET_SET_MODAL_ERROR, modalError)))
      .toEqual({ ...state, modalError });
  });

  it(WIDGET_RESET_MODAL_ERROR, () => {
    expect(widgetReducer(state, getAction(WIDGET_RESET_MODAL_ERROR)))
      .toEqual({ ...state, modalError: null });
  });

  it(WIDGET_CREATE_SUCCEEDED, () => {
    const payload = {
      proxy: {
        id: 1,
        name: `test`,
      },
    };

    expect(widgetReducer(widgetDefaultState, getAction(WIDGET_CREATE_SUCCEEDED, payload)))
      .toEqual({ ...widgetDefaultState, items: [payload.proxy] });

    expect(widgetReducer(state, getAction(WIDGET_CREATE_SUCCEEDED, payload)))
      .toEqual({ ...state, items: [payload.proxy, ...state.items] });
  });

  it(WIDGET_LIST_ITEM_UPDATE_SUCCEEDED, () => {
    const payload = {
      proxy: {
        id: 2,
        name: `test2`,
      },
    };
    expect(widgetReducer(state, getAction(WIDGET_LIST_ITEM_UPDATE_SUCCEEDED, payload)))
      .toEqual({ ...state, items: [payload.proxy, { id: 3, name: `test` }] });
  });

  it(WIDGET_REMOVE_SUCCEEDED, () => {
    const payload = 2;
    expect(widgetReducer(state, getAction(WIDGET_REMOVE_SUCCEEDED, payload)))
      .toEqual({ ...state, items: [{ id: 3, name: `test` }] });
  });

  it(WIDGET_SET_MODAL_SUBMITTING_STATUS, () => {
    expect(widgetReducer(state, getAction(WIDGET_SET_MODAL_SUBMITTING_STATUS, true)))
      .toEqual({
        ...state,
        modal: {
          id: 1,
          type: ModalType.UPDATE,
          submitting: true,
        },
      });

    expect(widgetReducer(state, getAction(WIDGET_SET_MODAL_SUBMITTING_STATUS, false)))
      .toEqual({
        ...state,
        modal: {
          id: 1,
          type: ModalType.UPDATE,
          submitting: false,
        },
      });

    const emptyModalState = { modal: null };

    expect(widgetReducer(emptyModalState, getAction(WIDGET_SET_MODAL_SUBMITTING_STATUS, false)))
      .toEqual({
        ...emptyModalState,
        modal: null,
      });
  });

  it(WIDGET_SHOW_CREATION_MODAL_AFTER_CREATING, () => {
    expect(widgetReducer(state, getAction(WIDGET_SHOW_CREATION_MODAL_AFTER_CREATING, true)))
      .toEqual({
        ...state,
        showCreationModalAfterCreating: true,
      });
  });

  it(WIDGET_SET_ANY_DATA, () => {
    expect(widgetReducer(state, getAction(WIDGET_SET_ANY_DATA, { some: `value` })))
      .toEqual({
        ...state,
        some: `value`,
      });

    expect(widgetReducer(state, getAction(WIDGET_SET_ANY_DATA, 1))).toEqual(state);

    expect(widgetReducer(state, getAction(WIDGET_SET_ANY_DATA, `1`))).toEqual(state);
  });
});
