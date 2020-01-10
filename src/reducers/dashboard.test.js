import { DASHBOARD_DATA_SUCCEEDED, DASHBOARD_LOADED_ALL_DATA, DASHBOARD_RESET } from 'actionTypes';
import dashboard, { dashboardInitState } from 'reducers/dashboard';

describe(`Dashboard reducer`, () => {
  it(DASHBOARD_DATA_SUCCEEDED, () => {
    const payload = {
      active_wallets_count: 12,
      total_wallets_count: 8,
    };
    expect(dashboard(undefined, { type: DASHBOARD_DATA_SUCCEEDED, payload }))
      .toEqual({ ...dashboardInitState, ...payload });
  });

  it(DASHBOARD_LOADED_ALL_DATA, () => {
    expect(dashboard(undefined, { type: DASHBOARD_LOADED_ALL_DATA }))
      .toEqual({ ...dashboardInitState, loadedAllData: true });
  });

  it(DASHBOARD_RESET, () => {
    expect(dashboard(undefined, { type: DASHBOARD_RESET }))
      .toEqual(dashboardInitState);
  });
});
