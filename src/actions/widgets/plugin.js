import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';
import { PLUGIN_FORM_NAME } from 'utils/constants';

/**
 * @type {WidgetLabels}
 */
export const pluginPayloadLabels = { itemLabel: `params` };

/**
 * @type {WidgetActionCreators}
 */
export const pluginActionCreators = widgetActionCreators({
  widget: WidgetType.PLUGIN,
  labels: pluginPayloadLabels,
  updateForm: PLUGIN_FORM_NAME,
});
