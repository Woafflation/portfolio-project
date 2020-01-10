import React from 'react';

import { reduxForm } from 'redux-form';

import { ModalType, Size, WidgetType } from 'utils/enums';
import { stockpilingListActionCreators } from 'actions/widgets/stockpiling';
import createWidget from 'componentCreators/widgets/createWidget';
import getSubmitHandler from 'utils/filters/getSubmitHandler';
import { widgetListSelector } from 'selectors/widgets/widgets';

import StockpilingRow from 'components/widgets/stockpiling/StockpilingRow';
import Filters from 'components/widgets/filters/Filters';
import StockpilingPostbackList from 'components/widgets/stockpiling/StockpilingPostbackList';

const { showModal } = stockpilingListActionCreators;

const FORM_NAME = `stockpiling-list-form`;

const FilterForm = reduxForm({
  form: FORM_NAME,
  onSubmit: getSubmitHandler(
    `/stockpiling`,
    { dateFields: [{ name: `date_range`, fromName: `date_from`, toName: `date_to` }] },
  ),
})(Filters);

const rightFilterFields = [
  {
    name: `date_range`,
    type: `date`,
  },
];

const filterDateFields = [
  {
    from: `date_from`,
    to: `date_to`,
    name: `date_range`,
  },
];

const StockpilingList = createWidget({
  widget: WidgetType.STOCKPILING_LIST,
  actionCreators: stockpilingListActionCreators,
  filterFormName: FORM_NAME,
  pageTitle: `Накопления`,
  tableTitle: `Список накоплений`,
  tableHeadTitles: [
    {
      title: `ID`,
    },
    {
      title: `Сумма накоплений`,
    },
    {
      title: `Label`,
    },
    {
      title: `Дата формирования`,
    },
    {
      title: `Постбек отправлен`,
    },
    {
      title: ``,
    },
  ],
  listMapping: (item) => (
    <StockpilingRow key={item.id} {...item} onShowClick={() => showModal({ type: ModalType.SHOW, id: item.id })}/>
  ),
  filterForm: <FilterForm formName={FORM_NAME} rightFields={rightFilterFields} dateFields={filterDateFields} />,
  modals: [
    {
      type: ModalType.SHOW,
      title: `Список постбеков`,
      children: <StockpilingPostbackList />,
      size: Size.BIG,
      dataSelector: widgetListSelector(WidgetType.POSTBACKS),
    },
  ],
  withPagination: true,
  statusBar: true,
});

export default StockpilingList;
