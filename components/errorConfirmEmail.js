
var React = require('react');

var ErrorConfirmEmail = React.createClass({

  showError: function(){
    var errorMessage = this.props.errorMessage
    if (errorMessage)
    return (
        <div>
          <div className="alert alert-info">
            {errorMessage}
            <a className="alert-link"> Click here to send another link</a>
          </div>
        </div>
    )
  },

  render: function(){
  var handleEmailConfirm = this.props.handleEmailConfirm;
  console.log('in error message', this.props.errorMessage);
    return (
        <div>
          <div className="container">
              <div className="alert alert-warning" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error: </span>
                 &nbsp; To proceed check email and click the confimation link. 
                <a className="alert-link" onClick={ handleEmailConfirm }> Click here once complete</a>
              </div>

              {this.showError()}

          </div>
        </div>
    )
  }
});

module.exports = ErrorConfirmEmail;