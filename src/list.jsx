var React = require('react');
var ListItem = require('./list-item');
var _ = require('lodash');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      expansion: null
    }
  },
  render: function () {
    return <div className="btn-container">
      <button onClick={this.handleBaseClick} className="btn-padding btn-success">Base</button>
      <button onClick={this.handleHarborClick} className="btn-padding btn-info">Harbor</button>
      <button onClick={this.handleMillionaireClick} className="btn-padding btn-warning">Millionaire's Row</button>
      <button onClick={this.handleAllClick} className="btn-padding btn-danger">All</button>
      {this.renderList()}
    </div>
  },
  renderList: function () {
    if (!this.props.cards) {
      return <h4>
        Add a todo to get started
      </h4>
    } else {
      var children = [];
      var dice = _.random(2, 12);
      for (var key in this.props.cards) {
        var card = this.props.cards[key];
        // console.log(card.name);
        var expansion = this.state.expansion
        // console.log(card.amount);
        card.key = key;
        children.push(
          <ListItem
            card={card}
            key={key}
            dice={dice}
            expansion={expansion}
          >
          </ListItem>
        )
      }

      return children;
    }
  },
  handleBaseClick: function (e) {
    e.preventDefault();
    this.setState({expansion: 'Base'});
    $('button.btn-padding').remove();
  },
  handleHarborClick: function (e) {
    e.preventDefault();
    this.setState({expansion: 'Harbor'});
    $('button.btn-padding').remove();
  },
  handleMillionaireClick: function (e) {
    e.preventDefault();
    this.setState({expansion: "Millionaire's Row"});
    $('button.btn-padding').remove();
  },
  handleAllClick: function (e) {
    e.preventDefault();
    this.setState({expansion: 'All'});
    $('button.btn-padding').remove();
  }
});
