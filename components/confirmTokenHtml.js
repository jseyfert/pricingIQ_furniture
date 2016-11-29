var React = require('react');
var ErrorMessage = require('./errorMessage');

var ConfirmTokenHtml = React.createClass({

  render: function(){
    var forgotPasswordResend = this.props.forgotPasswordResend;
    var displayPasswordResend = (this.props.passwordResetEmail) ? <p>Didn't recieve an email? <a onClick={ this.props.forgotPasswordResend } >Send Again</a></p> : null;
    // consolxe.log('in ConfirmTokenHtml > displayPasswordResend', displayPasswordResend);
    
    return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          <ErrorMessage message={this.props.message} />
          <h1><span className="fa fa-sign-in"></span>Validate User</h1>
            <form className="" onSubmit={ this.props.handleTokenSubmit }>
              <div className="form-group">
                <label>Paste token here</label>
                <input type="text" className="form-control" name="email" onChange={ this.props.onTokenChange} value={ this.props.token } required/>
              </div>
                <button className="btn btn-warning btn-lg">Send</button>
            </form>
            <hr/>
            {displayPasswordResend}
          </div>    
        </div>    
      </div>
    )
  }
});

module.exports = ConfirmTokenHtml;