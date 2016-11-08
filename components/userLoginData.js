
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
		e.preventDefault();

		var user = {};
		user.email = this.state.email;
		user.password = this.state.password;

		this.props.loginUserFromServer(user);
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
					setActiveSubComponent={ this.props.setActiveSubComponent }
					errorMessage={ this.props.errorMessage }
					/>
			</div>
			)
	}
});

module.exports = UserLoginData;