
var React = require('react');
var UserLoginHtml = require('./userLoginHtml.js');

var UserLoginData = React.createClass({
	getInitialState: function(){
		return {
			email: "",
			password: "" 
		}
	},

	onEmailChange: function(event){
		this.setState({ email: event.target.value })
	},

	onPasswordChange: function(event){
		this.setState({ password: event.target.value })
	},


	handleUserLoginSubmit: function(e){
		var currentTime = new Date().getTime()
		var midnightTonight = new Date().setHours(23,59,59,0);

		e.preventDefault();

		var userForm = {};
		userForm.email = this.state.email;
		userForm.password = this.state.password;
		userForm.currentTime = currentTime;
		userForm.newResetCountAfter = midnightTonight;
		userForm.allDomains = this.props.allDomains

		this.props.loginUserFromServer(userForm);
		this.setState({ email: '', password: '' });
	},


	render: function(){
		return (
			<div>
				<UserLoginHtml 
					handleUserLoginSubmit={ this.handleUserLoginSubmit }
					onPasswordChange={ this.onPasswordChange }
					onEmailChange={ this.onEmailChange }
					email={ this.state.email }
					password={ this.state.password }
					setActiveComponent={ this.props.setActiveComponent }
					message={this.props.message}
					/>
			</div>
			)
	}
});

module.exports = UserLoginData;