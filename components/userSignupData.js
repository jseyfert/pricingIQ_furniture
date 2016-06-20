//UserAuth
//	UserLoginData
//		UserLoginForm
//	UserSignupData
//		UserSignupForm

var React = require('react');
var UserSignupForm = require('./userSignupForm.js');

var UserSignupData = React.createClass({
	render: function(){
		return (
			<div>
				<UserSignupForm />
			</div>
			)
	}
});

module.exports = UserSignupData;