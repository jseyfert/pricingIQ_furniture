
var React = require('react');
var ConfirmHtml = require('./confirmHtml.js');
var _ = require("underscore");

var ConfirmData = React.createClass({

  render: function(){
    return (
      <div>
        <ConfirmHtml 
          allUrls={ this.props.allUrls }
          allDomains={ this.props.allDomains }
          />
      </div>
      )
  }
});

module.exports = ConfirmData;