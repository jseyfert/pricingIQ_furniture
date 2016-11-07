var React = require('react');
var LogoutUser = require('./userLogout.js');
var UserLoginData = require('./userLoginData.js');
var UserSignupData = require('./userSignupData.js');
var UploadUrlsData = require('./uploadUrlsData.js');
var UploadConfirmData = require('./uploadConfirmData.js');


function ShowWhichComponent(props){
// console.log(props.submitClicked);
		if(props.submitClicked === false){
			return (
				<div>
					<UploadUrlsData 
          submitUrlsToServer={ props.submitUrlsToServer }
					allDomains={ props.allDomains }
					/>
				</div>
				)
		} else if (props.user.user === "anonymous" && props.activeComponent === "login") {
			return (
				<div>
				  <UserLoginData 
				  loginUserFromServer={ props.loginUserFromServer }
				  setActiveComponent={ props.setActiveComponent }
				  />
				</div>
				)
		} else if (props.user.user === "anonymous" && props.activeComponent === "signup")  {
			return (
				<div>
				  <UserSignupData
				  signupUserFromServer={ props.signupUserFromServer }
				  setActiveComponent={ props.setActiveComponent }
				  />
				</div>
				)
		} else if (props.user.user !== "anonymous")  {
			return (
				<div>
					<UploadConfirmData 
          allSubmittedUrls = { props.allSubmittedUrls }
          allDomains={ props.allDomains }
          />
				</div>
				)
		} else {
      return (
        <div>
ERROR ALREADY SUBMITTED
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