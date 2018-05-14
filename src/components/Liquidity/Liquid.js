import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeTickerList } from 'bsc/selectors/coins.js';
import * as d3 from 'd3';

import ProgressArc from './Scatterplot/ProgressArc';

import styles from './Liquid.module.scss';

const mapStateToProps = state => ({
  tickerList: makeTickerList(state),
});

const mapDispatchToProps = dispatch => ({
});

class Liquid extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  getValues = () => {
    // Could be done in 1 loop not in 5 but its not much data so Readabilty > Performance
    const { tickerList } = this.props;
    const values = tickerList.reduce((a, next) => {
      a.push({
        name: next.name,
        marketCap: next.quotes.USD.market_cap,
        volume: next.quotes.USD.volume_24h,
        priceChange: next.quotes.USD.price,
      });

      return a;
    }, []);

    const marketMax = Math.max(...values.map(a => a.marketCap));
    const marketMin = Math.min(...values.map(a => a.marketCap));
    const volumeMax = Math.max(...values.map(a => a.volume)) ;
    const volumeMin = Math.min(...values.map(a => a.volume));

    return {
      marketMax,
      marketMin,
      volumeMax,
      volumeMin,
      values,
    };
  }

  render() {
    const data = this.getValues();

    return (
      <div className={styles.base}>
        <ProgressArc
          id="d3-arc"
          height={300}
          width={300}
          innerRadius={100}
          data={[40, 80, 120, 160]}
          outerRadius={110}
          backgroundColor="#e6e6e6"
          foregroundColor="#00ff00"
          percentComplete={0.3}
          values={data}
        />

    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Liquid);

