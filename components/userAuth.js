//UserAuth
//	UserLoginData
//		UserLoginForm
//	UserSignupData
//		UserSignupForm


var React = require('react');
var ReactDOM = require('react-dom');
var UserLoginData = require('./userLoginData.js');
var UserSignupData = require('./userSignupData.js');
var LogoutUser = require('./userLogout.js');



var UserAuth = React.createClass({
	getInitialState: function(){
		return {
			user: null
		}
	},

	loginUserFromServer: function(user){
		$.ajax({
			method: 'POST',
			url: '/login',
			data: user,
			success: function(data){
				console.log("Login successful.");
			},
			error: function(xhr, status, err){
				console.error('/login', status, err.toString())
			}
		})
	},

	signupUserFromServer: function(user){
		$.ajax({
			method: 'POST',
			url: '/signup',
			data: user, 
			success: function(data){
				console.log("Signup successful.", data);
			},
			error: function(xhr, status, err){
				console.error('/signup', status, err.toString())
			}
		})

	},

	logoutUser: function(){
		var self = this;
		$.ajax({
			url: '/logout',
			method: 'GET', 
			success: function(){
				self.setState({ user: null });
				console.log("Logout successful.");
			},
			error: function(xhr, status, err){
				console.error('/logout', status, err.toString());
			}
		})
		
	},

	render: function(){

		return (
			<div>
				<div className="container">
					<UserLoginData loginUserFromServer={ this.loginUserFromServer } />
					<UserSignupData signupUserFromServer={ this.signupUserFromServer }/>
					<LogoutUser logoutUser={ this.logoutUser } />
				</div>
			</div>
			)
	}
});

ReactDOM.render(
	<UserAuth/>,
	document.getElementById('app')
);