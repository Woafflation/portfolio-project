import React from 'react';

import Widget from 'components/widgets/Widget';

/**
 * @typedef {{
 *   widget: WidgetType,
 *   actionCreators: WidgetActionCreators,
 *   pageTitle: string,
 *   tableTitle: string,
 *   tableHeadTitles: {title: string, className?: string}[],
 *   listMapping: function(item: *, key: number): React.ReactNode,
 *   filterFormName?: boolean,
 *   withPagination?: boolean,
 *   statusBar?: boolean,
 *
 *   extraButtons?: {title: string, onClick: function, withDispatch?: boolean}[],
 *   modals?: {type: ModalType, children: React.ReactNode, title: string, size?: Size, dataSelector?: OutputSelector}[],
 *   filterForm?: React.ReactNode,
 *   extraHeaderButtons?: {children: React.ReactNode, onClick: function, className?: string, withDispatch?: boolean}[]
 * }} PageTableProps
 */

/**
 * @param {PageTableProps} props
 * @return {function(): React.Component}
 */
const createWidget = (props) => () => <Widget {...props} />;

export default createWidget;
