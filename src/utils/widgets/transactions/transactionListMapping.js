import React from 'react';

import TransactionRow from 'components/widgets/transaction/TransactionRow';

const transactionListMapping = (item) => <TransactionRow key={item.primary_id} {...item}/>;

export default transactionListMapping;
