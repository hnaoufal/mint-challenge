import coinsSelector from '../../../src/reducers/coins/coinsSelector.js';
import { coinsActions } from '../../../src/sagas/actionTypes';

describe('post coinsSelector', () => {
  it('should return the initial state', () => {
    expect(coinsSelector(undefined, {})).toEqual('default');
  });

  it('should handle SET_COINS_SELECTOR', () => {
    const action = {
      type: coinsActions.SET_COINS_SELECTOR,
      payload: { test: 'test' },
    };
    expect(coinsSelector({}, action)).toEqual({ test: 'test' });
  });
});

