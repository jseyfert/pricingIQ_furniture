var React = require('react');
var ForgotPasswordHtml = require('./forgotPasswordHtml.js');

var ForgotPasswordData = React.createClass({
	getInitialState: function(){
		return {
			email: ''
		}
	},

	onEmailChange: function(e){
		// console.log(e.target.value);
		this.setState({ email: e.target.value })
	},

	handlePasswordReset: function(e){
		e.preventDefault();

		var user = {};
		user.email = this.state.email;

		this.props.forgotPassword(user);

		// this.setState({ 
		//   email: ''
		// });
	},

	render: function(){
		return (
			<div>
				<ForgotPasswordHtml 
				errorMessage={ this.props.errorMessage }
				handlePasswordReset={ this.handlePasswordReset }
				setActiveComponent={ this.props.setActiveComponent }
				onEmailChange={ this.onEmailChange }
				email={ this.state.email }
				/>
			</div>
			)
	}
});

module.exports = ForgotPasswordData;