import { WidgetType } from 'utils/enums';
import { roleSelectionSelector } from 'selectors/widgets/role';

const state = {
  widgets: {
    [WidgetType.ROLES]: {
      items: [{
        id: 1,
        name: `Some role`,
      }],
    },
  },
};

describe(`Role selectors`, () => {
  it(`roleSelectionSelector()`, () => {
    expect(roleSelectionSelector(state)).toEqual([{
      value: 1,
      text: `Some role`,
    }]);
  });
});
