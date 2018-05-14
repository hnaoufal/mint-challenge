import { coinsActions } from 'act/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case coinsActions.GET_TICKER:
      return { ...state, isFetching: true };
    case coinsActions.GET_ACCOUNTS_SUCCESS:
      return { ...state, isFetching: false };
    case coinsActions.GET_ACCOUNTS_FAIL:
      return { ...state, isFetching: false };
    default:
      break;
  }
  return state;
}
