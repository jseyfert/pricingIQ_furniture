var React = require('react');
var ErrorMessage = require('./errorMessage');

var ForgotPasswordHtml = React.createClass({

  render: function(){
    return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          <ErrorMessage message={this.props.message} />
          <h1><span className="fa fa-sign-in"></span> Forgot Password</h1>
            <form className="" onSubmit={ this.props.handlePasswordReset }>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" name="email" onChange={ this.props.onEmailChange } value={ this.props.email } required/>
              </div>
                <button className="btn btn-warning btn-lg">Reset</button>
            </form>
            <hr/>
            <p>Back to Login? <a onClick={ this.props.setActiveComponent.bind(null, 'login') }>Login</a></p>
          </div>    
        </div>    
      </div>
    )
  }
});

module.exports = ForgotPasswordHtml;