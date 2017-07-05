var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://machi-koro.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function () {
    return {
      cards: {},
      loaded: false
    }
  },
  componentWillMount: function () {
    this.fb = new Firebase(rootUrl + 'cards/');
    this.bindAsObject(this.fb, 'cards');
    this.fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          Machi Koro
        </h2>
        <Header itemsStore={this.firebaseRefs.cards}/>
        <hr />
        <div className={"content " + (this.state.loaded ? 'loaded' : '')}>

          <List cards={this.state.cards} />

        </div>
      </div>
    </div>
  },
  handleDataLoaded: function () {
    this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
