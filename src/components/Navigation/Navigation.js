import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NavLink, withRouter } from 'react-router-dom';

import { setCoinsValue } from 'act/coins';

import styles from './Navigation.module.scss';

const mapStateToProps = state => ({
  coinsValue: state.app.coinsSelector,
});

const mapDispatchToProps = dispatch => ({

  setCoinsValue: bindActionCreators(setCoinsValue, dispatch),
});


class Navigation extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  handleCoinsValueChange = (e) => {
    this.props.setCoinsValue(e.target.value);
  }

  render() {
    const { coinsValue } = this.props;

    return (
      <div className={styles.base}>
        <div className={styles.navBar}>
          <div className={styles.navGroup}>
            <div className={styles.navbarHeading}>Wattx</div>
            <div className={styles.navbarDivider} />
            <label htmlFor="coins">
              <select id="coins" value={coinsValue} onChange={this.handleCoinsValueChange} className={styles.select}>
                <option disabled value="default">Select # of Entities</option>
                <option value="10">Top 10 coins</option>
                <option value="50">Top 50 coins</option>
                <option value="100">Top 100 coins</option>
                <option value="100">All coins</option>
              </select>
            </label>
          </div>
          <div className={styles.navGroup, styles.navMenu}>
            <NavLink exact className={styles.navLink} to="/"><i className={cn('fas fa-home', styles.icon)}/>Market</NavLink>
            <NavLink exact className={styles.navLink} to="/liquidity"><i className={cn('fas fa-chart-line', styles.icon)}/>Liquidity</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));

