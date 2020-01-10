import React, { useState } from 'react';
import { map, get, isNumber, find, size } from 'lodash';
import useMount from 'react-use/lib/useMount';
import { useSelector } from 'react-redux';

import { widgetListSelector, widgetModalSelector } from 'selectors/widgets/widgets';
import { WidgetType } from 'utils/enums';

const RoleList = () => {
  const [roles, setRoles] = useState(null);
  const userList = useSelector(widgetListSelector(WidgetType.USERS));
  const modal = useSelector(widgetModalSelector(WidgetType.USERS));

  useMount(() => {
    const modalId = get(modal, `id`);
    if (isNumber(modalId)) {
      const user = find(userList, ({ id }) => id === modalId);
      const roles = get(user, `roles`);
      if (roles) {
        setRoles(roles);
      }
    }
  });

  if (!roles || size(roles) === 0) {
    return <span className="text-center mb-10 display-block">Нет ролей</span>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-borderless table-vcenter">
        <tbody>
        {map(roles, ({ id, name }) => (
          <tr key={id}>
            <td>{name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;
