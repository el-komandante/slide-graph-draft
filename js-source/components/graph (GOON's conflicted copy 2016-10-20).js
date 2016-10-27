const React = require('react');
const d3 = require('d3');

let graphStyle = {
  paddingBottom: 10
}

let Graph = React.createClass({
  componentDidMount: function () {
    let margin = {top: 20, right: 48, bottom: 20, left: 48};
    let width = 400 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;

    let timeFormat = d3.timeParse('%Y');

    var line = d3.line()
                // .curve(d3.curveCatmullRom)
                .x(function(d) { return x(d.year); })
                .y(function(d) { return y(d.count); });

    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    let div = d3.select(this.refs.graph).append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    let svg = d3.select(this.refs.graph).append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
              .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr('class', 'g-container');

    d3.csv('./leso-1033-counts.csv', convert, function(error, data) {
      if (error) throw error;

      x.domain(d3.extent(data, function(d) { return d.year; }));
      y.domain(d3.extent(data, function(d) { return d.count; }));


      svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

      svg.append("g")
         .attr("class", "axis axis--y")
         .call(d3.axisLeft(y))
       .append("text")
         .attr("class", "axis-title")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", ".71em")
         .style("text-anchor", "end")
         .text('Quantity, 5.56mm Rifle');

      svg.append('path')
          .datum(data)
          .attr('class', 'line')
          .attr('d', line)

      svg.selectAll("dot")
          .data(data)
        .enter().append("circle")
          .attr('class', 'point')
          .attr("r", 3.5)
          .attr("cx", function(d) { return x(d.year); })
          .attr("cy", function(d) { return y(d.count); })
          .attr("index", function(d, i) { return i; })
          .on("mouseover", function(d) {
            current_radius = d3.select(this).attr('r')
            d3.select(this).transition()
              .duration(100)
              .attr('r', 4.5);
            div.transition()
                .duration(200)
                .style("opacity", .8);
            div.html('&nbsp;&nbsp;' + d.year.getFullYear() + ", "  + d.count + '&nbsp;&nbsp;')
                .style("left", (d3.event.pageX - 30) + "px")
                .style("top", (d3.event.pageY - 31) + "px");
          })
          .on("mouseout", function(d) {
              d3.select(this).transition()
              d3.select(this).transition()
                .duration(100)
                .attr(
                  'r',
                  d3.select(this).attr('class') === 'selected-point' ?
                  4.5:3.5);
              div.transition()
                  .duration(500)
                  .style("opacity", 0);
          });
          d3.select('circle[index="0"]')
            .attr('class', 'selected-point')
            .attr('r', 4.5)

          svg.insert('circle', 'circle[index="0"]')
          .attr('class', 'selected-outline')
          .attr('r', 7.5)
          .attr('cx', d3.select('circle[index="0"]').attr('cx'))
          .attr('cy', d3.select('circle[index="0"]').attr('cy'))
          .attr('id', 'ring');
    });

    function convert(d) {
      return {
        year: timeFormat(+d.Year),
        count: +d.Count
      }
    }
    function type(d) {
      d.year = +d.year;
      d.count = +d.count;
      return d;
    }
  },
  componentWillReceiveProps: function (nextProps) {
    let selected = d3.select('circle[index="' + nextProps.position + '"]')
    let previous = d3.select('circle[index="' + (this.props.position) + '"]')
    let g = d3.select('.g-container')

    selected.attr('class', 'selected-point')
      .transition()
      .duration(100)
      .attr('r', 4.5)

    // selected.append('circle')
    //   .attr('class', 'selected-outline')
    //   .attr('cx', selected.attr('cx'))
    //   .attr('cy', selected.attr('cy'))
    //   .attr('r', 7.5);

    previous.attr('class', 'point')
      .transition()
      .duration(100)
      .attr('r', 3.5);

    d3.select('#ring')
      .transition()
      .duration(20)
      .attr('r', 0)
      .remove()

    g.insert('circle', 'circle[index="' + nextProps.position + '"]')
      .attr('class', 'selected-outline')
      .attr('r', 0)
      .attr('cx', selected.attr('cx'))
      .attr('cy', selected.attr('cy'))
      .attr('id', 'ring')
      .transition()
      .duration(100)
      .attr('r', 9.5);
;
  },
  clickSelect: function(index) {

  },
  render: function () {
    return <div style={graphStyle} ref='graph'></div>;
  }
})

module.exports = Graph;
