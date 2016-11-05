var React = require('react');
var LogoutUser = require('./userLogout.js');
var UserLoginData = require('./userLoginData.js');
var UserSignupData = require('./userSignupData.js');
var UploadUrlsData = require('./uploadUrlsData.js');


var checkUserLastSubmit = function (){

}

function ShowWhichComponent(props){
		if(/*props.user.user !== "anonymous" && timeCheck2*/ true){
			return (
					<UploadUrlsData 
					submitUrlsToServer={ props.submitUrlsToServer }
					/>
				)
		} else if (/*props.activeComponent === "login"*/ false) {
			return (
				<div>
				  <UserLoginData 
				  loginUserFromServer={ props.loginUserFromServer }
				  loginUserFromServer2={ props.loginUserFromServer2 }
				  setActiveComponent={ props.setActiveComponent }
				  />
				</div>
				)
		} else {
			return (
				<div>
				  <UserSignupData
				  signupUserFromServer={ props.signupUserFromServer }
				  setActiveComponent={ props.setActiveComponent }
				  />
				</div>
				)
		}
};

module.exports = ShowWhichComponent;

//<h2> Hello { props.user.user.username } </h2>
// LogoutUser logoutUser={ props.logoutUser } />


	// var timeCheck = props.user.lastUrlSubmit
	// var timeCheck1 = now - props.user.lastUrlSubmit
	// var timeCheck2 = (now - props.user.lastUrlSubmit >= 86400000 ) ? true : false ;
	// var timeCheck3 = (now - props.user.lastUrlSubmit <= 86400000 ) ? true : false ;
	// console.log(timeCheck, timeCheck1, timeCheck2, timeCheck3, 'in time check');

//<UploadUrlsData loginUserFromServer={ props.loginUserFromServer }  />