var React = require('react');
var LogoutUser = require('./userLogout.js');
var UserLoginData = require('./userLoginData.js');
var UserSignupData = require('./userSignupData.js');
var UploadUrlsData = require('./uploadUrlsData.js');

function AwareOfUser(props){
	var usernamePass = props.user.username;
	console.log(usernamePass, 'one');
		if(props.user.user !== "anonymous"){
			return (
				<div>
					<UploadUrlsData logoutUser={ props.logoutUser } usernamePass={ usernamePass }  />
				</div>
			)
		} else if (props.activeComponent === "login") {
			return (
				<div>
				  <UserLoginData loginUserFromServer={ props.loginUserFromServer } setActiveComponent={ props.setActiveComponent } />
				</div>
				)
		} else {
			return (
				<div>
				  <UserSignupData signupUserFromServer={ props.signupUserFromServer } setActiveComponent={ props.setActiveComponent } />
				</div>
				)
		}
};

module.exports = AwareOfUser;

//<h2> Hello { props.user.user.username } </h2>
// LogoutUser logoutUser={ props.logoutUser } />

//<UploadUrlsData loginUserFromServer={ props.loginUserFromServer }  />