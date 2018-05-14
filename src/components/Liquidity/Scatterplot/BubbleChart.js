import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';

import styles from './BubbleChart.module.scss'


class BubbleChart extends Component {
  displayName: 'BubbleChart';

  propTypes: {
    id: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number,
      innerRadius: PropTypes.number,
      outerRadius: PropTypes.number,
      backgroundColor: PropTypes.string,
      foregroundColor: PropTypes.string,
      percentComplete: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      values: props.values,
      hoverState: false,
      selectedValue: null,
    }
  }

  componentDidMount() {
    this.setContext();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.values !== this.state.values) {
      this.setState({
        values: nextProps.values,
      }, () => this.setContext())
    }
  }

  handleMouseOver = obj => {
    this.setState({
      hoverState: true,
      selectedValue: obj,
    })
  }

  handleMouseLeave = obj => {
    this.setState({
      hoverState: false,
    });
  }

  setContext() {
    const { height, width, id, data } = this.props;
    const { values } = this.state;

    /* a little bit hacky... I know but to make it clean I need more time */
    if(document.getElementById(id)) {
      document.getElementById(id).remove();
    }

    const y = d3.scaleLinear()
      .domain([values.volumeMin, values.volumeMax])
      .range([600, 0]);

    const x = d3.scaleLinear()
      .domain([values.marketMin, values.marketMax])
      .range([0, 600]);

    const xAxis = d3.axisBottom(x)
      .tickValues([values.marketMin, 30000000000, 60000000000, 90000000000, 120000000000, values.marketMax]);

    const yAxis = d3.axisLeft(y)
      .tickValues([values.volumeMin, 1500000000, 3000000000, 4500000000, 6000000000, values.volumeMax ]);

    const main = d3.select(this.refs.arc).append('svg')
      .attr('height', 1000)
      .attr('width', 1000)
      .attr('overflow', 'visible')
      .attr('id', id);

    main.selectAll('circle')
      .data(values.values)
      .enter()
      .append('circle')
      .attr('cy', d => -10 + y(d.volume))
      .attr('cx', d => 200 + x(d.marketCap))
      .attr('r', d => Math.abs(d.priceChange) + 10)
      .style('fill', d => {
        if(d.priceChange < 0) {
          return 'red';
        } 
          return 'green';
      })
      .style('stroke', 'black')
      .style('stroke-width', 2)
      .on('mouseover', this.handleMouseOver)
      .on('mouseleave', this.handleMouseLeave)
      .append('svg:title')
      .text(d => `${d.name} - MarketCap: ${d.marketCap} - Volume: ${d.volume} - PriceChange: ${d.priceChange}`);

    main.append('text')
      .style('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('x', -250)
      .attr('y', 80)
      .text('Volume');

    main.append('text')
      .style('text-anchor', 'middle')
      .attr('x', 520)
      .attr('y', 630)
      .text('Market Cap');

    main.append('g')
      .attr('transform', 'translate(200, -10)')
      .attr('class', 'y axis')
      .call(yAxis);

    main.append('g')
      .attr('transform', 'translate(200, 590)')
      .attr('class', 'x axis')
      .call(xAxis);

    return main;
  }

  render() {
    const { hoverState, selectedValue } = this.state;

    if (this.props.values.values.length < 1) {
      return <div>Bitte auswaehlen</div>
    }

    return (
      <div className={styles.base}>
        <div className={styles.graph} ref="arc" />
        <div className={styles.values}>
          {hoverState && selectedValue &&
            <div>
              <div>Name: {selectedValue.name}</div>
              <div>MarketCap: ${selectedValue.marketCap}</div>
              <div>Volume: ${selectedValue.volume}</div>
              <div>PriceChange: {selectedValue.priceChange}</div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default BubbleChart;

