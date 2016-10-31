
var React = require('react');
var UploadUrlsForm = require('./uploadUrlsForm.js');

var UploadUrlsData = React.createClass({
	getInitialState: function(){
		return {
			url: ''
		}
	},

	onUrlChange: function(e){
		this.setState({ url: e.target.value })
	},

	handleUrlSubmit: function(e){
		e.preventDefault();

		console.log('boom yes');
	},

	render: function(){
		return (
			<div>
				<UploadUrlsForm 
				test={ this.props.test }
				logoutUser={ this.props.logoutUser } 
				handleUrlSubmit={ this.handleUrlSubmit }
				onUrlChange={ this.onUrlChange }
				url={ this.state.url }
				/>
			</div>
			)
	}
});

module.exports = UploadUrlsData;