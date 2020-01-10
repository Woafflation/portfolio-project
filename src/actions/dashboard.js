import { DASHBOARD_DATA_REQUESTED, DASHBOARD_RESET } from 'actionTypes';

export const fetchDashboardData = () => ({ type: DASHBOARD_DATA_REQUESTED });

export const dashboardReset = () => ({ type: DASHBOARD_RESET });
