//UserAuth
//	UserLoginData
//		UserLoginForm
//	UserSignupData
//		UserSignupForm

var React = require('react');

var UserSignupForm = React.createClass({
	render: function(){
		return (
			<div>
				<h3> Sign Up </h3>
				<div className="row">
    				<form className="col s6" onSubmit={ this.props.handleUserSignupSubmit }>
  	  					<div className="row">
        					<div className=".input-field col s6">
        						<label for="email">Email</label>
          						<input id="email" type="email" className="validate" onChange={ this.props.onEmailChange } value={ this.props.email }/>
          						
        					</div>
      					</div>
      					<div className="row">
        					<div className=".input-field col s6">
        						<label for="username">Username</label>
          						<input className="validate" onChange={ this.props.onUsernameChange } value={ this.props.username }/>
        					</div>
      					</div>	
      					<div className="row">
        					<div className=".input-field col s6">
        						<label for="password">Password</label>
          						<input id="password" type="password" className="validate" onChange={ this.props.onPasswordChange } value={ this.props.password }/>
          						
        					</div>
      					</div>
      					<button className="btn btn-primary">Sign up</button>
    				</form>
  				</div>
			</div>
			)
	}
});

module.exports = UserSignupForm;