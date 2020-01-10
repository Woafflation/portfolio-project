import React, { useState } from 'react';
import { get, isNumber, find } from 'lodash';
import useMount from 'react-use/lib/useMount';
import { useDispatch, useSelector } from 'react-redux';

import { widgetListSelector, widgetModalSelector } from 'selectors/widgets/widgets';
import { ModalType, WidgetType } from 'utils/enums';
import { preliminaryTransactionsActionCreators } from 'actions/widgets/transactions/preliminaryTransactions';

const { hideModal, remove } = preliminaryTransactionsActionCreators;

const PreliminaryTransactionDelete = () => {
  const dispatch = useDispatch();

  const [pretransaction, setPretransaction] = useState(null);
  const pretransactionList = useSelector(widgetListSelector(WidgetType.PRELIMINARY_TRANSACTIONS));
  const modal = useSelector(widgetModalSelector(WidgetType.PRELIMINARY_TRANSACTIONS));

  useMount(() => {
    const modalId = get(modal, `id`);
    if (isNumber(modalId)) {
      const pretransactionItem = find(pretransactionList, ({ primary_id }) => primary_id === modalId);
      if (pretransactionItem) {
        setPretransaction(pretransactionItem);
      }
    }
  });

  return (
    <div>
      <span>Вы действительно хотите удалить предтранзакцию?</span>
      <div className="flex flex-row mt-10">
        <button
          onClick={() => {
            dispatch(remove(pretransaction.primary_id));
            dispatch(hideModal({ type: ModalType.DELETE_PRELIMINARY_TRANSACTION }));
          }}
          className="btn btn-sm btn-primary mr-20"
        >
          Да
        </button>
        <button
          onClick={() => dispatch(hideModal({ type: ModalType.DELETE_PRELIMINARY_TRANSACTION }))}
          className="btn btn-sm btn-danger"
        >
          Нет
        </button>
      </div>
    </div>
  );
};

export default PreliminaryTransactionDelete;
