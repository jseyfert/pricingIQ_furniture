
var React = require('react');
var ErrorMessage = require('./errorMessage');

var ErrorConfirmEmail = React.createClass({

  render: function(){
    var handleEmailConfirm = this.props.handleEmailConfirm;
    var resendVerifyToken = this.props.resendVerifyToken;

    return(
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <ErrorMessage message={this.props.message} />
            <button className="btn btn-info btn-lg btn-block" onClick={ handleEmailConfirm } >Click here after account verification</button>
            <hr/>
            <p>Did not get a email? <a onClick={ resendVerifyToken }> Send Another</a> </p>
          </div>
        </div>
      )
  }
});

module.exports = ErrorConfirmEmail;