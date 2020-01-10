import React from 'react';
import { map } from 'lodash';
import { Switch, Route } from 'react-router-dom';

import userIsAuthenticated from 'routes/userIsAuthenticated';
import userIsAnonymous from 'routes/userIsAnonymous';

import Dashboard from 'pages/dashboard/Dashboard';
import Proxies from 'pages/proxies/Proxies';
import Login from 'pages/Login';
import Wallets from 'pages/wallets/Wallets';
import Transactions from 'pages/transactions/Transactions';
import StockpilingList from 'pages/StockpilingList';
import WalletsLoad from 'pages/WalletsLoad';
import Postbacks from 'pages/Postbacks';
import Logs from 'pages/logs/Logs';
import Settings from 'pages/Settings';
import NotFoundPage from 'pages/errorPages/NotFoundPage';
import Roles from 'pages/Roles';
import Users from 'pages/Users';
import NoPermissionsPage from 'pages/errorPages/NoPermissionsPage';
import TransactionsOnlyById from 'pages/transactions/TransactionsOnlyById';
import PossibleTransactions from 'pages/transactions/PossibleTransactions';
import PreliminaryTransactions from 'pages/transactions/PreliminaryTransactions';

/**
 * @typedef {{path: string, component: React.Component, exact?: boolean}} Route
 */

/**
 * @type {Route[]}
 */
let appRoutes = [
  {
    path: `/`,
    component: Dashboard,
    exact: true,
  },
  {
    path: `/wallets`,
    component: Wallets,
  },
  {
    path: `/wallets-load`,
    component: WalletsLoad,
  },
  {
    path: `/proxies`,
    component: Proxies,
  },
  {
    path: `/transactions`,
    component: Transactions,
  },
  {
    path: `/transactions-only-by-id`,
    component: TransactionsOnlyById,
  },
  {
    path: `/possible-transactions`,
    component: PossibleTransactions,
  },
  {
    path: `/preliminary-transactions`,
    component: PreliminaryTransactions,
  },
  {
    path: `/settings`,
    component: Settings,
  },
  {
    path: `/stockpiling`,
    component: StockpilingList,
  },
  {
    path: `/postback`,
    component: Postbacks,
  },
  {
    path: `/logs`,
    component: Logs,
  },
  {
    path: `/roles`,
    component: Roles,
  },
  {
    path: `/users`,
    component: Users,
  },
  {
    path: `/disabled-wallets`,
    component: Wallets,
  },
];

appRoutes = map(appRoutes, (item) => ({ ...item, component: userIsAuthenticated(item.component) }));

/**
 * @type {Route[]}
 */
const routes = [
  ...appRoutes,
  {
    path: `/login`,
    component: userIsAnonymous(Login),
  },
  {
    path: `/no-permissions`,
    component: NoPermissionsPage,
  },
  {
    path: `*`,
    component: NotFoundPage,
  },
];

const Root = () => (
  <Switch>
    {map(routes, (route, key) => <Route key={key} {...route} />)}
  </Switch>
);

export default Root;
