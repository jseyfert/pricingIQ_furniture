var React = require('react');

var ConfirmEmail = require('./partialComps/user/confirmEmail.js');
var ConfirmToken = require('./partialComps/user/confirmToken.js');
var ForgotPassword = require('./partialComps/user/forgotPassword.js');
var Login = require('./partialComps/user/login.js');
var ResetPassword = require('./partialComps/user/resetPassword.js');
var Signup = require('./partialComps/user/signup.js');

var Faq = require('./faq.js');
var Landing = require('./landing.js');
var DeleteComplete = require('./deleteComplete.js');
var OrderComplete = require('./orderComplete.js');
var OrderIncomplete = require('./orderIncomplete.js');
var Dashboard = require('./dashboard.js');
var CustAdmin = require('./custAdmin.js');


var ShowWhichComponent = React.createClass({
  setActiveComponent: function() {
  // console.log(this.props.customerId )
    var activeComponent = this.props.activeComponent
    if (activeComponent === 'landing'){
     return (
      <div>
        <Landing
        submitSuggestedDomains={ this.props.submitSuggestedDomains }
        customersLoading={ this.props.customersLoading } 
        domainsLoading={ this.props.domainsLoading } 
        urlsUploading={ this.props.urlsUploading } 
        userLoading={ this.props.userLoading } 
        message={ this.props.message } 
        customerId={ this.props.customerId } 
        customerName={ this.props.customerName } 
        urlType={ this.props.urlType } 
        allDomains={ this.props.allDomains }
        handleUrlSubmit={ this.props.handleUrlSubmit }
        handleCustomerSelect={ this.props.handleCustomerSelect }
        handleUrlTypeSelect={ this.props.handleUrlTypeSelect }
        onTextChange={ this.props.onTextChange }
        setActiveComponent={ this.props.setActiveComponent }
        allUrls = { this.props.allUrls }
        user={ this.props.user }
        customers={ this.props.customers }
        rawText={ this.props.rawText } 
        />
      </div>
      )
    } else if(activeComponent === 'dashboard'){
      return (
        <div>
          <Dashboard
          customers={ this.props.customers }
          customerIdDashboard={ this.props.customerIdDashboard }
          domainsLoading={ this.props.domainsLoading }
          userLoading={ this.props.userLoading }
          customersLoading={ this.props.customersLoading }
          urlsUploading={ this.props.urlsUploading }
          customerNameDashboard={ this.props.customerNameDashboard } 
          urlTypeDashboard={ this.props.urlTypeDashboard } 
          allSubmittedUrlsPerCustomer={ this.props.allSubmittedUrlsPerCustomer } 
          urlsDownloading={ this.props.urlsDownloading } 
          showSubmittedUrls={ this.props.showSubmittedUrls } 
          selectAll={ this.props.selectAll } 
          showSpiderName={ this.props.showSpiderName } 
          handleShowSpiderName={ this.props.handleShowSpiderName} 
          
          handleDeleteUrls={this.props.handleDeleteUrls }
          handleSelectUrlToDelete={ this.props.handleSelectUrlToDelete }
          handleSelectAllUrlToDelete={ this.props.handleSelectAllUrlToDelete }
          handleSelectNoneUrlToDelete={ this.props.handleSelectNoneUrlToDelete }
          handleCustomerSelectDashboard={ this.props.handleCustomerSelectDashboard }
          handleUrlTypeSelectDashboard={ this.props.handleUrlTypeSelectDashboard }
          handleGetSubmitedUrls={ this.props.handleGetSubmitedUrls } 
          />
        </div>
        )
    } else if(activeComponent === 'custAdmin'){
      return (
        <div>
          <CustAdmin
          />
        </div>
        )
    } else if(activeComponent === 'deleteComplete'){
      return (
        <div>
          <DeleteComplete
          deleteCount={ this.props.deleteCount }
          />
        </div>
        )
    }else if(activeComponent === 'orderIncomplete'){
      return (
        <div>
          <OrderIncomplete
          message={ this.props.message }
          allDomains={ this.props.allDomains }
          allUrls = { this.props.allUrls }
          />
        </div>
        )
    } else if(activeComponent === 'orderComplete'){
      return (
        <div>
          <OrderComplete
          message={ this.props.message } 
          allDomains={ this.props.allDomains }
          allUrls = { this.props.allUrls }
          customerName={ this.props.customerName }
          />
        </div>
        )
    } else if(activeComponent === 'login'){
      return (
        <div>
          <Login
          message={ this.props.message } 
          urlsUploading={ this.props.urlsUploading } 
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
          urlsUploading={ this.props.urlsUploading }
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

