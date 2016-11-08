var React = require('react');
var LogoutUser = require('./userLogout.js');
var UserLoginData = require('./userLoginData.js');
var UserSignupData = require('./userSignupData.js');
var UploadUrlsData = require('./uploadUrlsData.js');
var ConfirmData = require('./ConfirmData.js');
var ErrorPage = require('./ErrorPage.js');


var ShowWhichComponent = React.createClass({
  
  setActiveComponent: function() {
    var user = (this.props.user.user === 'anonymous') ? false : true;
    var okToSubmit = this.props.okToSubmit
    var submitClicked = this.props.submitClicked
    var activeSubComponent = this.props.activeSubComponent
    console.log('in setActiveComp', '\nuser=', user, '\nokToSubmit=', okToSubmit, '\nsubmitClicked=', submitClicked, '\nactiveSubComponent=', activeSubComponent );

    if (!submitClicked){
      return (
        <div>
          <UploadUrlsData 
          allDomains={ this.props.allDomains }
          submitUrlsToServer={ this.props.submitUrlsToServer }
          />
        </div>
        )
    } else if(user && okToSubmit && submitClicked){
      return (
        <div>
          <ConfirmData 
          allUrls = { this.props.allUrls }
          allDomains={ this.props.allDomains }
          />
        </div>
        )
    } else if(user && !okToSubmit && submitClicked){
        return (
          <div>
            <ErrorPage/>
          </div>
        )
    } else if(!user && activeSubComponent === 'login'){
      return (
        <div>
          <UserLoginData 
          errorMessage={ this.props.errorMessage }
          loginUserFromServer={ this.props.loginUserFromServer }
          setActiveSubComponent={ this.props.setActiveSubComponent }
          />
        </div>
        )
    } else if(!user && activeSubComponent === 'signup'){
      return (
        <div>
          <UserSignupData
          errorMessage={ this.props.errorMessage }
          signupUserFromServer={ this.props.signupUserFromServer }
          setActiveSubComponent={ this.props.setActiveSubComponent }
          />
        </div>
        )
    } else {
      return (
        <div>
          NOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!
        </div>
        )
    }
  },

  render: function() {
    return (
      <div>
        {this.setActiveComponent()}
      </div>           
      )
  }

});

module.exports = ShowWhichComponent;

