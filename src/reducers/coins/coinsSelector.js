import { coinsActions } from 'act/actionTypes';

const initialState = 'default';

export default function(state = initialState, action) {
  switch (action.type) {
    case coinsActions.SET_COINS_SELECTOR:
      return action.payload;
    default:
      break;
  }
  return state;
}
