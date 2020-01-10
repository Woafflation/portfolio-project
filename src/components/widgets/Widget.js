import React from 'react';
import { isString, map, size } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useTable from 'hooks/widgets/useTable';
import { tableHeaderExtraButtons } from 'propTypes/widgets';

import PageWrap from 'components/wrappers/PageWrap';
import Header from 'components/header';
import PageContentWrap from 'components/wrappers/PageContentWrap';
import TableContentWrap from 'components/wrappers/tableContentWrap/TableContentWrap';
import Modal from 'components/widgets/Modal';
import WidgetTable from 'components/widgets/WidgetTable';

const Widget = ({
  widget,
  actionCreators,
  pageTitle,
  tableTitle,
  tableHeadTitles,
  listMapping,
  modals,
  extraButtons,
  filterForm,
  filterFormName,
  extraHeaderButtons,
  withPagination,
  statusBar,
  loadListOnMount,
  loadOnlyFilters,
}) => {
  const { state: { listLoading, items, error, paginationLoading }, dispatch } = useTable({
    widget,
    actionCreators,
    filterFormName,
    withPagination,
    statusBar,
    loadOnMount: loadListOnMount,
    loadOnlyFilters,
  });

  return (
    <>
      <PageWrap>
        <Header />
        <PageContentWrap title={pageTitle}>
          <TableContentWrap
            title={tableTitle}
            onRefresh={actionCreators.getList}
            loading={listLoading}
            extraHeaderButtons={extraHeaderButtons}
            withFilters={isString(filterFormName)}
          >
            {size(extraButtons) > 0 &&
            <div className="pb-20 table-control-panel">
              {map(extraButtons, ({
                title,
                onClick,
                withDispatch = true,
                buttonClassName = `btn-alt-primary`,
              }, key) => {
                const clickHandler = () => {
                  if (withDispatch) {
                    dispatch(onClick());
                  } else {
                    onClick();
                  }
                };

                return (
                  <button key={key} className={classNames(`btn`, buttonClassName)} onClick={clickHandler}>
                    {title}
                  </button>
                );
              })}
            </div>
            }
            {filterForm}
            <WidgetTable
              data={items}
              titles={tableHeadTitles}
              listMapping={listMapping}
              error={error}
              paginationLoading={paginationLoading}
            />
          </TableContentWrap>
        </PageContentWrap>
      </PageWrap>
      {map(modals, (modal, key) => <Modal key={key} {...modal} widget={widget} actionCreators={actionCreators} />)}
    </>
  );
};

Widget.propTypes = {
  ...tableHeaderExtraButtons,

  widget: PropTypes.string.isRequired,
  actionCreators: PropTypes.shape().isRequired,
  pageTitle: PropTypes.string.isRequired,
  tableTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  tableHeadTitles: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
  })).isRequired,
  listMapping: PropTypes.func.isRequired,
  filterFormName: PropTypes.string,
  withPagination: PropTypes.bool,
  statusBar: PropTypes.bool,
  loadListOnMount: PropTypes.bool,
  loadOnlyFilters: PropTypes.arrayOf(PropTypes.string),

  extraButtons: PropTypes.arrayOf(PropTypes.shape({
    onClick: PropTypes.func,
    title: PropTypes.string,
    withDispatch: PropTypes.bool,
    buttonClassName: PropTypes.string,
  })),
  modals: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  })),
  filterForm: PropTypes.node,
};

Widget.defaultProps = {
  filterFormName: null,
  withPagination: false,
  statusBar: false,
  loadListOnMount: true,

  extraButtons: [],
  modals: [],
  filterForm: null,
  extraHeaderButtons: [],
};

export default Widget;
