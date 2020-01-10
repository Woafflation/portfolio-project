import React from 'react';
import PropTypes from 'prop-types';
import 'components/innerTable/innerTable.css';

const InnerTable = (props) => {
  const { children, cellClassName } = props;

  return (
    <tr>
      <td className="no-padding no-border">
        <div className={cellClassName}>
          <table className="table inner-table">
            <tbody>
            {children}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
};

InnerTable.propTypes = {
  children: PropTypes.node,
  cellClassName: PropTypes.string,
};

InnerTable.defaultProps = {
  children: null,
  cellClassName: ``,
};

export default InnerTable;