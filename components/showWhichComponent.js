var React = require('react');
var LogoutUser = require('./userLogout.js');
var UserLoginData = require('./userLoginData.js');
var UserSignupData = require('./userSignupData.js');
var UploadUrlsData = require('./uploadUrlsData.js');
var ConfirmData = require('./ConfirmData.js');
var ErrorPage1 = require('./ErrorPage1.js');
var ErrorPage2 = require('./ErrorPage2.js');


var ShowWhichComponent = React.createClass({
  
  setActiveComponent: function() {
    var user = (this.props.user.user === 'anonymous') ? false : true;
    var submitedToday = this.props.submitedToday
    var submitUrlError = this.props.submitUrlError
    var submitClick = this.props.submitClick
    var activeSubComponent = this.props.activeSubComponent
    console.log('user              =', user, '\nsubmitUrlError    =', submitUrlError, '\nsubmitedToday     =', submitedToday, '\nsubmitClick       =', submitClick, '\nactiveSubComponent=', activeSubComponent);

    if (!submitClick){
      return (
        <div>
          <UploadUrlsData 
          errorMessage={ this.props.errorMessage }
          allDomains={ this.props.allDomains }
          submitUrlsToServer={ this.props.submitUrlsToServer }
          />
        </div>
        )
    } else if(user && submitedToday){
        return (
          <div>
            <ErrorPage1 // no valid urls
            allUrls = { this.props.allUrls }
            allDomains={ this.props.allDomains }
            errorMessage={ this.props.errorMessage }
            />
          </div>
        )
    } else if(user && submitUrlError ){
        return (
          <div>
            <ErrorPage2 //no active domains
            allUrls = { this.props.allUrls }
            allDomains={ this.props.allDomains }
            errorMessage={ this.props.errorMessage }
            />
          </div>
        )
    } else if(user && !submitedToday && submitClick && !submitUrlError){
      return (
        <div>
          <ConfirmData 
          allUrls = { this.props.allUrls }
          allDomains={ this.props.allDomains }
          />
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

