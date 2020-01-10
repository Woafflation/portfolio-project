import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { userActionCreators } from 'actions/widgets/rbac/user';
import { ModalType } from 'utils/enums';

import InnerTable from 'components/innerTable/InnerTable';

const { remove, showModal } = userActionCreators;

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

const UserRow = ({ id, name, created_at, updated_at, desktopSize }) => {
  const dispatch = useDispatch();

  const rolesButton = (
    <button
      onClick={() => dispatch(showModal({ type: ModalType.ROLE_LIST, id }))}
      className="btn btn-sm btn-secondary"
    >
      Смотреть роли
    </button>
  );

  return (
    desktopSize ?

      <tr>
        <td>{name}</td>
        <td>{created_at}</td>
        <td>{updated_at}</td>
        <td>{rolesButton}</td>
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
          <td>Создан</td>
          <td>{created_at}</td>
        </tr>
        <tr className="first-mobile-row">
          <td>Последнее обновление</td>
          <td>{updated_at}</td>
        </tr>
        <tr className="first-mobile-row">
          <td>Роли</td>
          <td>{rolesButton}</td>
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

UserRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  desktopSize: PropTypes.bool.isRequired,
};

export default UserRow;
