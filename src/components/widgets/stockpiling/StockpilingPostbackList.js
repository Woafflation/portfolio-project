import React from 'react';
import { map, size, get } from 'lodash';
import { useSelector } from 'react-redux';

import useTable from 'hooks/widgets/useTable';
import { WidgetType } from 'utils/enums';
import { postbackActionCreators } from 'actions/widgets/postback';
import { widgetModalSelector } from 'selectors/widgets/widgets';

import StockpilingPostbackRow from 'components/widgets/stockpiling/StockpilingPostbackRow';

const StockpilingPostbackList = () => {
  const modal = useSelector(widgetModalSelector(WidgetType.STOCKPILING_LIST));

  const { state: { items } } = useTable({
    widget: WidgetType.POSTBACKS,
    actionCreators: postbackActionCreators,
    queryParams: { stockpiling_id: get(modal, `id`) },
  });

  if (size(items) === 0) {
    return <span className="table-content__message">Список постбеков пуст</span>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-vcenter table-padding">
        <thead>
        <tr>
          <th className="font-w600">ID</th>
          <th className="font-w600">Url</th>
          <th className="font-w600">Status code</th>
          <th className="font-w600">Response</th>
          <th className="font-w600">Status</th>
          <th className="font-w600">Created at</th>
          <th className="font-w600">Request body</th>
        </tr>
        </thead>
        <tbody>
        {map(items, (item) => <StockpilingPostbackRow key={item.id} {...item} />)}
        </tbody>
      </table>
    </div>
  );
};

export default StockpilingPostbackList;
