var React = require('react');

var LandingData = require('./landingData.js');
var ErrorSubmittedToday = require('./errorSubmittedToday.js');
var ErrorNoActiveDomains = require('./errorNoActiveDomains.js');
var ErrorConfirmEmail = require('./errorConfirmEmail.js');
var ConfirmData = require('./confirmData.js');
var UserLoginData = require('./userLoginData.js');
var UserSignupData = require('./userSignupData.js');
var ForgotPasswordData = require('./forgotPasswordData.js');
var ResetTokenData = require('./resetTokenData.js');
var ResetPasswordData = require('./resetPasswordData.js');
var SuggestData = require('./suggestData.js');


var ShowWhichComponent = React.createClass({
  
  setActiveComponent: function() {
    var activeComponent = this.props.activeComponent

    if (activeComponent === 'landing'){
      return (
        <div>
          <LandingData
          message={ this.props.message } 
          allDomains={ this.props.allDomains }
          handleSubmitClick={ this.props.handleSubmitClick }
          onUrlChange={ this.props.onUrlChange }
          setActiveComponent={ this.props.setActiveComponent }
          />
        </div>
        )
    } else if(activeComponent === 'submittedToday'){
      return (
        <div>
          <ErrorSubmittedToday
          message={ this.props.message }
          allDomains={ this.props.allDomains }
          allUrls = { this.props.allUrls }
          />
        </div>
        )
    } else if(activeComponent === 'noActiveDomains'){
      return (
        <div>
          <ErrorNoActiveDomains
          message={ this.props.message }
          allDomains={ this.props.allDomains }
          allUrls = { this.props.allUrls }
          />
        </div>
        )
    } else if(activeComponent === 'confirm'){
      return (
        <div>
          <ConfirmData
          message={ this.props.message } 
          allDomains={ this.props.allDomains }
          allUrls = { this.props.allUrls }
          />
        </div>
        )
    } else if(activeComponent === 'login'){
      return (
        <div>
          <UserLoginData
          message={ this.props.message } 
          allDomains={ this.props.allDomains }
          loginUserFromServer={ this.props.loginUserFromServer }
          setActiveComponent={ this.props.setActiveComponent }
          />
        </div>
        )
    } else if(activeComponent === 'signup'){
      return (
        <div>
          <UserSignupData
          message={ this.props.message }
          allDomains={ this.props.allDomains }
          signupUserFromServer={ this.props.signupUserFromServer }
          setActiveComponent={ this.props.setActiveComponent }
          />
        </div>
        )
    } else if(activeComponent === 'errorConfirmEmail'){
      return (
        <div>
          <ErrorConfirmEmail
          message={ this.props.message }
          setActiveComponent={ this.props.setActiveComponent }
          handleEmailConfirm={ this.props.handleEmailConfirm }
          resendVerifyToken={ this.props.resendVerifyToken }
          />
        </div>
        )
    } else if(activeComponent === 'forgotPassword'){
      return (
        <div>
          <ForgotPasswordData
          message={ this.props.message }
          setActiveComponent={ this.props.setActiveComponent }
          forgotPassword={ this.props.forgotPassword }
          />
        </div>
        )
    } else if(activeComponent === 'resetToken'){
      return (
        <div>
          <ResetTokenData
          message={ this.props.message }
          setActiveComponent={ this.props.setActiveComponent }
          submitResetToken={ this.props.submitResetToken }
          resetToken={ this.props.resetToken }
          />
        </div>
        )
    } else if(activeComponent === 'resetPassword'){
      return (
        <div>
          <ResetPasswordData
          message={ this.props.message }
          setActiveComponent={ this.props.setActiveComponent }
          submitNewPassword={ this.props.submitNewPassword }
          resetToken={ this.props.resetToken }
          />
        </div>
        )
    } else if(activeComponent === 'suggest'){
      return (
        <div>
          <SuggestData
          message={ this.props.message }
          setActiveComponent={ this.props.setActiveComponent }
          submitSuggestedDomains={ this.props.submitSuggestedDomains }
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

