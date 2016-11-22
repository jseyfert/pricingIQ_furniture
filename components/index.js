
var React = require('react');
var ReactDOM = require('react-dom');

var ShowWhichComponent = require('./showWhichComponent.js');
var Header = require('./header.js');
var Footer = require('./footer.js');
var _ = require("underscore");
// console.log('process.env', process.env);

var Index = React.createClass({
	
  getInitialState: function(){
		return {
      user: null,
      passwordResetToken: null,
      message: null,
      suggest: null,
      submittedToday: null,
      noActiveDomains: null,
      activeComponent: 'landing',
			allUrls: [],
			allDomains: 
			[{domain: 'amazon' , domainAvailable: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/200px-Amazon.com-Logo.svg.png'},
			{domain: 'walmart', domainAvailable: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Wal-Mart_logo.svg/200px-Wal-Mart_logo.svg.png'},
			{domain: 'sears' ,  domainAvailable: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sears_logo_2010-present.svg/170px-Sears_logo_2010-present.svg.png'}]
		}

	},

	getOneUserFromServer: function(){
		var currentTime = new Date().getTime()
		var self = this;

		$.ajax({
			method: 'GET', 
			url: '/oneUser'
		}).done(function(data){
			self.setState({ 
        user: data,
        suggest: null,
        submittedToday: data.canSubmitAfter ? (currentTime < data.canSubmitAfter) : null,
        message: null,
			});
		})

	},

  updateUser: function(user, urls){
    var midnightTonight = new Date().setHours(23,59,59,0);
    var self = this;

      $.ajax({
        method: 'PUT',
        url: '/updateUser',
        data: { user: user, canSubmitAfter: midnightTonight},
        success: function(data){
          self.setState({ 
            user: data,
            suggest: null,
            activeComponent: 'confirm',
            submittedToday: true,
            allUrls: urls,
            message: null,
          });
        },
        error: function(xhr, status, err){
          console.error('/updateUser', status, err.toString())
        }
      })

  }, 

  handleEmailConfirm: function(){
    var urls = this.state.allUrls
    var suggest = this.state.suggest
    var noActiveDomains = (_.where(urls, {domainAvailable: true}).length === 0) ? true : false
    var urlsSubmitted = (this.state.allUrls.length > 0)
    var self = this;

    $.ajax({
      method: 'GET', 
      url: '/oneUser'
    }).done(function(data){
      var verified = data.verified
     
      if (!verified) {
        self.setState({ 
          user: data,
          // suggest: null,
          activeComponent: 'errorConfirmEmail',
          noActiveDomains: noActiveDomains,
          allUrls: urls,
          message: { message: 'User has not been verified. Please check your email.', alert: "alert alert-danger" },
        })
      } else if (suggest){
        self.setState({ 
          user: data,
          suggest: null,
          activeComponent: 'suggest',
          noActiveDomains: noActiveDomains,
          allUrls: urls,
          message: null
        })
      } else if (!urlsSubmitted) {
        self.setState({ 
          user: data,
          // suggest: null,
          activeComponent: 'landing',
          noActiveDomains: noActiveDomains,
          allUrls: urls,
          message: null,
        })
      }else if (noActiveDomains){
        self.setState({ 
          user: data,
          // suggest: null,
          activeComponent: 'noActiveDomains',
          noActiveDomains: noActiveDomains,
          allUrls: urls,
          message: null,
        })
      } else {
        // this.helperConsoleLog('# SUBMIT W/ USER-ID')
        // console.log('# SUBMIT W/ USER-ID');                                            //submit with userID   #1
        // console.log('# UPDATE USER');                                                  //***UPDATE USER***

        self.updateUser(self.state.user, urls);
      }
    })

  },

 

  loginUserFromServer: function(user){
    var urls = this.state.allUrls
    var currentTime = new Date().getTime()
    var self = this;

    $.ajax({
      method: 'POST',
      url: '/login',
      data: user,
      success: function(data){
        var verified = data.user.verified
        var submittedToday = (currentTime < data.user.canSubmitAfter);
        var suggest = self.state.suggest
        var noActiveDomains = self.state.noActiveDomains;
        var urlsSubmitted = (self.state.allUrls.length > 0)
        
        if (!verified) {
          self.setState({ 
            user: data.user,
            // suggest: null,
            activeComponent: 'errorConfirmEmail',
            noActiveDomains: noActiveDomains,
            submittedToday: submittedToday,
            message: { message: 'You have not yet verified your email. Please check your email.', alert: "alert alert-danger" },
          })
        } else if (suggest){
          self.setState({ 
            user: data.user,
            suggest: null,
            activeComponent: 'suggest',
            noActiveDomains: noActiveDomains,
            submittedToday: submittedToday,
            message: null
          })
        } else if (!urlsSubmitted){
          self.setState({ 
            user: data.user,
            // suggest: null,
            activeComponent: 'landing',
            noActiveDomains: noActiveDomains,
            submittedToday: submittedToday,
            message: null,
          })
        } else if (submittedToday) {
          self.setState({ 
            user: data.user,
            // suggest: null,
            activeComponent: 'submittedToday',
            noActiveDomains: noActiveDomains,
            submittedToday: submittedToday,
            message: null,
          })
        } else if (noActiveDomains){
          self.setState({ 
            user: data.user,
            // suggest: null,
            activeComponent: 'noActiveDomains',
            noActiveDomains: noActiveDomains,
            submittedToday: submittedToday, 
            message: null,
          })
        } else {
          // this.helperConsoleLog('# SUBMIT W/ USER-ID')
          // console.log('#3 SUBMIT W/ USER-ID');                                            //submit with userID #3
          // console.log('#3 UPDATE USER');                                                  //***UPDATE USER***
          
          self.updateUser(data.user, urls);

        }
      },
      error: function(xhr, status, err){
        // console.error('/login', status, err, xhr.responseJSON)
        self.setState({ 
          activeComponent: 'login',
          suggest: null,
          message: {message: xhr.responseJSON, alert: 'alert alert-danger'},
        });
      }
    })  

  },

  signupUserFromServer: function(user){
    var suggest = this.state.suggest
    var urls = this.state.allUrls
    var self = this;

    $.ajax({
      method: 'POST',
      url: '/signup',
      data: user, 
      success: function(data){
        var verified = data.user.verified
        var noActiveDomains = self.state.noActiveDomains;
        var urlsSubmitted = (self.state.allUrls.length > 0)

        if (!verified) {
          self.setState({ 
            user: data.user,
            // suggest: null,
            activeComponent: 'errorConfirmEmail',
            submittedToday: false,
            noActiveDomains: noActiveDomains,
            message: { message: 'Please check email to verify user.', alert: 'alert alert-info' },
          })
        } else if (suggest){
          self.setState({ 
            user: data.user,
            suggest: null,
            activeComponent: 'suggest',
            noActiveDomains: noActiveDomains,
            submittedToday: submittedToday,
            message: null
          })
        } else if(!urlsSubmitted){
          self.setState({ 
            user: data.user,
            // suggest: null,
            activeComponent: 'landing',
            submittedToday: false, 
            noActiveDomains: noActiveDomains,
          })
        } else if (noActiveDomains){
          self.setState({ 
            user: data.user,
            // suggest: null,
            activeComponent: 'noActiveDomains',
            submittedToday: false, 
            noActiveDomains: noActiveDomains,
          })
        } else {
          // this.helperConsoleLog('# SUBMIT W/ USER-ID')
          // console.log('# SUBMIT W/ USER-ID');                                            //submit with userID #4
          // console.log('# UPDATE USER');                                                  //***UPDATE USER***

          self.updateUser(data.user, urls);

        }
      },
      error: function(xhr, status, err){
        self.setState({ 
          activeComponent: 'signup',
          suggest: null,
          message: {message: xhr.responseJSON, alert: 'alert alert-danger'},
        });
      }
    })

  },

  logoutUser: function(user){
    var self = this;

    $.ajax({
      url: '/logout',
      method: 'GET', 
      success: function(data){
        $.ajax({
          method: 'GET', 
          url: '/oneUser'
        }).done(function(data){
          self.setState({ 
            user: data,
            suggest: null,
            activeComponent: 'landing',
            submittedToday: null,
            allUrls: [],
            message: null,
          });
        })
      }.bind(self),
      error: function(xhr, status, err){
        console.error('/logout', status, err.toString());
      }
    })

  },

  forgotPassword: function(user){
    var self = this;

      $.ajax({
        method: 'POST',
        url: '/forgot',
        data: { user: user},
        success: function(data){
          console.log(data)
          var valid = data.valid
          var message = data.message
          if (valid) {
            self.setState({ 
              activeComponent: 'resetToken',
              // suggest: null,
              message: message,
            });
          } else {
            self.setState({ 
                activeComponent: 'forgotPassword',
                // suggest: null,
                message: message,
            });
          }
        },
        error: function(xhr, status, err){
          console.error('/forgot', status, err.toString())
        }
      })

  },  

  submitSuggestedDomains: function(domains) {
    var self = this;

      $.ajax({
        method: 'POST',
        url: '/suggest',
        data: { domains: domains},
        success: function(data){
          var activeComponent = data.activeComponent
          self.setState({ 
              activeComponent: activeComponent,
              suggest: null,
              // message: message,
          });
        },
        error: function(xhr, status, err){
          console.error('/suggest', status, err.toString())
        }
      })

  },

  submitResetToken: function(token) {
    var self = this;

      $.ajax({
        method: 'GET',
        url: '/verifyReset/' + token,
        data: { token: token},
        success: function(data){
          var activeComponent = data.activeComponent
          var message = data.message
          var passwordResetToken = data.passwordResetToken ? data.passwordResetToken : null;

          self.setState({ 
              activeComponent: activeComponent,
              // suggest: null,
              passwordResetToken: passwordResetToken,
              message: message,
          });
        },
        error: function(xhr, status, err){
          console.error('/verifyReset', status, err.toString())
        }
      })

  }, 

  submitNewPassword: function(password) {
    var passwordResetToken = this.state.passwordResetToken
    var self = this;

      $.ajax({
        method: 'PUT',
        url: '/reset',
        data: { password: password, passwordResetToken: passwordResetToken },
        success: function(data){
          var activeComponent = data.activeComponent
          var message = data.message
          var valid = data.valid
          self.setState({ 
              message: message,
              // suggest: null,
              activeComponent: activeComponent,
          });
        },
        error: function(xhr, status, err){
          console.error('/reset', status, err.toString())
        }
      })

  },

  resendVerifyToken: function() {
    var user = this.state.user
    var self = this;

      $.ajax({
        method: 'PUT',
        url: '/verifyResend',
        data: {user, user},
        success: function(data){
          var activeComponent = data.activeComponent
          var message = data.message
          self.setState({ 
              message: message,
              // suggest: null,
              activeComponent: activeComponent,
          });
        },
        error: function(xhr, status, err){
          console.error('/verifyResend', status, err.toString())
        }
      })

  },

  ////non user/// 

  handleSubmitClick: function(urls){
    var user = (this.state.user.user === 'anonymous') ? false : true;
    var verified = (this.state.user.user === 'anonymous') ? null : this.state.user.verified
    var errorNoUrls = (urls.length === 0) ? true : false;
    var submittedToday = this.state.submittedToday
    var noActiveDomains = (_.where(urls, {domainAvailable: true}).length === 0) ? true : false

    if(user){
      if (errorNoUrls) {
        this.setState({ 
          activeComponent: 'landing',
          suggest: null,
          allUrls: urls,
          message: { message: 'Please submit at least one valid Url',  alert: null }
        })
      } else if(!verified) {
        this.setState({
          activeComponent: 'errorConfirmEmail',
          suggest: null,
          allUrls: urls,
          message: { message: 'You have not yet verified your email. Please check your email.',  alert: "alert alert-danger" }
        })
      } else if (submittedToday) {
        this.setState({
          activeComponent: 'submittedToday',
          suggest: null,
          allUrls: urls
        })
      } else if (noActiveDomains){
        this.setState({ 
          activeComponent: 'noActiveDomains',
          suggest: null,
          allUrls: urls
      })
      } else {
        // console.log('# SUBMIT W/ USER-ID');                                            //submit with userID   #1
        // console.log('# UPDATE USER');                                                  //***UPDATE USER***
        this.updateUser(this.state.user, urls);
      }
    } else if (!user) {   
      if (errorNoUrls) {
        this.setState({ 
          activeComponent: 'landing',
          suggest: null, 
          allUrls: urls, 
          message: { message: 'Please submit at least one valid Url',  alert: null }
        })
      } else {
        // console.log('# SUBMIT W/OUT USER-ID');                                         //submit withOUT userID #2
        this.setState({ 
          activeComponent: 'login', 
          suggest: null,
          noActiveDomains: noActiveDomains, 
          allUrls: urls,
          message: null,
        })
      }
    }

  },

  setActiveComponent: function(componentName) {
    var user = (this.state.user.user === 'anonymous') ? false : true;
    // console.log(user);
    if(componentName === 'suggest' && user){
      // console.log('in suggest user')
      this.setState({
        activeComponent: componentName,
        suggest: null,
        message: null,
      })
    } else if(componentName === 'suggest' && !user){
    // console.log('in suggest no user')
      this.setState({
        activeComponent: 'login',
        suggest: true,
        message: null,
      })
    } else {
      this.setState({
        activeComponent: componentName,
        message: null,
      })
    }


  },

	componentDidMount: function(){
		this.getOneUserFromServer();
	},

	render: function(){
			if (!this.state.user) {
				return null;
			} else {
			return (
				<div>
					<Header 
          user={ this.state.user } 
          logoutUser={ this.logoutUser }
          setActiveComponent={ this.setActiveComponent }
          />
					<ShowWhichComponent 
          user={ this.state.user } 
          message={ this.state.message } 
          allDomains={ this.state.allDomains } 
          allUrls={ this.state.allUrls } 
          activeComponent={ this.state.activeComponent } 
          setActiveComponent={ this.setActiveComponent } 
          loginUserFromServer={ this.loginUserFromServer } 
          signupUserFromServer={ this.signupUserFromServer }
          forgotPassword={ this.forgotPassword }
          handleEmailConfirm={ this.handleEmailConfirm }
          logoutUser={ this.logoutUser } 
          handleSubmitClick={ this.handleSubmitClick } 
          submitResetToken={ this.submitResetToken } 
          submitNewPassword={ this.submitNewPassword } 
          submitSuggestedDomains={ this.submitSuggestedDomains } 
          resendVerifyToken={ this.resendVerifyToken } 
          />
        </div>
					// <Footer />
			)
			}
	}
});

ReactDOM.render(	<Index />,	document.getElementById('app'));

