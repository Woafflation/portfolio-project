import { WidgetType } from 'utils/enums';
import { transactionCSVLoadingSelector } from 'selectors/widgets/transaction';

const state = {
  widgets: {
    [WidgetType.TRANSACTIONS]: {
      csvLoading: false,
    },
  },
};

describe(`Role selectors`, () => {
  it(`roleSelectionSelector()`, () => {
    expect(transactionCSVLoadingSelector(state)).toBe(state.widgets[WidgetType.TRANSACTIONS].csvLoading);

    expect(transactionCSVLoadingSelector({})).toBe(false);
  });
});
