var React = require('react');

var ResetPasswordHtml = React.createClass({

  showPasswordValidationInput: function(){
    var passwordsMatch = this.props.passwordsMatch

    if (passwordsMatch === null){
      return(
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" className="form-control" name="confirmPassword" onChange={ this.props.onConfirmPasswordChange } value={ this.props.confirmPassword } required/>
        </div>
        )
    } else if (passwordsMatch) {
      return(
        <div className="form-group has-success">
          <label className="control-label" for="inputSuccess1">Confirm New Password</label>
          <input type="password" className="form-control" id="inputSuccess1" aria-describedby="helpBlock2" onChange={ this.props.onConfirmPasswordChange } value={ this.props.confirmPassword } id="inputError1" required/>
        </div>
        )
    } else {
      return(
        <div className="form-group has-error">
          <label className="control-label" for="inputError1">Confirm New Password (Passwords do not match)</label>
          <input type="password" className="form-control" name="confirmPassword" onChange={ this.props.onConfirmPasswordChange } value={ this.props.confirmPassword } id="inputError1" required/>
        </div>
        )
    }
  },

  render: function(){
    return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          <h1><span className="fa fa-sign-in"></span>Reset Password</h1>
            <form className="" onSubmit={ this.props.handlePasswordResetSubmit }>
             
              <div className="form-group">
                <label>New Password</label>
                <input type="password" className="form-control" name="password" onChange={ this.props.onPasswordChange } value={ this.props.password } required/>
              </div>
            {this.showPasswordValidationInput()} 
                <button className="btn btn-warning btn-lg">Reset</button>
            </form>
            <hr/>
          </div>    
        </div>    
      </div>
    )
  }
});

module.exports = ResetPasswordHtml;