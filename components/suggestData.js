
var React = require('react');
var SuggestHtml = require('./suggestHtml.js');

var SuggestData = React.createClass({
  getInitialState: function(){
    return {
      suggest: "",
    }
  },

  onSuggestChange: function(event){
    this.setState({ suggest: event.target.value })
  },


  handleSuggestSubmit: function(e){
    e.preventDefault();
    // console.log('in handleSuggestSubmit', this.state.suggest);

    var domains = this.state.suggest

    this.props.submitSuggestedDomains(domains);

    this.setState({ suggest: ''});
  },


  render: function(){
    return (
      <div>
        <SuggestHtml 
          handleSuggestSubmit={ this.handleSuggestSubmit }
          onSuggestChange={ this.onSuggestChange }
          suggest={ this.state.suggest }
          setActiveComponent={ this.props.setActiveComponent }
          message={this.props.message}
          />
      </div>
      )
  }
});

module.exports = SuggestData;