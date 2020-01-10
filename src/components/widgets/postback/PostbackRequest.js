import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isNumber, get, find } from 'lodash';

import { widgetSelector } from 'selectors/widgets/widgets';
import { WidgetType } from 'utils/enums';

/**
 * @param {Object|null} modal
 * @param {Object[]|null} items
 * @return {null|string}
 */
const getRequestBody = ({ modal, items }) => {
  const id = get(modal, `id`);
  if (!isNumber(id)) {
    return null;
  }

  const item = find(items, (postback) => postback.id === id);

  return item && item.request_body ? item.request_body : null;
};

const PostbackRequest = () => {
  const { modal, items } = useSelector(widgetSelector(WidgetType.POSTBACKS));

  const [request_body] = useState(getRequestBody({ modal, items }));

  return (
    <div className="table-responsive mb-20">
      <table className="table table-striped table-borderless table-vcenter">
        <tbody>
        <tr>
          <td className="font-w600">REQUEST BODY</td>
          <td className="text-muted">{request_body}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PostbackRequest;
