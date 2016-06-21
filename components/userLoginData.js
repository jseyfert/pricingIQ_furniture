//UserAuth
//	UserLoginData
//		UserLoginForm
//	UserSignupData
//		UserSignupForm


var React = require('react');
var UserLoginForm = require('./userLoginForm.js');

var UserLoginData = React.createClass({
	getInitialState: function(){
		return {
			email: "",
			password: "", 
			username: ""
		}
	},

	onEmailChange: function(event){
		this.setState({ email: event.target.value })
	},

	onPasswordChange: function(event){
		this.setState({ password: event.target.value })
	},

	onUsernameChange: function(event){
		this.setState({ username: event.target.value })
	},

	handleUserLoginSubmit: function(e){
		e.preventDefault();

		var user = {};
		user.email = this.state.email;
		user.password = this.state.password;
		user.username = this.state.username;

		this.props.loginUserFromServer(user);
		this.setState({ email: '', password: '', username: '' });
	},


	render: function(){
		return (
			<div>
				<UserLoginForm handleUserLoginSubmit={ this.handleUserLoginSubmit }
							   onPasswordChange={ this.onPasswordChange }
							   onUsernameChange={ this.onUsernameChange }
							   onEmailChange={ this.onEmailChange }
							   email={ this.state.email }
							   password={ this.state.password } 
							   username={ this.state.username }
							   />
			</div>
			)
	}
});

module.exports = UserLoginData;