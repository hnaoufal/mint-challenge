import { combineReducers } from 'redux';
import coinsSelector from './coins/coinsSelector';
import ticker from './coins/ticker';
import tickerListUI from './ui/tickerListUI';

const reducers = combineReducers({
  data: combineReducers({
    ticker,
  }),
  app: combineReducers({
    coinsSelector,
  }),
  ui: combineReducers({
    tickerListUI,
  }),
});

export default reducers;
