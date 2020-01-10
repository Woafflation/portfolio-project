/**
 * @typedef {{
 *   itemsLabel?: string,
 *   itemLabel?: string,
 *   withPagination?: boolean,
 * }} WidgetLabels
 */

/**
 * @typedef {{
 *   labels?: WidgetLabels,
 *   widget: WidgetType,
 *   updateForm?: string,
 *   createForm?: string,
 *   getExtraListPayload?: function(payload: *): Object,
 *   successCreationCallback?: function(data: *)
 *
 *   incPage?: boolean
 *   statusBar?: boolean
 * }} WidgetActionMetaData
 */

/**
 * @typedef {{
 *   type: string,
 *   payload: *,
 *   meta: WidgetActionMetaData,
 * }} WidgetAction
 */

/**
 * @typedef {{
 *   type: ModalType,
 *   id?: number,
 *   submitting?: boolean,
 * }} WidgetModal
 */

/**
 * @typedef {{
 *   items: *[]|null,
 *   item: *|null,
 *   total: number,
 *   listLoading: boolean,
 *   itemLoading: boolean,
 *   error: string|Object|null,
 *   modalError: string|Object|null
 *   modal: WidgetModal|null
 *   page: number,
 *   nextPage: boolean,
 *   showCreationModalAfterCreating: boolean,
 * }} WidgetState
 */

/**
 * @typedef {{
 *  getList: function({payload: *, extraMeta: Object}?),
 *  setError: function,
 *  getItem: function,
 *  setItem: function,
 *  update: function,
 *  updateItem: function,
 *  create: function,
 *  resetError: function,
 *  remove: function,
 *  setPage: function,
 *  showModal: function,
 *  hideModal: function,
 *  resetList: function,
 *  setAnyData: function,
 *  showCreationModalAfterCreating: function,
 * }} WidgetActionCreators
 */

/**
 * @typedef {{
 *   submitText: string,
 *   fields?: FieldProps[] only for CREATE_MODAL,
 *   getFields?: function(data: Object): FieldProps[] only for UPDATE_MODAL
 *   actionCreators: WidgetActionCreators,
 *   widget?: WidgetType,
 *   itemAdapter?: function(item: Object): Object,
 * }} WidgetModalForm
 */

/**
 * @typedef {{
 *   actionTypes: Set<string>,
 *   reducer: function(state: Object, action: WidgetAction): Object
 * }} WidgetExtraData
 */
