import moment from 'moment';
import { DASHBOARD_DATA_SUCCEEDED, DASHBOARD_LOADED_ALL_DATA, DASHBOARD_RESET } from 'actionTypes';

export const dashboardInitState = {
  data: {
    [moment().format(`YYYY-MM-DD`)]: {
      ingoing_transactions_sum: 0,
      ingoing_transactions_count: 0,
      outgoing_transactions_sum: 0,
      paytm_transactions_count: 0,
      skrill_transactions_count: 0,
      neteller_transactions_count: 0,
    },
  },
  total_wallets_balance: 0,
  active_proxies_count: 0,
  total_proxies_count: 0,
  active_wallets_count: 0,
  total_wallets_count: 0,
  loadedAllData: false,
};

const dashboard = (state = dashboardInitState, { type, payload }) => {
  switch (type) {
    case DASHBOARD_DATA_SUCCEEDED:
      return { ...state, ...payload };
    case DASHBOARD_LOADED_ALL_DATA:
      return { ...state, loadedAllData: true };
    case DASHBOARD_RESET:
      return dashboardInitState;
    default:
      return state;
  }
};

export default dashboard;
