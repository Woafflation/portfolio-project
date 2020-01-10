import React from 'react';

import { ModalType, Size, WidgetType } from 'utils/enums';
import { postbackActionCreators } from 'actions/widgets/postback';

import createWidget from 'componentCreators/widgets/createWidget';
import PostbackRow from 'components/widgets/postback/PostbackRow';
import PostbackRequest from 'components/widgets/postback/PostbackRequest';

const Postbacks = createWidget({
  widget: WidgetType.POSTBACKS,
  actionCreators: postbackActionCreators,
  pageTitle: `Отправленные постбеки`,
  tableTitle: `Список отправленных постбеков`,
  tableHeadTitles: [
    {
      title: `ID`,
    },
    {
      title: `Url`,
    },
    {
      title: `Status_code`,
    },
    {
      title: `Response`,
    },
    {
      title: `Status`,
    },
    {
      title: `Created_at`,
    },
    {
      title: ``,
    },
  ],
  listMapping: (item, key) => <PostbackRow {...item} key={key}/>,
  modals: [
    {
      type: ModalType.SHOW,
      title: `Ваш постбек`,
      size: Size.BIG,
      children: <PostbackRequest />,
    },
  ],
  withPagination: true,
  statusBar: true,
});

export default Postbacks;
