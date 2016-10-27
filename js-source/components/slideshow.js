const React = require('react');

let annotationStyle = {
  width: '70%',
  height: '100%',
  display: 'inline-block',
  textAlign: 'center',
  verticalAlign: 'top'
};

let buttonStyle = {
  width: '15%',
  height: '100%',
  backgroundColor: 'white',
  color: 'grey',
  border: 'none'
};

let containerStyle = {
  height: '100%',
  // width: 402
};

let SlideShow = React.createClass({
  render: function () {
    return (
      <SlideBody
      forward={this.props.forward}
      backward={this.props.backward}
      annotation={this.props.annotations[this.props.position].annotation}
      />
    );
  }
});

let SlideBody = React.createClass({
  handleRight: function () {
    this.props.forward();
  },
  handleLeft: function () {
    this.props.backward();
  },
  render: function () {
    return (
      <div style={containerStyle}>
        <button style={buttonStyle} onClick={this.handleLeft}>
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <div style={annotationStyle}>
          {this.props.annotation}
        </div>
        <button style={buttonStyle} onClick={this.handleRight}>
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
});

module.exports = SlideShow;
