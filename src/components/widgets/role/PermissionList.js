import React, { useState } from 'react';
import { map, get, isNumber, find, size } from 'lodash';
import useMount from 'react-use/lib/useMount';
import { useSelector } from 'react-redux';

import { widgetListSelector, widgetModalSelector } from 'selectors/widgets/widgets';
import { WidgetType } from 'utils/enums';

const PermissionList = () => {
  const [permissions, setPermissions] = useState(null);
  const roleList = useSelector(widgetListSelector(WidgetType.ROLES));
  const modal = useSelector(widgetModalSelector(WidgetType.ROLES));

  useMount(() => {
    const modalId = get(modal, `id`);
    if (isNumber(modalId)) {
      const role = find(roleList, ({ id }) => id === modalId);
      const permissions = get(role, `permissions`);
      if (permissions) {
        setPermissions(permissions);
      }
    }
  });

  if (!permissions || size(permissions) === 0) {
    return <span className="text-center mb-10 display-block">Нет прав</span>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-borderless table-vcenter">
        <tbody>
        {map(permissions, ({ id, name }) => (
          <tr key={id}>
            <td>{name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionList;
