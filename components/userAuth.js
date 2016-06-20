//UserAuth
//	UserLoginData
//		UserLoginForm
//	UserSignupData
//		UserSignupForm


var React = require('react');
var ReactDOM = require('react-dom');
var UserLoginData = require('./userLoginData.js');
var UserSignupData = require('./userSignupData.js');

var UserAuth = React.createClass({
	getInitialState: function(){
		return {
			user: null
		}
	},

	loginUserFromServer: function(user){
		console.log(user);
		$.ajax({
			method: 'POST',
			url: '/login',
			data: user,
			success: function(data){
				console.log(data);
			},
			error: function(xhr, status, err){
				console.error('/login', status, err.toString())
			}
		})
	},

	signupUserFromServer: function(user){

	},

	render: function(){
		return (
			<div>
				<div className="container color">
					<UserLoginData loginUserFromServer={ this.loginUserFromServer }/>
					<UserSignupData />
				</div>
			</div>
			)
	}
});

ReactDOM.render(
	<UserAuth/>,
	document.getElementById('app')
);