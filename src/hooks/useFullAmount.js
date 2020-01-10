import { useSelector } from 'react-redux';
import { find, get } from 'lodash';

import { widgetListSelector } from 'selectors/widgets/widgets';
import { WidgetType } from 'utils/enums';

/**
 * @param {string} amount
 * @param {string} currencySymbol
 * @return {string}
 */
const useFullAmount = ({ amount, currencySymbol }) => {
  const currencies = useSelector(widgetListSelector(WidgetType.CURRENCIES));

  const currency = find(currencies, (currency) => get(currency, `symbol`) === currencySymbol);

  return get(currency, `symbol_position`) === `left` ? `${currencySymbol} ${amount}` : `${amount} ${currencySymbol}`;
};

export default useFullAmount;
