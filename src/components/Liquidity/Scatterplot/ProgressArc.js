import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';


class ProgressArc extends Component {
  displayName: 'ProgressArc';

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
      .attr('height', 600)
      .attr('width', 600)
      .attr('overflow', 'visible')
      .attr('id', id);

    main.selectAll('circle')
      .data(values.values)
      .enter()
      .append('circle')
      .attr('cy', d => -10 + y(d.volume))
      .attr('cx', d => 200 + x(d.marketCap))
      .attr('r', d => d.priceChange / 100)
      .style('fill', 'green')
      .style('stroke', 'black')
      .style('stroke-width', 2);

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
    if (this.props.values.values.length < 1) {
      return <div>Bitte auswaehlen</div>
    }

    return (
      <div ref="arc" />
    )
  }
}

export default ProgressArc;

