import { delay } from 'redux-saga';
import { put, call, takeEvery, fork, select } from 'redux-saga/effects';

import { coinsActions } from 'act/actionTypes';
import CoinAPI from 'bsc/api/CoinApi';


/* Actions */
export const setCoinsValue = (value) => ({
  type: coinsActions.SET_COINS_SELECTOR,
  payload: value,
});

export const getTicker = (value) => ({
  type: coinsActions.GET_TICKER,
  payload: value,
});

/* Workers */

function* fetchTicker(action) {
  try {
    const payload = yield call(CoinAPI.getTicker, action.payload);
    yield put({ type: coinsActions.GET_TICKER_SUCCESS, payload: { entities: payload.data.data, list: Object.keys(payload.data.data) }});
  } catch (e) {
    console.error(e);
    yield put({ type: coinsActions.GET_TICKER_FAIL, message: e.message });
  }
}

/* Watches */

function* watchFetchTicker() {
  yield takeEvery(coinsActions.GET_TICKER, fetchTicker);
}

function* watchFetchCoinSelectorAndUpdateTicker() {
  yield takeEvery(coinsActions.SET_COINS_SELECTOR, function* handleSelectChange() {
    const a = yield select((state) => state.app.coinsSelector);
    yield put(getTicker(a));
  });
}

export default function* main() {
  yield fork(watchFetchTicker);
  yield fork(watchFetchCoinSelectorAndUpdateTicker);
}

