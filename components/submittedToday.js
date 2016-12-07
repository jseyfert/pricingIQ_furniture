
var React = require('react');
var Logo = require('./partialComps/logo');

var ErrorSubmittedToday = React.createClass({

  render: function(){

    return (
        <div>

        <Logo delay={false} /> 

          <div className="container text-center">
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error: </span>
                 &nbsp; You are out of submitts for today, please come back tomorrow.
              </div>
          </div>
        </div>
    )
  }
});

module.exports = ErrorSubmittedToday;