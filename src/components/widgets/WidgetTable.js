import React from 'react';
import useDesktopSize from 'hooks/useDesktopSize';
import { isArray, map, size } from 'lodash';
import PropTypes from 'prop-types';

import { Size } from 'utils/enums';

import Preloader from 'components/preloader/Preloader';

const WidgetTable = ({ data, titles, listMapping, error, paginationLoading }) => {
  const desktopSize = useDesktopSize();

  if (!isArray(data)) {
    return null;
  }

  if (size(data) === 0) {
    return <span className="table-content__message">Список пуст</span>;
  }

  return (
    <div className="table-responsive">
      {error && <span className="table-content__message text-danger">{error}</span>}
      <table className="table table-vcenter">
        {desktopSize &&
        <thead>
        <tr>
          {map(titles, ({ title, className = `` }, key) => <th key={key} className={className}>{title}</th>)}
        </tr>
        </thead>
        }
        <tbody>
        {map(data, (item, key) => listMapping({ ...item, desktopSize }, key))}
        {paginationLoading && <tr><td colSpan={size(titles)}><Preloader size={Size.LITTLE} /></td></tr>}
        </tbody>
      </table>
    </div>
  );
};

WidgetTable.propTypes = {
  data: PropTypes.array,
  titles: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
  })).isRequired,
  listMapping: PropTypes.func.isRequired,

  paginationLoading: PropTypes.bool,
  error: PropTypes.string,
};

WidgetTable.defaultValues = {
  paginationLoading: false,
  error: null,
};

export default WidgetTable;
