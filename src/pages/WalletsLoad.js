import React, { useState } from 'react';
import useUnmount from 'react-use/lib/useUnmount';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { size, isArray } from 'lodash';

import { ModalType, WalletsLoadType, WidgetType } from 'utils/enums';
import useSearchParams from 'hooks/useSearchParams';
import useUserHasAccess from 'hooks/useUserHasAccess';
import { walletsLoadActionCreators } from 'actions/widgets/walletsLoad';
import { widgetSelector } from 'selectors/widgets/widgets';
import { walletActionCreators } from 'actions/widgets/wallet';

import PageWrap from 'components/wrappers/PageWrap';
import Header from 'components/header';
import PageContentWrap from 'components/wrappers/PageContentWrap';
import TableContentWrap from 'components/wrappers/tableContentWrap/TableContentWrap';
import WidgetTable from 'components/widgets/WidgetTable';
import WalletsLoadRow from 'components/widgets/walletsLoad/WalletsLoadRow';
import Modal from 'components/widgets/Modal';
import WalletsLoadSettings from 'components/widgets/walletsLoad/WalletsLoadSettings';

const { showModal, getList, resetList } = walletsLoadActionCreators;

const useExtraHeaderButtons = () => {
  const search = useSearchParams();

  const { direction, load_type } = search;
  const withSettings = direction && load_type;

  const headerButtons = [
    {
      children: withSettings ? `Изменить настройки нагрузки` : `Настройки нагрузки`,
      onClick: () => showModal({ type: ModalType.WALLETS_LOAD_SETTINGS }),
    },
  ];
  if (withSettings) {
    headerButtons.push({
      children: <i className="fa fa-times text-danger icon-margin-left"/>,
      className: ``,
      onClick: () => push(`/wallets-load`),
    });
  }

  return headerButtons;
};

/**
 * @param {WalletsLoadType} loadType
 * @return {{title: string}[]}
 */
const getHeadTitles = (loadType) => {
  const baseTitles = [
    {
      title: `ID`,
    },
    {
      title: `Тип`,
    },
    {
      title: `Кошелек`,
    },
  ];

  switch (loadType) {
    case WalletsLoadType.TRANSACTIONS_SUM:
      return [...baseTitles, { title: `Cумма исходящих транзакций` }];
    case WalletsLoadType.TRANSACTIONS_COUNT:
      return [...baseTitles, { title: `Количество исходящих транзакций` }];
    default:
      return [];
  }
};

/**
 * @param {string?} date
 * @return {string}
 */
const dateFormat = (date) => moment(date).format(`DD.MM.YYYY`);

/**
 * @param {Object} search
 * @return {string|React.ReactNode}
 */
const getTitle = (search) => {
  if (!search) {
    return `Список кошельков`;
  }

  const { date_from, date_to, load_type, direction } = search;

  if (load_type && direction) {
    const dateFrom = date_from || moment().subtract(7, `days`);
    const dateTo = date_to || undefined;

    return <span>Период: <b>{dateFormat(dateFrom)} - {dateFormat(dateTo)}</b></span>;
  }

  return `Список кошельков`;
};

const WalletsLoad = () => {
  useUserHasAccess();
  const dispatch = useDispatch();
  const { items, error, currency_symbol } = useSelector(widgetSelector(WidgetType.WALLETS_LOAD));

  const search = useSearchParams();
  const extraHeaderButtons = useExtraHeaderButtons();

  const [title, setTitle] = useState(getTitle(search));

  useUpdateEffect(() => {
    const { direction, load_type } = search;
    if (direction && load_type) {
      dispatch(getList({ payload: search, extraMeta: { statusBar: true } }));
    } else {
      dispatch(resetList());
    }

    setTitle(getTitle(search));
  }, [search]);

  useUnmount(() => {
    dispatch(resetList());
  });

  const listMapping = (item) => (
    <WalletsLoadRow
      key={item.id}
      {...item}
      currency_symbol={currency_symbol}
      onWalletClick={() => walletActionCreators.showModal({ type: ModalType.SHOW, id: item.id })}
    />
  );

  const table = isArray(items) && size(items) > 0 ?
    (
      <WidgetTable
        data={items}
        titles={getHeadTitles(search.load_type)}
        listMapping={listMapping}
        error={error}
      />
    ) :
    <span className="table-content__message">Выберите тип и направление нагрузки</span>;

  return (
    <>
      <PageWrap>
        <Header />
        <PageContentWrap title="Нагрузка кошельков">
          <TableContentWrap
            title={title}
            extraHeaderButtons={extraHeaderButtons}
            withFilters
          >
            {table}
          </TableContentWrap>
        </PageContentWrap>
      </PageWrap>
      <Modal
        widget={WidgetType.WALLETS_LOAD}
        type={ModalType.WALLETS_LOAD_SETTINGS}
        actionCreators={walletsLoadActionCreators}
        title="Настройка просмотра нагрузки"
      >
        <WalletsLoadSettings />
      </Modal>
    </>
  );
};

export default WalletsLoad;
