import { TransactionFakeStatus, PreliminaryTransactionStatus } from 'utils/enums';

export const transactionFakeStatusList = [
  {
    value: null,
    text: ``,
  },
  {
    value: TransactionFakeStatus.NO_FAKE,
    text: `Не фейковые`,
  },
  {
    value: TransactionFakeStatus.FAKE,
    text: `Фейковые`,
  },
];

export const preliminaryTransactionStatusList = [
  {
    value: null,
    text: ``,
  },
  {
    value: PreliminaryTransactionStatus.NEW,
    text: `Новые`,
  },
  {
    value: PreliminaryTransactionStatus.PROCESSED,
    text: `Обработанные`,
  },
];
