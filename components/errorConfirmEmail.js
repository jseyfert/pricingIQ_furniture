
var React = require('react');
var ErrorMessage = require('./errorMessage');

var ErrorConfirmEmail = React.createClass({

  render: function(){
    var emailVerification = this.props.emailVerification;
    var emailVerificationResend = this.props.emailVerificationResend; 
    var emailVerificationCount = this.props.emailVerificationCount;
    var displayEmailVerificationResend = (emailVerificationCount <= 2) ? <p>Did not get a email? <a onClick={ emailVerificationResend  }> Send Another</a> </p> : null

    return(
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <ErrorMessage message={this.props.message} />
            <button className="btn btn-info btn-lg btn-block" onClick={ emailVerification } >Click here after account verification</button>
            <hr/>
            {displayEmailVerificationResend}
          </div>
        </div>
      )
  }
});

module.exports = ErrorConfirmEmail;