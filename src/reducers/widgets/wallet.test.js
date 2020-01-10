import { MARK_WALLET_AS_ACTIVE_SUCCEEDED } from 'actionTypes';
import { WalletStatus } from 'utils/enums';
import wallet from 'reducers/widgets/wallet';

const { reducer } = wallet;

const state = {
  items: [
    {
      id: 1,
      status: WalletStatus.ERROR,
    },
    {
      id: 2,
      status: WalletStatus.ERROR,
    },
  ],
};

describe(`Wallet reducer`, () => {
  it(MARK_WALLET_AS_ACTIVE_SUCCEEDED, () => {
    expect(reducer(state, { type: MARK_WALLET_AS_ACTIVE_SUCCEEDED, payload: 1 })).toEqual({
      ...state,
      items: [
        {
          id: 1,
          status: WalletStatus.OK,
        },
        {
          id: 2,
          status: WalletStatus.ERROR,
        },
      ],
    });
  });
});
