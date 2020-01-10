import React from 'react';
import useMount from 'react-use/lib/useMount';
import { getFormValues, reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';
import { get } from 'lodash';

import getSubmitHandler from 'utils/filters/getSubmitHandler';
import { walletsLoadActionCreators } from 'actions/widgets/walletsLoad';
import useSearchParams from 'hooks/useSearchParams';
import { getFilledDateRange } from 'utils';
import { WalletsLoadType } from 'utils/enums';

import ModalForm from 'components/widgets/ModalForm';

const FORM_NAME = `wallets-load-settings`;

const onSubmit = getSubmitHandler(
  `/wallets-load`,
  {
    reduxCallbacks: [walletsLoadActionCreators.hideModal],
    dateFields: [{ name: `date_range`, fromName: `date_from`, toName: `date_to` }],
  },
);

const TRANSACTION_DIRECTIONS = [
  {
    value: null,
    text: ``,
  },
  {
    value: `outgoing`,
    text: `Уход`,
  },
  {
    value: `ingoing`,
    text: `Приход`,
  },
];

const LOAD_TYPES = [
  {
    value: null,
    text: ``,
  },
  {
    value: WalletsLoadType.TRANSACTIONS_COUNT,
    text: `Количество`,
  },
  {
    value: WalletsLoadType.TRANSACTIONS_SUM,
    text: `Сумма`,
  },
];

const WalletsLoadSettings = ({ initialize, ...props }) => {
  const search = useSearchParams();
  const values = useSelector(getFormValues(FORM_NAME));

  const fields = [
    {
      name: `direction`,
      type: `select`,
      data: TRANSACTION_DIRECTIONS,
      label: `Направление`,
      required: true,
    },
    {
      name: `load_type`,
      type: `select`,
      data: LOAD_TYPES,
      label: `Вид нагрузки`,
      required: true,
    },
    {
      name: `date_range`,
      fromValue: get(values, `date_range.values.startDate`),
      toValue: get(values, `date_range.values.endDate`),
      type: `date`,
      label: `Период`,
    },
  ];

  useMount(() => {
    const { date_from, date_to, direction, load_type } = search;
    if (direction && load_type) {
      initialize({ date_range: getFilledDateRange(date_from, date_to), direction, load_type });
    }
  });

  return <ModalForm {...props} onSubmit={onSubmit} fields={fields} formName={FORM_NAME} submitText="Выбрать" />;
};

export default reduxForm({ form: FORM_NAME })(WalletsLoadSettings);
