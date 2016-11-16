
var React = require('react');

var ErrorConfirmEmail = React.createClass({

  render: function(){
  var handleEmailConfirm = this.props.handleEmailConfirm;

    return (
        <div>
          <div className="container">
              <div className="alert alert-warning" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error: </span>
                 &nbsp; To proceed check email and click the confimation link. 
                 <a className="navbar-link colorBlue" onClick={ handleEmailConfirm }> Click here once complete</a>
              </div>
          </div>
        </div>
    )
  }
});

module.exports = ErrorConfirmEmail;