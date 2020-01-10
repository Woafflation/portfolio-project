import { WidgetType } from 'utils/enums';
import { paytmParsingTypesSelector } from 'selectors/widgets/paytmParsingTypes';

const state = {
  widgets: {
    [WidgetType.PAYTM_PARSING_TYPES]: {
      items: [`test`, `test2`],
    },
  },
};

describe(`Paytm parsing types selectors`, () => {
  it(`paytmParsingTypesSelector()`, () => {
    expect(paytmParsingTypesSelector(state)).toEqual([
      { value: `test`, text: `test` },
      { value: `test2`, text: `test2` },
    ]);
  });
});
