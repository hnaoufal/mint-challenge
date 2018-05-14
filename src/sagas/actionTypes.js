import { asyncCall, createActionTypes } from 'bsc/utils/actionUtils';

export const coinsActions = createActionTypes('coins', [
  'SET_COINS_SELECTOR',
  ...asyncCall('GET_TICKER'),
]);

