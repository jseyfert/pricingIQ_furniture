
var React = require('react');
var UserSignupHtml = require('./userSignupHtml.js');

var UserSignupData = React.createClass({
	getInitialState: function(){
		return {
			email: '',
			password: '',
			user: '',
			company: ''
		}
	},

	onEmailChange: function(e){
		this.setState({ email: e.target.value })
	},

	onPasswordChange: function(e){
		this.setState({ password: e.target.value })
	},

	onUserChange: function(e){
		this.setState({ user: e.target.value })
	},

	onCompanyChange: function(e){
		this.setState({ company: e.target.value })
	},


	handleUserSignupSubmit: function(e){
		e.preventDefault();

		var user = {};
		user.email = this.state.email;
		user.password = this.state.password;
		user.user = this.state.user;
		user.company = this.state.company;

		this.props.signupUserFromServer(user);
		this.setState({ 
			email: '',
		  password: '',
			user: '',
		  company: '' 
		});
	},

	render: function(){
		return (
			<div>
				<UserSignupHtml 
				handleUserSignupSubmit={ this.handleUserSignupSubmit }
				setActiveSubComponent={ this.props.setActiveSubComponent }
				onEmailChange={ this.onEmailChange }
				onPasswordChange={ this.onPasswordChange }
				onUserChange={ this.onUserChange }
				onCompanyChange={ this.onCompanyChange }
				email={ this.state.email }
				password={ this.state.password }
				user={ this.state.user }
				company={ this.state.company }
				/>
			</div>
			)
	}
});

module.exports = UserSignupData;