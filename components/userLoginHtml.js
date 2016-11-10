
var React = require('react');

var UserLoginHtml = React.createClass({

  showErrorMessage: function(){
    var errorMessage = (this.props.errorMessage) ? this.props.errorMessage : null;
    // console.log(errorMessage);
    if (errorMessage){
      return(
        <div>
      <div className="alert alert-danger" role="alert">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span className="sr-only">Error: </span>
          { errorMessage }
      </div>
      </div>
        )
    }
  },

  render: function(){
    return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
            {this.showErrorMessage()}
            <h1><span className="fa fa-sign-in"></span> Login</h1>
      			<form className="" onSubmit={ this.props.handleUserLoginSubmit }>
      				<div className="form-group">
      					<label>Email</label>
    						<input type="text" className="form-control" name="email" onChange={ this.props.onEmailChange } value={ this.props.email } required/>
      				</div>	
      				<div className="form-group">
      					<label>Password</label>
      					<input type="password" className="form-control" name="password" onChange={ this.props.onPasswordChange } value={ this.props.password } required/>
      				</div>
      					<button className="btn btn-warning btn-lg">Log in</button>
      			</form>
            <hr/>
            <p>Need an account? <a onClick={ this.props.setActiveComponent.bind(null, 'signup') } >Signup</a></p>
          </div>
        </div>
      </div>
      )
  }
});

module.exports = UserLoginHtml;