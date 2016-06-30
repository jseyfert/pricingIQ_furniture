//UserAuth
//	UserLoginData
//		UserLoginForm
//	UserSignupData
//		UserSignupForm

var React = require('react');

var UserLoginForm = React.createClass({

	render: function(){
			

		return (
			<div>
 				<div className="row">
    				<form className="col s6" onSubmit={ this.props.handleUserLoginSubmit }>
  	  					<div className="row">
        					<div className=".input-field col s6">
        						<label for="email">Email</label>
          						<input id="email" type="email" className="validate" onChange={ this.props.onEmailChange } value={ this.props.email }/>
          						
        					</div>
      					</div>	
      					<div className="row">
        					<div className=".input-field col s6">
        						<label for="password">Password</label>
          						<input id="password" type="password" className="validate" onChange={ this.props.onPasswordChange } value={ this.props.password }/>
          						
        					</div>
      					</div>
      					<button className="btn btn-primary">Log in</button>
    				</form>
  				</div>
			</div>
			)
	}
});

module.exports = UserLoginForm;