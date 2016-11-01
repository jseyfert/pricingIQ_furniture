
var React = require('react');
var UserSignupForm = require('./userSignupForm.js');

var UserSignupData = React.createClass({
	getInitialState: function(){
		return {
			email: '',
			password: '',
			username: '',
			company: ''
		}
	},

	onEmailChange: function(e){
		this.setState({ email: e.target.value })
	},

	onPasswordChange: function(e){
		this.setState({ password: e.target.value })
	},

	onUsernameChange: function(e){
		this.setState({ username: e.target.value })
	},

	onCompanyChange: function(e){
		this.setState({ company: e.target.value })
	},


	handleUserSignupSubmit: function(e){
		e.preventDefault();

		var user = {};
		user.email = this.state.email;
		user.password = this.state.password;
		user.username = this.state.username;
		user.company = this.state.company;

		this.props.signupUserFromServer(user);
		this.setState({ 
			email: '',
		  password: '',
			username: '',
		  company: '' 
		});
	},

	render: function(){
		return (
			<div>
				<UserSignupForm 
				handleUserSignupSubmit={ this.handleUserSignupSubmit }
				setActiveComponent={ this.props.setActiveComponent }
				onEmailChange={ this.onEmailChange }
				onPasswordChange={ this.onPasswordChange }
				onUsernameChange={ this.onUsernameChange }
				onCompanyChange={ this.onCompanyChange }
				email={ this.state.email }
				password={ this.state.password }
				username={ this.state.username }
				company={ this.state.company }
				/>
			</div>
			)
	}
});

module.exports = UserSignupData;