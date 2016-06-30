var React = require('react');
var LogoutUser = require('./userLogout.js');
var UserLoginData = require('./userLoginData.js');
var UserSignupData = require('./userSignupData.js');

function AwareOfUser(props){
		if(props.user.user !== "anonymous"){
			return (
			<div>
				<LogoutUser logoutUser={ props.logoutUser } />
				<h2> Hello { props.user.user.username } </h2>

			</div>
			)
		} else {
			return (
				<div>
				<h1> Welcome Please sign in </h1>
				<UserLoginData loginUserFromServer={ props.loginUserFromServer } />
				<UserSignupData signupUserFromServer={ props.signupUserFromServer }/>
				</div>
				)
		}
		
		

};

module.exports = AwareOfUser;