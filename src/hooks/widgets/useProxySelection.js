import useTable from 'hooks/widgets/useTable';
import { ProxyStatus, WidgetType } from 'utils/enums';
import { proxyActionCreators } from 'actions/widgets/proxy';
import { useEffect, useState } from 'react';
import { filter, isArray, isNumber, map, toNumber } from 'lodash';

/**
 * @param {*[]} list
 * @param {number|null} [currentProxy=null]
 * @return {ISelect[]}
 */
const convertToOptionList = (list, currentProxy = null) => {
  const filtered = filter(list, ({ status, id }) => {
    return status === ProxyStatus.SUCCESS || (isNumber(currentProxy) && id === currentProxy);
  });

  return map(filtered, ({ id, ip, port, status }) => (
    { value: toNumber(id), text: `${ip}:${port}${status === ProxyStatus.ERROR ? ` (не работает)` : ``}` }
  ));
};

/**
 * @return {ISelect[]}
 */
const useProxySelection = () => {
  const [proxySelection, setProxySelection] = useState(null);

  const { state: { items } } = useTable({
    widget: WidgetType.PROXIES,
    actionCreators: proxyActionCreators,
  });

  useEffect(() => {
    if (isArray(items)) {
      setProxySelection(convertToOptionList(items));
    }
  }, [items]);

  return proxySelection;
};

export default useProxySelection;
