var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://machi-koro.firebaseio.com/';
var $ = require('jquery');
var GameMode = require('./game-mode');
var _ = require('lodash');


module.exports = React.createClass({
  getInitialState: function () {
    return {
      name: this.props.card.name,
      description: this.props.card.description,
      cost: this.props.card.cost,
      roll: this.props.card.roll,
      paymentSource: this.props.card.paymentSource,
      paymentAmount: this.props.card.paymentAmount,
      done: this.props.card.done,
      textChanged: false,
      turn: true,
      dice: this.props.dice,
      rollRequire: $.inArray('roll', this.props.card.paymentRequirement) !== -1 ? true : false,
      turnRequire: $.inArray('turn', this.props.card.paymentRequirement) !== -1 ? true : false,
      notTurnRequire: $.inArray('!turn', this.props.card.paymentRequirement) !== -1 ? true : false,
      gameSource: this.props.card.gameSource
    }
  },
  componentWillMount: function () {
    this.fb = new Firebase(rootUrl + 'cards/' + this.props.card.key);
  },
  render: function () {
    return <div onClick={this.handleDice}>
      {this.chooseGame()}
    </div>
  },
  handleDoneChange: function (e) {
    var update = {done: e.target.checked};
    this.setState(update);
    this.fb.update(update);
  },
  handleDice: function (e) {
    e.preventDefault();
    this.setState({dice: _.random(2, 12)});
  },
  handleDeleteClick: function () {
    this.fb.remove();
  },
  handleTextChange: function (e) {
    this.setState({
      text: e.target.value,
      textChanged: true
    })
  },
  chooseGame: function () {
    if (this.props.expansion === null) {
      return false;
    } else if (this.props.expansion === 'All') {
      return <div>
        <GameMode card={this.props.card} />
      </div>
    } else if (this.state.gameSource === this.props.expansion || this.state.gameSource === 'Base') {
      return <div>
        <GameMode card={this.props.card} />
      </div>
    }
  }
});
