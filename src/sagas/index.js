import { fork } from 'redux-saga/effects';

import coinsSagas from './coins';

export default function* rootSaga() {
  yield fork(coinsSagas);
}
