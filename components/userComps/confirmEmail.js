
var React = require('react');
var Message = require('../partialComps/message');

var ConfirmEmail = React.createClass({

  render: function(){
    var emailVerification = this.props.emailVerification;
    var emailVerificationResend = this.props.emailVerificationResend; 
    var emailVerificationCount = this.props.emailVerificationCount;
    var displayEmailVerificationResend = (emailVerificationCount <= 2) ? <p>Didn't get a email? <a onClick={ emailVerificationResend  }> Send Another</a> </p> : null

    return(
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <Message message={this.props.message} />
            <button className="btn btn-warning btn-lg btn-block" onClick={ emailVerification } >Click here after account verification</button>
            <hr/>
            {displayEmailVerificationResend}
          </div>
        </div>
      )
  }
});

module.exports = ConfirmEmail;