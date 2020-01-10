import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { roleActionCreators } from 'actions/widgets/rbac/role';
import { ModalType } from 'utils/enums';

import InnerTable from 'components/innerTable/InnerTable';

const { remove, showModal } = roleActionCreators;

const Control = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <div className="btn-group">
      <button type="button"
              className="btn btn-sm btn-secondary js-tooltip-enabled"
              onClick={() => dispatch(showModal({ type: ModalType.UPDATE, id }))}
      >
        <i className="fa fa-pencil"/>
      </button>
      <button type="button"
              className="btn btn-sm btn-secondary js-tooltip-enabled"
              onClick={() => dispatch(remove(id))}
      >
        <i className="fa fa-trash"/>
      </button>
    </div>
  );
};

Control.propTypes = {
  id: PropTypes.number.isRequired,
};

const RoleRow = ({ id, name, description, desktopSize }) => {
  const dispatch = useDispatch();

  const rightsButton = (
    <button
      onClick={() => dispatch(showModal({ type: ModalType.PERMISSION_LIST, id }))}
      className="btn btn-sm btn-secondary"
    >
      Смотреть права
    </button>
  );

  return (
    desktopSize ?

      <tr>
        <td>{name}</td>
        <td>{description}</td>
        <td>{rightsButton}</td>
        <td>
          <Control id={id} />
        </td>
      </tr> :

      <InnerTable cellClassName="mobile-inner-table">
        <tr className="first-mobile-row">
          <td>Название</td>
          <td>{name}</td>
        </tr>
        <tr className="first-mobile-row">
          <td>Описание</td>
          <td>{description}</td>
        </tr>
        <tr className="first-mobile-row">
          <td>Права</td>
          <td>{rightsButton}</td>
        </tr>
        <tr>
          <td>Действия</td>
          <td>
            <Control id={id} />
          </td>
        </tr>
      </InnerTable>
  );
};

RoleRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  desktopSize: PropTypes.bool.isRequired,
};

export default RoleRow;
