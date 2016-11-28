var React = require('react');
var UserSignupHtml = require('./userSignupHtml.js');

var UserSignupData = React.createClass({
	getInitialState: function(){
		return {
			email: '',
			password: '',
			confirmPassword: '',
			user: '',
			company: '',
			passwordsMatch: null
		}
	},

	onEmailChange: function(e){
		this.setState({ email: e.target.value })
	},

	onPasswordChange: function(e){
		this.setState({ password: e.target.value })
	},

	onConfirmPasswordChange: function(e){
		this.setState({ confirmPassword: e.target.value })

		if (this.state.password === e.target.value){
			this.setState({ passwordsMatch: true })
		} else {
			this.setState({ passwordsMatch: false })
		}
	},

	onUserChange: function(e){
		this.setState({ user: e.target.value })
	},

	onCompanyChange: function(e){
		this.setState({ company: e.target.value })
	},


	handleUserSignupSubmit: function(e){
		var midnightTonight = new Date().setHours(23,59,59,0);
		e.preventDefault();

			if (this.state.passwordsMatch){
				var userForm = {};
				userForm.email = this.state.email;
				userForm.password = this.state.password;
				userForm.user = this.state.user;
				userForm.company = this.state.company;
				userForm.resetCountAfter = midnightTonight;
				userForm.allDomains = this.props.allDomains

				this.props.signupUserFromServer(userForm);
				this.setState({ 
				  email: ''
				});
			}
	},

	render: function(){
		return (
			<div>
				<UserSignupHtml 
				errorMessage={ this.props.errorMessage }
				handleUserSignupSubmit={ this.handleUserSignupSubmit }
				setActiveComponent={ this.props.setActiveComponent }
				onEmailChange={ this.onEmailChange }
				onPasswordChange={ this.onPasswordChange }
				onConfirmPasswordChange={ this.onConfirmPasswordChange }
				onUserChange={ this.onUserChange }
				onCompanyChange={ this.onCompanyChange }
				email={ this.state.email }
				password={ this.state.password }
				confirmPassword={ this.state.confirmPassword }
				user={ this.state.user }
				company={ this.state.company }
				passwordsMatch={ this.state.passwordsMatch }
				message={this.props.message}
				/>
			</div>
			)
	}
});

module.exports = UserSignupData;