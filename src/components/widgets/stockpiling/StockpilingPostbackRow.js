import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { StatusCode } from 'utils/enums';

const StockpilingPostbackRow = ({ id, url, status_code, response, status, created_at, request_body }) => {
  const [showRequestBody, setShowRequestBody] = useState(false);

  const statusColors = {
    'text-danger': status_code !== StatusCode.OK,
    'text-success': status_code === StatusCode.OK,
  };

  const statusView = <span className={classNames(statusColors)}>{status_code}</span>;
  const viewRequestBody = (
    <button className="btn btn-sm btn-secondary" onClick={() => setShowRequestBody(!showRequestBody)}>
      Request Body
    </button>
  );

  return (
    <>
      <tr>
        <td className="text-center">{id}</td>
        <td>{url}</td>
        <td className="text-center">{statusView}</td>
        <td>{response}</td>
        <td className="text-center">{status}</td>
        <td>{created_at}</td>
        <td>{viewRequestBody}</td>
      </tr>
      {showRequestBody &&
      <tr>
        <td colSpan="7">
          <div className="table-padding">{request_body}</div>
        </td>
      </tr>
      }
    </>
  );
};

StockpilingPostbackRow.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  status_code: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  response: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};

export default StockpilingPostbackRow;
