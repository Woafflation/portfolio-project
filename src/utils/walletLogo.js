import { WalletType } from 'utils/enums';

import payTmImg from 'assets/media/logos/paytm.png';
import skrillImg from 'assets/media/logos/skrill.png';
import netellerImg from 'assets/media/logos/neteller.png';
import perfectMoneyImg from 'assets/media/logos/perfect-money.svg';
import epayImg from 'assets/media/logos/epay.svg';
import help2PayImg from 'assets/media/logos/help2pay.svg';
import cercusFinance from 'assets/media/logos/certus-finance.png';
import bankDirect from 'assets/media/logos/bank-direct.png';
import upi from 'assets/media/logos/upi.svg';
import bkash from 'assets/media/logos/bkash.svg';
import dusupay from 'assets/media/logos/dusupay.svg';

const walletLogo = {
  [WalletType.PAY_TM]: payTmImg,
  [WalletType.SKRILL]: skrillImg,
  [WalletType.NETELLER]: netellerImg,
  [WalletType.PERFECT_MONEY]: perfectMoneyImg,
  [WalletType.EPAY]: epayImg,
  [WalletType.HELP_2_PAY]: help2PayImg,
  [WalletType.CERTUS_FINANCE]: cercusFinance,
  [WalletType.BANK_DIRECT]: bankDirect,
  [WalletType.UPI]: upi,
  [WalletType.BKASH]: bkash,
  [WalletType.DUSUPAY]: dusupay,
};

export default walletLogo;
