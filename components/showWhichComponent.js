var React = require('react');

var ConfirmEmail = require('./userComps/confirmEmail.js');
var ConfirmToken = require('./userComps/confirmToken.js');
var ForgotPassword = require('./userComps/forgotPassword.js');
var Login = require('./userComps/login.js');
var ResetPassword = require('./userComps/resetPassword.js');
var Signup = require('./userComps/signup.js');

var DisplayUrls = require('./displayUrls.js');
var Faq = require('./faq.js');
var Landing = require('./landing.js');
var NoActiveDomains = require('./noActiveDomains.js');
var SubmittedToday = require('./submittedToday.js');


var ShowWhichComponent = React.createClass({
  
  setActiveComponent: function() {
    var activeComponent = this.props.activeComponent
    // console.log(this.props.allUrls);
    if (activeComponent === 'landing'){
       return (
        <div>
          <Landing
          domainsLoading={ this.props.domainsLoading } 
          userLoading={ this.props.userLoading } 
          message={ this.props.message } 
          allDomains={ this.props.allDomains }
          handleUrlSubmit={ this.props.handleUrlSubmit }
          onTextChange={ this.props.onTextChange }
          setActiveComponent={ this.props.setActiveComponent }
          allUrls = { this.props.allUrls }
          user={ this.props.user }
          rawText={ this.props.rawText } 
          />
        </div>
        )
    } else if(activeComponent === 'submittedToday'){
      return (
        <div>
          <SubmittedToday
          message={ this.props.message }
          allDomains={ this.props.allDomains }
          allUrls = { this.props.allUrls }
          />
        </div>
        )
    } else if(activeComponent === 'noActiveDomains'){
      return (
        <div>
          <NoActiveDomains
          message={ this.props.message }
          allDomains={ this.props.allDomains }
          allUrls = { this.props.allUrls }
          />
        </div>
        )
    } else if(activeComponent === 'displayUrls'){
      return (
        <div>
          <DisplayUrls
          message={ this.props.message } 
          allDomains={ this.props.allDomains }
          allUrls = { this.props.allUrls }
          />
        </div>
        )
    } else if(activeComponent === 'login'){
      return (
        <div>
          <Login
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
          <Signup
          message={ this.props.message }
          allDomains={ this.props.allDomains }
          signupUserFromServer={ this.props.signupUserFromServer }
          setActiveComponent={ this.props.setActiveComponent }
          />
        </div>
        )
    } else if(activeComponent === 'confirmEmail'){
      return (
        <div>
          <ConfirmEmail
          message={ this.props.message }
          setActiveComponent={ this.props.setActiveComponent }
          emailVerification={ this.props.emailVerification }
          emailVerificationResend={ this.props.emailVerificationResend }
          emailVerificationCount={ this.props.emailVerificationCount }
          />
        </div>
        )
    } else if(activeComponent === 'forgotPassword'){
      return (
        <div>
          <ForgotPassword
          message={ this.props.message }
          setActiveComponent={ this.props.setActiveComponent }
          forgotPassword={ this.props.forgotPassword }
          />
        </div>
        )
    } else if(activeComponent === 'confirmToken'){
      return (
        <div>
          <ConfirmToken
          message={ this.props.message }
          setActiveComponent={ this.props.setActiveComponent }
          verifyPasswordReset={ this.props.verifyPasswordReset }
          forgotPasswordResend={ this.props.forgotPasswordResend }
          passwordResetEmail={ this.props.passwordResetEmail } 
          passwordResetCount={ this.props.passwordResetCount } 
          />
        </div>
        )
    } else if(activeComponent === 'resetPassword'){
      return (
        <div>
          <ResetPassword
          message={ this.props.message }
          setActiveComponent={ this.props.setActiveComponent }
          resetPassword={ this.props.resetPassword }
          resetToken={ this.props.resetToken }
          />
        </div>
        )
    } else if(activeComponent === 'faq'){
      return (
        <div>
          <Faq
          message={ this.props.message }
          setActiveComponent={ this.props.setActiveComponent }
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

