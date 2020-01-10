/**
 * @enum {string}
 */
export const WalletType = {
  PAY_TM: `paytm`,
  SKRILL: `skrill`,
  NETELLER: `neteller`,
  PERFECT_MONEY: `perfect_money`,
  EPAY: `epay`,
  HELP_2_PAY: `help2pay`,
  CERTUS_FINANCE: `certus_fin`,
  BANK_DIRECT: `bank_direct`,
  UPI: `upi`,
  BKASH: `bkash`,
  DUSUPAY: `dusupay`,
};

export const WalletStatus = {
  ERROR: 0,
  OK: 1,
  DISABLED: 2,
};

export const WalletError = {
  PROXY_CONNECT: `ProxyConnectionError`,
  EMAIL_AUTH: `EmailAuthError`,
  ACCOUNT_AUTH: `AccountAuthError`,
  TRANSACTION_PARSING: `TransactionParsingError`,
};

/**
 * @enum {number}
 */
export const ProxyStatus = {
  ERROR: 0,
  SUCCESS: 1,
  CHECKING: 2,
};

export const TransactionStatus = {
  NOT_ACTIVATED: 0,
  ACTIVATED: 1,
  PENDING: 3,
  IN_PROCESSING: 4,
  CRASHED: 5,
  CANCELED: 6,
  REFUSED: 7,
};

export const TransactionFakeStatus = {
  NO_FAKE: 0,
  FAKE: 1,
};

export const StatusCode = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
};

export const PluginColorScheme = {
  LIGHT: `light`,
  DARK: `dark`,
  WHITE_GREEN: `white-green`,
};

export const Size = {
  MINI: 0,
  LITTLE: 1,
  MIDDLE: 2,
  BIG: 3,
};

export const PostbackSendStatus = {
  NO_SEND: 0,
  SEND: 1,
};

/**
 * @enum {number}
 */
export const ModalType = {
  CREATE: 0,
  UPDATE: 1,
  SHOW: 2,
  WALLET_SELECTION: 3,
  WALLETS_LOAD_SETTINGS: 4,
  PERMISSION_LIST: 5,
  ROLE_LIST: 6,
  SMS_CONFIRM: 7,
  MINIMUM_DEPOSIT_LIST: 8,
  LOG_MESSAGE: 9,
  DELETE_PRELIMINARY_TRANSACTION: 10,
};

/**
 * @enum {string}
 */
export const WidgetType = {
  PROXIES: `proxies`,
  WALLETS: `wallets`,
  CURRENCIES: `currencies`,
  TRANSACTIONS: `transactions`,
  POSSIBLE_TRANSACTIONS: `possible-transactions`,
  PRELIMINARY_TRANSACTIONS: `preliminary-transactions`,
  TRANSACTIONS_ONLY_BY_ID: `transactions-only-by-id`,
  STOCKPILING_LIST: `stockpiling-list`,
  POSTBACKS: `postbacks`,
  WALLETS_LOAD: `wallets-load`,
  LOGS: `logs`,
  PLUGIN: `plugin`,
  ROLES: `roles`,
  USERS: `users`,
  PERMISSIONS: `permissions`,
  PAYTM_PARSING_TYPES: `paytm-parsing-types`,
  WALLET_PAYTM: `wallet-paytm`,
};

/**
 * @enum {number}
 */
export const AuthStatus = {
  LOGGED_IN: 0,
  CHECKING: 1,
  GUEST: 2,
};

/**
 * @enum {string}
 */
export const WalletsLoadType = {
  TRANSACTIONS_COUNT: `transactions_count`,
  TRANSACTIONS_SUM: `transactions_sum`,
};

/**
 * @enum {number}
 */
export const FieldType = {
  INPUT: 0,
  CHECKBOX_GROUP: 1,
};

/**
 * @enum {string}
 */
export const Permission = {
  PAYMENT_SETTINGS: `payment.settings`,
  PLUGIN_SETTINGS: `payment-plugin.settings`,
  WALLET_CREATE: `wallet.create`,
  WALLET_UPDATE: `wallet.update`,
  WALLET_DELETE: `wallet.delete`,
  WALLET_SET_ACTIVE: `wallet.set-active`,
  PROXY_CREATE: `proxy.create`,
  PROXY_UPDATE: `proxy.update`,
  PROXY_DELETE: `proxy.delete`,
  PROXY_CHECK: `proxy.check`,
  RBAC: `rbac.all`,
  TRANSACTION: `transaction.list`,
  TRANSACTION_ONLY_BY_ID: `transaction.list-only-with-transaction-id`,
  DASHBOARD: `dashboard.all`,
  TRANSACTION_MANAGEMENT: `transaction.transaction-manager`,
  TRANSACTION_FAKE: `transaction.generate-fake-transaction`,
  WALLET_LIST: `wallet.list`,
  PROXY_LIST: `proxy.list`,
  LOGS: `logs`,
  WALLETS_LOAD: `wallets.load`,
  WALLETS_DISABLED: `disabled.wallets`,
  TRANSACTION_CLIENT: `transaction.client`,
  DASHBOARD_CLIENT: `dashboard.client`,
  PLUGIN_SETTINGS_CLIENT: `payment-plugin.settings.client`,
};

/**
 * @enum {number}
 */
export const FiltersGridType = {
  FLEX: 0,
  GRID: 1,
};

/**
 * @enum {number}
 */
export const PreliminaryTransactionStatus = {
  NEW: 0,
  PROCESSED: 1,
};

/**
 * @enum {number}
 */
export const TransactionLeadingStatus = {
  NOT_ACTIVATED: 0,
  ACTIVATED: 1,
  REJECTED: 2,
  PENDING: 3,
  IN_PROCESSING: 4,
  FAILURE: 5,
  CANCELED: 6,
};
