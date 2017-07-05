var React = require('react');
var $ = require('jquery');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      isSelected: false,
      cardTotal: this.props.card.amount,
      cardName: this.props.card.name
    }
  },
  render: function () {
    return <div>
      {this.loadCards()}
    </div>
  },
  loadCards: function () {

    if (this.props.card.type === 'Landmark') {
      return false;
    } else {
      return <div className="card-container">
        {this.sortCards()}
        {this.getCardAmount()}
        {this.handleCardRender()}
        {this.handleCardClickRender()}
        {this.purchaseCard()}
        {this.state.cardTotal >= 1 ? <h4 className="card-info">x{this.state.cardTotal}</h4> : null}

      </div>
    }

  },
  handleCardRender: function () {
    if (this.state.cardTotal >= 1) {
      return <img onClick={this.cardClick} className="image-view" src={this.props.card.imgFront} />
    }
  },
  handleCardClickRender: function () {
    if (this.state.isSelected) {
      return <img onClick={this.cardClick} className="image-view-selected" src={this.props.card.imgFront} />
    }
  },
  cardClick: function () {
    var selected = !this.state.isSelected;
    this.setState({ isSelected: selected });
  },
  purchaseCard: function () {
    if (this.state.isSelected) {
      return <div>
        <button onClick={this.buySelected}className="btn btn-success btn-purchase left">Buy</button>
        <button onClick={this.returnCard}className="btn btn-danger btn-purchase right">Back</button>
      </div>
    }
  },
  returnCard: function () {
    $('.image-view-selected').trigger('click');
  },
  buySelected: function () {
    $('.image-view-selected').trigger('click');
    this.setState({cardTotal: this.state.cardTotal - 1});
  },
  cardArray: [],
  getCardAmount: function () {
    // Base has 88 without the Landmarks and starting cards
    // Harbor adds 56 without the Landmarks and starting cards + Base = 144
    // Millionair's Row adds 72 cards + Base = 160
    // All equals 216
    if (this.props.card.amount >= 1) {
      this.props.card.amount--;
      this.cardArray.push(this.props.card);
      this.getCardAmount();
    }
  },
  sortCards: function () {
    this.cardArray = _.sortBy(this.cardArray, function (obj) {
      if (obj.roll.length === undefined) {
        return obj.roll
      } else {
        return obj.roll[0]
      }
    });
  }
})
