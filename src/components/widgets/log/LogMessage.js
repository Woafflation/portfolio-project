import React, { useState } from 'react';
import { get, size } from 'lodash';
import useMount from 'react-use/lib/useMount';
import { useSelector } from 'react-redux';

import { widgetModalSelector } from 'selectors/widgets/widgets';
import { WidgetType } from 'utils/enums';

const LogMessage = () => {
  const [message, setMessage] = useState(null);
  const modal = useSelector(widgetModalSelector(WidgetType.LOGS));

  useMount(() => {
    const modalMessage = get(modal, `message`);
    if (modalMessage) {
      setMessage(modalMessage);
    }
  });

  if (!message || size(message) === 0) {
    return <span className="text-center mb-10 display-block">Нет сообщения</span>;
  }

  return (
    <div>
      <p className="text-wrap-break-word">{message}</p>
    </div>
  );
};

export default LogMessage;
