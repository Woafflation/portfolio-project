import { dashboardSelector } from 'selectors/dashboard';

const state = {
  dashboard: {
    active_wallets_count: 12,
    total_wallets_count: 8,
    loadedAllData: true,
  },
};

describe(`Dashboard selectors`, () => {
  it(`dashboardSelector`, () => {
    expect(dashboardSelector(state)).toEqual(state.dashboard);
  });
});
