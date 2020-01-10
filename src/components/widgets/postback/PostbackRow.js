import React from 'react';
import PropTypes from 'prop-types';
import { ModalType, StatusCode } from 'utils/enums';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { postbackActionCreators } from 'actions/widgets/postback';

const PostbackRow = ({
  id,
  url,
  status_code,
  response,
  status,
  created_at,
}) => {
  const dispatch = useDispatch();

  const statusColors = {
    'text-danger': status_code !== StatusCode.OK,
    'text-success': status_code === StatusCode.OK,
  };

  const isPostbackSend = status === 1 ? <i className="fa fa-check"/> : null;

  const statusView = <span className={classNames(statusColors)}>{status_code}</span>;
  const viewRequestBody = (
    <button
      className="btn btn-sm btn-secondary"
      onClick={() => dispatch(postbackActionCreators.showModal({ type: ModalType.SHOW, id }))}
    >
      Request Body
    </button>
  );

  return (
    <>
      <tr>
        <th className="text-center" scope="row">{id}</th>
        <td>{url}</td>
        <td>{statusView}</td>
        <td>{response}</td>
        <td>{isPostbackSend}</td>
        <td>{created_at}</td>
        <td>{viewRequestBody}</td>
      </tr>
    </>
  );
};

PostbackRow.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  status_code: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  response: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};

export default PostbackRow;
