import './widgets';
import './proxies';
import './auth';
import './form';

/**
 * @typedef {{type: string, payload: *}} IAction
 */

/**
 * @typedef {{
 *   auth: AuthState,
 *   widgets: WidgetState,
 *   router: Object,
 *   form: Object,
 *   loadingBar: Object,
 * }} RootState
 */

/**
 * @typedef {{value: string|number, text: string, extra: string|number}} ISelect
 */
