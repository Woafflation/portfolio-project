import {
  widgetFieldSelector,
  widgetItemSelector, widgetListSelector,
  widgetModalSelector,
  widgetModalSubmittingSelector,
  widgetSelector,
} from 'selectors/widgets/widgets';
import { ModalType, WidgetType } from 'utils/enums';

/**
 * @type {RootState}
 */
const state = {
  widgets: {
    [WidgetType.PROXIES]: {
      items: [
        {
          id: 1,
          name: `test`,
        },
      ],
      modal: {
        type: ModalType.SHOW,
        id: 1,
        submitting: false,
      },
      item: {
        id: 1,
        name: `test`,
      },
    },
    [WidgetType.WALLET_PAYTM]: {
      some: `data`,
    },
  },
};

describe(`Widget selectors`, () => {
  it(`widgetSelector()`, () => {
    expect(widgetSelector(WidgetType.PROXIES)(state)).toEqual(state.widgets[WidgetType.PROXIES]);
  });

  it(`widgetModalSelector()`, () => {
    expect(widgetModalSelector(WidgetType.PROXIES)(state)).toEqual(state.widgets[WidgetType.PROXIES].modal);
  });

  it(`widgetItemSelector()`, () => {
    expect(widgetItemSelector(WidgetType.PROXIES)(state)).toEqual(state.widgets[WidgetType.PROXIES].item);
  });

  it(`widgetModalSubmittingSelector()`, () => {
    expect(widgetModalSubmittingSelector(WidgetType.PROXIES)(state))
      .toEqual(state.widgets[WidgetType.PROXIES].modal.submitting);
  });

  it(`widgetListSelector()`, () => {
    expect(widgetListSelector(WidgetType.PROXIES)(state)).toEqual(state.widgets[WidgetType.PROXIES].items);
  });

  it(`widgetFieldSelector()`, () => {
    expect(widgetFieldSelector(WidgetType.WALLET_PAYTM, `some`)(state))
      .toBe(state.widgets[WidgetType.WALLET_PAYTM].some);
  });
});
