
var React = require('react');
var _ = require("underscore");

var ErrorSubmittedToday = React.createClass({

  render: function(){

    return (
        <div>
          <div className="container">
            <div className="jumbotron">
              <div className="alert alert-info" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error: </span>
                 &nbsp; You already submitted today, please come back tomorrow
              </div>
            </div>
          </div>
        </div>
    )
  }
});

module.exports = ErrorSubmittedToday;