import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { makeTickerList } from 'bsc/selectors/coins.js';

import { connect } from 'react-redux';

import styles from './Market.module.scss';

const mapStateToProps = state => ({
  tickerList: makeTickerList(state),
  isFetched: state.ui.tickerListUI,
});

class Market extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { tickerList } = this.props;

    if (tickerList.length === 0) {
      return <div className={styles.emptyView}>Please Select number of Coins in Navigation</div>;
    }

    return (
      <div className={styles.base}>
        <h1 className={styles.title}> Market-Overview </h1>
        <div className={styles.table}>
          <div className={styles.tableRow}>
            <div className={styles.column}>
              Rank
            </div>
            <div className={styles.column}>
              Name
            </div>
            <div className={styles.column}>
              Price
            </div>
            <div className={styles.column}>
              Price Change (24h)
            </div>
            <div className={styles.column}>
              Market Cap
            </div>
            <div className={styles.column}>
              Volume (24h)
            </div>
          </div>
          {tickerList.map(item => (
            <div key={item.id} className={styles.tableRow}>
              <div className={styles.column}>
                {item.rank}
              </div>
              <div className={styles.column}>
                {item.name}
              </div>
              <div className={styles.column}>
                ${item.quotes.USD.price}
              </div>
              <div className={styles.column}>
                {item.quotes.USD.percent_change_24h}%
              </div>
              <div className={styles.column}>
                ${item.quotes.USD.market_cap}
              </div>
              <div className={styles.column}>
                ${item.quotes.USD.volume_24h}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Market);
