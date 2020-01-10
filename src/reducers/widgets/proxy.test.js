import { PROXY_CHECK_FAILED, PROXY_CHECK_REQUESTED, PROXY_CHECK_SUCCEEDED } from 'actionTypes';
import proxy from './proxy';
import { ProxyStatus } from 'utils/enums';

const { reducer } = proxy;

const state = {
  items: [
    {
      id: 1,
      status: ProxyStatus.SUCCESS,
    },
    {
      id: 2,
      status: ProxyStatus.ERROR,
    },
  ],
};

describe(`Proxy reducer`, () => {
  it(PROXY_CHECK_REQUESTED, () => {
    expect(reducer(state, { type: PROXY_CHECK_REQUESTED, payload: 1 })).toEqual({
      ...state,
      items: [
        {
          id: 1,
          status: ProxyStatus.CHECKING,
        },
        {
          id: 2,
          status: ProxyStatus.ERROR,
        },
      ],
    });
  });

  it(PROXY_CHECK_SUCCEEDED, () => {
    expect(reducer(state, { type: PROXY_CHECK_SUCCEEDED, payload: 2 })).toEqual({
      ...state,
      items: [
        {
          id: 1,
          status: ProxyStatus.SUCCESS,
        },
        {
          id: 2,
          status: ProxyStatus.SUCCESS,
        },
      ],
    });
  });

  it(PROXY_CHECK_FAILED, () => {
    expect(reducer(state, { type: PROXY_CHECK_FAILED, payload: 1 })).toEqual({
      ...state,
      items: [
        {
          id: 1,
          status: ProxyStatus.ERROR,
        },
        {
          id: 2,
          status: ProxyStatus.ERROR,
        },
      ],
    });
  });
});
