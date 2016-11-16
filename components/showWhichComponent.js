var React = require('react');

var LandingData = require('./landingData.js');
var ErrorSubmittedToday = require('./errorSubmittedToday.js');
var ErrorNoActiveDomains = require('./errorNoActiveDomains.js');
var ErrorConfirmEmail = require('./errorConfirmEmail.js');
var ConfirmData = require('./confirmData.js');
var UserLoginData = require('./userLoginData.js');
var UserSignupData = require('./userSignupData.js');


var ShowWhichComponent = React.createClass({
  
  setActiveComponent: function() {
    var activeComponent = this.props.activeComponent

    if (activeComponent === 'landing'){
      return (
        <div>
          <LandingData 
          errorMessage={ this.props.errorMessage }
          allDomains={ this.props.allDomains }
          handleSubmitClick={ this.props.handleSubmitClick }
          />
        </div>
        )
    } else if(activeComponent === 'submittedToday'){
      return (
        <div>
          <ErrorSubmittedToday
          errorMessage={ this.props.errorMessage }
          allDomains={ this.props.allDomains }
          allUrls = { this.props.allUrls }
          />
        </div>
        )
    } else if(activeComponent === 'noActiveDomains'){
      return (
        <div>
          <ErrorNoActiveDomains
          errorMessage={ this.props.errorMessage }
          allDomains={ this.props.allDomains }
          allUrls = { this.props.allUrls }
          />
        </div>
        )
    } else if(activeComponent === 'confirm'){
      return (
        <div>
          <ConfirmData 
          allUrls = { this.props.allUrls }
          allDomains={ this.props.allDomains }
          />
        </div>
        )
    } else if(activeComponent === 'login'){
      return (
        <div>
          <UserLoginData 
          errorMessage={ this.props.errorMessage }
          loginUserFromServer={ this.props.loginUserFromServer }
          setActiveComponent={ this.props.setActiveComponent }
          />
        </div>
        )
    } else if(activeComponent === 'signup'){
      return (
        <div>
          <UserSignupData
          errorMessage={ this.props.errorMessage }
          signupUserFromServer={ this.props.signupUserFromServer }
          setActiveComponent={ this.props.setActiveComponent }
          />
        </div>
        )
    } else if(activeComponent === 'errorConfirmEmail'){
      return (
        <div>
          <ErrorConfirmEmail
          errorMessage={ this.props.errorMessage }
          setActiveComponent={ this.props.setActiveComponent }
          handleEmailConfirm={ this.props.handleEmailConfirm }
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

