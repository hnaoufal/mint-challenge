import { createSelector } from 'reselect';

const tickerMap = state => state.data.ticker.entities;
const tickerIds = state => state.data.ticker.list;

export const makeTickerList = createSelector(
  tickerIds,
  tickerMap,
  (ids, list) => ids.map(id => list[id])
);

