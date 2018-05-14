import { coinsActions } from 'act/actionTypes';

const initialState = {
  entities: {},
  list: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case coinsActions.GET_TICKER_SUCCESS:
      return action.payload;
    case coinsActions.GET_TICKER_FAIL:
      return { error: action.error };
    default:
      break;
  }

  return state;
}

