import { WidgetType } from 'utils/enums';
import { permissionSelectionSelector } from 'selectors/widgets/permission';

const state = {
  widgets: {
    [WidgetType.PERMISSIONS]: {
      items: [{
        id: 1,
        name: `Payment settings`,
      }],
    },
  },
};

describe(`Permission selectors`, () => {
  it(`permissionSelectionSelector()`, () => {
    expect(permissionSelectionSelector(state)).toEqual([{
      value: 1,
      text: `Payment settings`,
    }]);
  });
});
