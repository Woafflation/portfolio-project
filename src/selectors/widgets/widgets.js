import { createSelector } from 'reselect';
import { get } from 'lodash';

import { widgetDefaultState } from 'reducers/widgets/widgets';

/**
 * @param {WidgetType} widget
 * @return {function(RootState): WidgetState|{}}
 */
export const widgetSelector = (widget) => (state) => {
  return state && state.widgets && state.widgets[widget] ? state.widgets[widget] : widgetDefaultState;
};

/**
 * @param {WidgetType} widget
 * @return {OutputSelector<RootState, WidgetState, WidgetModal|null>}
 */
export const widgetModalSelector = (widget) => createSelector(
  widgetSelector(widget),
  ({ modal }) => modal || null,
);

/**
 * @param {WidgetType} widget
 * @return {OutputSelector<RootState, WidgetState, Object|null>}
 */
export const widgetItemSelector = (widget) => createSelector(
  widgetSelector(widget),
  ({ item }) => item || null,
);

/**
 * @param {WidgetType} widget
 * @return {OutputSelector<RootState, WidgetState, Object|null>}
 */
export const widgetItemIdSelector = (widget) => createSelector(
  widgetItemSelector(widget),
  (item) => get(item, `id`),
);

export const widgetModalSubmittingSelector = (widget) => createSelector(
  widgetModalSelector(widget),
  (modal) => get(modal, `submitting`),
);

/**
 * @param {WidgetType} widget
 * @return {OutputSelector<RootState, WidgetState, Object[]|null>}
 */
export const widgetListSelector = (widget) => createSelector(
  widgetSelector(widget),
  ({ items }) => items || null,
);

/**
 * @param {WidgetType} widget
 * @param {string} path
 * @return {OutputSelector<RootState, WidgetState, Object[]|null>}
 */
export const widgetFieldSelector = (widget, path) => createSelector(
  widgetSelector(widget),
  (data) => get(data, path),
);
