export const LOAD_LOADS = 'app/LoadsPage/LOAD_LOADS';
export const LOAD_LOADS_SUCCESS = 'app/LoadsPage/LOAD_LOADS_SUCCESS';
export const LOAD_LOADS_ERROR = 'app/LoadsPage/LOAD_LOADS_ERROR';

export const DEFAULT_PAGE_SIZE = 20;

export const TRANSACTION_STATUS = [
  {
    id: 'CANCELLED',
    name: 'Cancelled',
  },
  {
    id: 'NOT_PROCESSED',
    name: 'Not Processed',
  },
  {
    id: 'PENDING',
    name: 'Pending',
  },
  {
    id: 'NOT_PROCESSING',
    name: 'Not Processing',
  },
  {
    id: 'PROCESSED',
    name: 'Processed',
  },
  {
    id: 'HOLDING',
    name: 'Holding',
  },
];

export const LOAD_TYPE = [
  {
    id: 'WIRE',
    name: 'Wire',
  },
  {
    id: 'BANK_TRANSFER',
    name: 'Bank Transfer',
  },
  {
    id: 'BENTO_TRANSFER',
    name: 'Bento Transfer',
  },
];
