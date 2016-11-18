var React = require('react');
var ResetTokenHtml = require('./resetTokenHtml.js');

var ResetTokenData = React.createClass({
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

		this.props.submitResetToken(token);

		this.setState({ 
		  token: ''
		});

	},

	render: function(){
		return (
			<div>
				<ResetTokenHtml 
				errorMessage={ this.props.errorMessage }
				onTokenChange={ this.onTokenChange }
				handleTokenSubmit={ this.handleTokenSubmit }
				setActiveComponent={ this.props.setActiveComponent }
				token={ this.state.token }
				/>
			</div>
			)
	}
});

module.exports = ResetTokenData;