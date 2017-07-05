var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: ''
    }
  },
  render: function () {
    return <div className="input-group">

    </div>
  },
  handleClick: function () {
    this.props.itemsStore.push({
      text: this.state.text,
      done: false
    });

    this.setState({text: ''});
  },
  handleInputChange: function (e) {
    this.setState({text: e.target.value});
  }
});
