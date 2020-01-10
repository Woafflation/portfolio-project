import { currencySelectionSelector } from 'selectors/widgets/currency';
import { WidgetType } from 'utils/enums';

const state = {
  widgets: {
    [WidgetType.CURRENCIES]: {
      items: [{
        id: 1,
        code: `USD`,
        symbol: `$`,
      }],
    },
  },
};

describe(`Currency selectors`, () => {
  it(`currencySelectionSelector()`, () => {
    expect(currencySelectionSelector(state)).toEqual([{
      value: `USD`,
      text: `$`,
    }]);
  });
});
