const React = require('react');
const ReactDOM = require('react-dom');
const Graph = require('../components/graph');
const SlideShow = require('../components/slideshow');

let SlideGraph = React.createClass({
  getInitialState: function () {
    return {
      position: 0
    };
  },
  backward: function () {
    current_pos = this.state.position;
    if (current_pos > 0) {
      this.setState({
        position: current_pos - 1
      });
    }
    else if (current_pos === 0) {
      this.setState({
        position: this.props.showLength - 1
      });
    }
  },
  forward: function () {
    current_pos = this.state.position;
    if (current_pos < this.props.showLength - 1) {
      this.setState({
        position: current_pos + 1
      });
    }
    else if (current_pos === this.props.showLength - 1) {
      this.setState({
        position: 0
      });
    }
  },
  render: function () {
    return (
      <div style={{width: this.props.width + 'px'}}>
        <Graph
          position={this.state.position}
          annotations={this.props.annotations}
          showLength={this.props.showLength}
          width={this.props.width}
        />
        <SlideShow
          forward={this.forward}
          backward={this.backward}
          annotations={this.props.annotations}
          showLength={this.props.showLength}
          position={this.state.position}
          width={this.props.width}
        />
      </div>
    );
  }
});

module.exports = SlideGraph;
