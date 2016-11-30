var React = require('react');
var ConfirmTokenHtml = require('./confirmTokenHtml.js');

var ConfirmTokenData = React.createClass({
	getInitialState: function(){
		return {
			token: ''
		}
	},

	onTokenChange: function(e){
		// console.log(e.target.value);
		this.setState({ token: e.target.value })
	},

	handleTokenSubmit: function(e){
		e.preventDefault();

		// console.log('reserTokenData > handleTokenSubmit:', this.state.token);

		var token = this.state.token;

		this.props.verifyPasswordReset(token);

		this.setState({ 
		  token: ''
		});

	},

	render: function(){
		return (
			<div>
				<ConfirmTokenHtml
				message={ this.props.message } 
				errorMessage={ this.props.errorMessage }
				onTokenChange={ this.onTokenChange }
				handleTokenSubmit={ this.handleTokenSubmit }
				setActiveComponent={ this.props.setActiveComponent }
				token={ this.state.token }
				forgotPasswordResend={ this.props.forgotPasswordResend }
				passwordResetEmail={ this.props.passwordResetEmail } 
				passwordResetCount={ this.props.passwordResetCount } 
				/>
			</div>
			)
	}
});

module.exports = ConfirmTokenData;