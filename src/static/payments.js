import { WalletType } from 'utils/enums';

export const paymentSystemList = [
  {
    value: null,
    text: ``,
  },
  {
    value: WalletType.PAY_TM,
    text: `Paytm`,
  },
  {
    value: WalletType.SKRILL,
    text: `Skrill`,
  },
  {
    value: WalletType.NETELLER,
    text: `Neteller`,
  },
  {
    value: WalletType.PERFECT_MONEY,
    text: `Perfect money`,
  },
  {
    value: WalletType.EPAY,
    text: `Epay`,
  },
  {
    value: WalletType.HELP_2_PAY,
    text: `Help2Pay`,
  },
  {
    value: WalletType.CERTUS_FINANCE,
    text: `Certus finance`,
  },
  {
    value: WalletType.BANK_DIRECT,
    text: `Bank direct`,
  },
  {
    value: WalletType.UPI,
    text: `Upi`,
  },
  {
    value: WalletType.BKASH,
    text: `bKash`,
  },
  {
    value: WalletType.DUSUPAY,
    text: `Dusupay`,
  },
];
