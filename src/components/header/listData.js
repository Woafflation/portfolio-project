import { includes } from 'lodash';
import { Permission } from 'utils/enums';

/**
 * @param {any} permissions
 * @return {Object[]}
 */
const listData = (permissions) => [
  {
    title: `Мои прокси`,
    path: `/proxies`,
    className: `si si-globe`,
    main: true,
    hasAccess: includes(permissions, Permission.PROXY_LIST),
  },
  {
    title: `Мои кошельки`,
    path: `/wallets`,
    className: `si si-wallet`,
    main: true,
    hasAccess: includes(permissions, Permission.WALLET_LIST),
  },
  {
    title: `Транзакции`,
    path: `/transactions`,
    className: `si si-pie-chart`,
    main: true,
    hasAccess: includes(permissions, Permission.TRANSACTION) || includes(permissions, Permission.TRANSACTION_CLIENT),
  },
  {
    title: `Транзакции`,
    path: `/transactions-only-by-id`,
    className: `si si-pie-chart`,
    main: true,
    hasAccess:
      includes(permissions, Permission.TRANSACTION_ONLY_BY_ID) && !includes(permissions, Permission.TRANSACTION),
  },
  {
    title: `Настройки`,
    path: `/settings`,
    className: `si si-settings`,
    main: false,
    hasAccess: true,
  },
  {
    title: `Накопления`,
    path: `/stockpiling`,
    className: `si si-layers`,
    main: false,
    hasAccess: true,
  },
  {
    title: `Постбеки`,
    path: `/postback`,
    className: `fa fa-send-o`,
    main: false,
    hasAccess: true,
  },
  {
    title: `Нагрузка`,
    path: `/wallets-load`,
    className: `fa fa-bar-chart`,
    main: false,
    hasAccess: includes(permissions, Permission.WALLETS_LOAD),
  },
  {
    title: `Логи`,
    path: `/logs`,
    className: `si si-direction`,
    main: false,
    hasAccess: includes(permissions, Permission.LOGS),
  },
  {
    title: `Роли`,
    path: `/roles`,
    className: `fa fa-address-book-o`,
    main: false,
    hasAccess: includes(permissions, Permission.RBAC),
  },
  {
    title: `Пользователи`,
    path: `/users`,
    className: `fa fa-address-book`,
    main: false,
    hasAccess: includes(permissions, Permission.RBAC),
  },
  {
    title: `Отключенные кошельки`,
    path: `/disabled-wallets`,
    className: `si si-wallet`,
    main: false,
    hasAccess: includes(permissions, Permission.WALLETS_DISABLED),
  },
  {
    title: `Возможные транзакции`,
    path: `/possible-transactions`,
    className: `si si-pie-chart`,
    main: false,
    hasAccess: includes(permissions, Permission.TRANSACTION_MANAGEMENT),
  },
  {
    title: `Предтранзакции`,
    path: `/preliminary-transactions`,
    className: `si si-pie-chart`,
    main: false,
    hasAccess: includes(permissions, Permission.TRANSACTION_MANAGEMENT),
  },
];

export default listData;
