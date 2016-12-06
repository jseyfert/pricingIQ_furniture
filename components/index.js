
var React = require('react');
var ReactDOM = require('react-dom');
var ShowWhichComponent = require('./showWhichComponent.js');
var Header = require('./partialComps/header.js');
var Footer = require('./partialComps/footer.js');

var validator = require('validator');
var parseDomain = require("parse-domain");
var _ = require("underscore");

var Index = React.createClass({
	
  getInitialState: function(){
		return {
      userLoading: true,
      domainsLoading: true,
      user: null,
      message: null,
      activeComponent: 'landing',
      
      passwordResetToken: null,
      passwordResetEmail: null,
      emailVerificationCount: 0,
      passwordResetCount: 0,
      
      rawText: '',
      allUrls: [],
      allDomains: [], //[['amazon', true ],['walmart', true ],['sears', false]],
		}
	},

  createUrlObj: function(text){
    // console.log('process.env', process.env)
    if (this.state.user.user !== 'anonymous'){
      var userLoggedIn = true
      var user = this.state.user
      var countLeftToSubmit = this.state.user.countLeftToSubmit;
    } else {
      var userLoggedIn = false
    }
    // console.log('userLoggedIn', userLoggedIn)
    var urlArray = text.split("\n");
    var allDomains = this.state.allDomains;
    var domains = allDomains.map(function(arr){ return arr[0]})
    var distinctDomains = [];
    var domainsAndUrls = [];
    var arrOfObj = [];


    urlArray.map(function(url){
        if (validator.isURL(url) && parseDomain(url)){
          var getDomain = parseDomain(url).domain
          var lowerCaseDomain = getDomain.toLowerCase()
          domains.push(lowerCaseDomain)
          domainsAndUrls.push([lowerCaseDomain, url])
        } else {
          return null;
        }
    })

    // use underscore to select only unique domains
    distinctDomains = _.uniq(domains) 

    // url object factory
    var newObj = function(domain){

      var temp ={}

      temp.domain = domain

      temp.domainActive = function(){
        for(var i = 0; i < allDomains.length ; i++) {
          if (domain === allDomains[i][0] && allDomains[i][1] === true ){ return true;} 
          if (domain === allDomains[i][0] && allDomains[i][1] === false ){return false;} 
        }
      }()

      temp.domainOffered = (temp.domainActive === true || temp.domainActive === false );

      temp.urls = function(){
        var urlArr =  [];
        for(var i = 0; i < domainsAndUrls.length ; i++) {
          if (domain === domainsAndUrls[i][0]){ urlArr.push(domainsAndUrls[i][1]) } 
        }
        return urlArr;
      }()

      temp.urlCount = temp.urls.length

      if (temp.domainOffered){
        if(userLoggedIn){
          temp.countLeftToSubmit = function(){
            for(var i = 0; i < countLeftToSubmit.length ; i++) {
              // console.log('countLeftToSubmit', countLeftToSubmit[i].domain, countLeftToSubmit[i].count)
              if (domain === countLeftToSubmit[i].domain){ return countLeftToSubmit[i].count} 
            }
          }()
          if (temp.domainActive){ 
            temp.countLeftAfterSubmit = temp.countLeftToSubmit - temp.urlCount <= 0 ? 0 : temp.countLeftToSubmit - temp.urlCount 
            temp.countToSubmitNow = temp.countLeftToSubmit >= temp.urlCount ? temp.urlCount : temp.countLeftToSubmit
          }
          if (!temp.domainActive){ 
            temp.countLeftAfterSubmit = temp.countLeftToSubmit 
            temp.countToSubmitNow = 0
          }
        } else {
          temp.countLeftToSubmit = null;
          temp.countLeftAfterSubmit = null;
          temp.countToSubmitNow = null;
        }
      } else {
        temp.domainOffered = false;
        temp.domainActive = null;
        temp.countLeftToSubmit = null;
        temp.countLeftAfterSubmit = null;
        temp.countToSubmitNow = null;
      }

      return temp;
    }

    // create a url obj for each distinct domain
    var createObjPerDomain = function(distinctDomains){
        for(var j = 0; j < distinctDomains.length ; j++) {
          // console.log('test', distinctDomains[i]);
          arrOfObj.push(newObj(distinctDomains[j]))
        }
      }

    createObjPerDomain(distinctDomains)

    return arrOfObj;
  },   

  onTextChange: function(e){ 
    var text = e.target.value;
    var allUrls = this.createUrlObj(text);
    this.setState({ 
      allUrls: allUrls,
      rawText: text
    })
  },

  runCreateUrlObj: function(text){
    console.log('in runCreateUrlObj')
    var allUrls = this.createUrlObj(text);
    this.setState({ 
      allUrls: allUrls,
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  submitUrlsID: function(user, allUrls){
    var self = this;

    var urlsToSubmit = [];
    var newCountLeftToSubmit = [];

    allUrls.map(function(obj){
      if (obj.domainActive === true && obj.urlCount > 0 && obj.countToSubmitNow > 0){
        var temp = {}
        temp.domain = obj.domain
        temp.urls = obj.urls.slice(0, obj.countToSubmitNow)
        urlsToSubmit.push(temp)
      }
      if (obj.domainOffered === true){
        newCountLeftToSubmit.push({domain: obj.domain, count: obj.countLeftAfterSubmit})
      }
    })

    console.log('urlsToSubmit', urlsToSubmit )

    $.ajax({
      method: 'POST',
      url: '/submitUrlsId',
      data: { user: user, urlsToSubmit: urlsToSubmit, newCountLeftToSubmit: newCountLeftToSubmit },
      success: function(data){
        var activeComponent = data.activeComponent
        var user = data.user
        self.setState({ 
          user: user,
          activeComponent: activeComponent,
        });
      },
      error: function(xhr, status, err){
        console.error('/submitUrlsId', status, err.toString())
      }
    })
  },  

  submitUrlsNoID: function(allUrls){
    
    var urlsToSubmit = allUrls.filter(function(obj){
      if (obj.urlCount > 0){ return obj; }
    })

    var self = this;
    $.ajax({
      method: 'POST',
      url: '/submitUrlsNoId',
      data: {urls: urlsToSubmit},
      success: function(data){
        // console.log(data, 'in success')
        var activeComponent = data.activeComponent
        self.setState({ 
          activeComponent: activeComponent, 
          message: null,
        })
      },
      error: function(xhr, status, err){
        console.error('/submitUrlsNoId', status, err.toString())
      }
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  signupUserFromServer: function(userForm){
    var self = this;
    var text = self.state.rawText

    $.ajax({
      method: 'POST',
      url: '/signup',
      data: userForm, 
      success: function(data){
        var user = data.user
        self.setState({ 
          user: user,
          activeComponent: 'confirmEmail',
          message: { message: 'Please check email to verify user.', alert: 'alert alert-danger' },
        })
        self.runCreateUrlObj(text)
      },
      error: function(xhr, status, err){
        // console.log('xhr', xhr.responseJSON.message)
        self.setState({ 
          activeComponent: 'signup',
          message: {message: xhr.responseJSON.message, alert: 'alert alert-danger' },
        });
      }
    })
  },

  handleUrlSubmit: function(e){
    e.preventDefault();
    var allUrls = this.state.allUrls

    if (this.state.user.user !== 'anonymous'){
      var userLoggedIn = true
      var verified = this.state.user.verified
  
      var countUrls = 0;
      var countLeftToSubmit = 0;
      var countActiveDomains = 0;
      var countUrlFromActiveDomains = 0;
 
      allUrls.map(function(obj){
        countUrls += obj.urlCount;
        if(obj.domainActive && obj.countLeftToSubmit > 0){countLeftToSubmit += 1};
        if(obj.domainActive && obj.urlCount > 0){countActiveDomains += 1};
        if(obj.domainActive && obj.countToSubmitNow > 0){countUrlFromActiveDomains += 1};
      })
 
      var noUrls = (countUrls <= 0)
      var submittedToday = (countLeftToSubmit === 0)
      var noActiveDomains = (countActiveDomains <= 0)
      var noUrlsFromActiveDomains = (countUrlFromActiveDomains <= 0)
  
      console.log('noUrls', noUrls)
      console.log('submittedToday', submittedToday)
      console.log('noActiveDomains', noActiveDomains)
      console.log('noUrlsFromActiveDomains', noUrlsFromActiveDomains)
    } else {
      var userLoggedIn = false
      var countUrls = 0
      allUrls.map(function(obj){
        countUrls += obj.urlCount;
      })
      var noUrls = (countUrls <= 0)
    }

    if(userLoggedIn){
      if (noUrls) {
        this.setState({ 
          activeComponent: 'landing',
          message: { message: 'Please submit at least one valid Url',  alert: null },
        })
      } else if (!verified) {
        this.setState({
          activeComponent: 'confirmEmail',
          message: { message: 'You have not yet verified your email. Please check your email.',  alert: "alert alert-danger" }
        })
      } else if (submittedToday) {
        this.setState({
          activeComponent: 'submittedToday',
          urlsSubmitted: true,
        })
      } else if (noActiveDomains || noUrlsFromActiveDomains){
        this.setState({ 
          activeComponent: 'noActiveDomains',
          message: { message: 'You have reach your limit for the following domains, or you did not submit any online domains.',  alert: "alert alert-danger" }
        })
      // } else if (noUrlsFromActiveDomains){
      //   this.setState({ 
      //     activeComponent: 'noActiveDomains',
      //     message: { message: 'You already submitted your allotment these domains',  alert: "alert alert-danger" }
      // })
      } else {
        this.submitUrlsID(this.state.user, allUrls);  /////////////////////////////////////////////////////////
      }
    } else if (!userLoggedIn) {   
      if (noUrls) {
        this.setState({ 
          activeComponent: 'landing',
          message: { message: 'Please submit at least one valid Url',  alert: null }
        })
      } else {
        // console.log('urls', allUrls)
        this.submitUrlsNoID(allUrls) // *******************************************************************************
      }
    }
  },

  loginUserFromServer: function(userForm){
    var self = this;
    var text = self.state.rawText
    // var currentTime = new Date().getTime()
    // console.log('user',user)
    $.ajax({
      method: 'POST',
      url: '/login',
      data: userForm,
      success: function(data){
        var user = data.user
        self.setState({ user: user })
        self.runCreateUrlObj(text)

        var allUrls = self.state.allUrls
        var verified = data.user.verified

        var countUrls = 0;
        var countLeftToSubmit = 0;
        var countActiveDomains = 0;
        var countUrlFromActiveDomains = 0;
   
        allUrls.map(function(obj){
          countUrls += obj.urlCount;
          if(obj.domainActive && obj.countLeftToSubmit > 0){countLeftToSubmit += 1};
          if(obj.domainActive && obj.urlCount > 0){countActiveDomains += 1};
          if(obj.domainActive && obj.countToSubmitNow > 0){countUrlFromActiveDomains += 1};
        })
   
        var noUrls = (countUrls <= 0)
        var submittedToday = (countLeftToSubmit === 0)
        var noActiveDomains = (countActiveDomains <= 0)
        var noUrlsFromActiveDomains = (countUrlFromActiveDomains <= 0)
    
        console.log('noUrls', noUrls)
        console.log('submittedToday', submittedToday)
        console.log('noActiveDomains', noActiveDomains)
        console.log('noUrlsFromActiveDomains', noUrlsFromActiveDomains)

        if (!verified) {
          self.setState({ 
            activeComponent: 'confirmEmail',
            message: { message: 'You have not yet verified your email. Please check your email.', alert: "alert alert-danger" },
          })
        } else if (noUrls){
          self.setState({ 
            activeComponent: 'landing',
            message: null,
          })
        } else if (submittedToday) {
          self.setState({ 
            activeComponent: 'submittedToday',
            message: null,
          })
        } else if (noActiveDomains){
          self.setState({ 
            activeComponent: 'noActiveDomains',
            message: { message: 'You did not submit any active domains',  alert: "alert alert-danger" }
          })
        } else if (noUrlsFromActiveDomains){
          self.setState({ 
            activeComponent: 'noActiveDomains',
            message: { message: 'You already submitted your allotment of these domains',  alert: "alert alert-danger" }
          })
        } else {
          self.submitUrlsID(user, allUrls);  /////////////////////////////////////////////////////////
        }
      },
      error: function(xhr, status, err){
        // console.error('/login', status, err, xhr.responseJSON)
        self.setState({ 
          activeComponent: 'login',
          message: {message: xhr.responseJSON, alert: 'alert alert-danger'},
        });
      }
    })  
  },

  emailVerification: function(){
    var self = this;
    var allUrls = self.state.allUrls

    var countUrls = 0;
    var countLeftToSubmit = 0;
    var countActiveDomains = 0;
    var countUrlFromActiveDomains = 0;

    allUrls.map(function(obj){
      countUrls += obj.urlCount;
      if(obj.domainActive && obj.countLeftToSubmit > 0){countLeftToSubmit += 1};
      if(obj.domainActive && obj.urlCount > 0){countActiveDomains += 1};
      if(obj.domainActive && obj.countToSubmitNow > 0){countUrlFromActiveDomains += 1};
    })

    var noUrls = (countUrls <= 0)
    var submittedToday = (countLeftToSubmit === 0)
    var noActiveDomains = (countActiveDomains <= 0)
    var noUrlsFromActiveDomains = (countUrlFromActiveDomains <= 0) 

    console.log('noUrls', noUrls)
    console.log('submittedToday', submittedToday)
    console.log('noActiveDomains', noActiveDomains)
    console.log('noUrlsFromActiveDomains', noUrlsFromActiveDomains)

    $.ajax({
      method: 'GET', 
      url: '/oneUser'
    }).done(function(data){
      var verified = data.verified
      self.setState({ user: data })
      if (!verified) {
        self.setState({ 
          activeComponent: 'confirmEmail',
          message: { message: 'User has not been verified. Please check your email.', alert: "alert alert-danger" },
        })
      } else if (noUrls) {
        self.setState({ 
          activeComponent: 'landing',
          message: null,
        })
      }else if (noActiveDomains){
        self.setState({ 
          activeComponent: 'noActiveDomains',
          message: { message: 'You did not submit any active domains',  alert: "alert alert-danger" },
        })
      } else if (noUrlsFromActiveDomains){
        this.setState({ 
          activeComponent: 'noActiveDomains',
          message: { message: 'You already submitted your allotment these domains',  alert: "alert alert-danger" },
      })
      } else {
        self.submitUrlsID(self.state.user, allUrls);  /////////////////////////////////////////////////////////
      }
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  emailVerificationResend: function() {
    var addOne = this.state.emailVerificationCount + 1;
    var resendMessage = {};
    if (addOne === 1){
      resendMessage = {message: 'Another email verification sent.', alert: 'alert alert-success'}
    } else if (addOne === 2){
      resendMessage = {message: 'And, another email verification sent.', alert: 'alert alert-success'}
    } else if (addOne >= 3) {
      resendMessage = {message: 'The last email verification has been sent - please check your spam folder', alert: 'alert alert-warning'}
    }

    var self = this;
      $.ajax({
        method: 'PUT',
        url: '/emailVerificationResend',
        data: {user: this.state.user},
        success: function(data){
          console.log('in success', data)
          self.setState({ 
            activeComponent: data.activeComponent,
            message: (data.message) ? data.message : resendMessage,
            emailVerificationCount: addOne,
          });
        },
        error: function(xhr, status, err){
          console.error('/emailVerificationResend', status, err.toString())
        }
      })
  },

  getOneUserFromServer: function(){
    var self = this;
    var text = self.state.rawText
    $.ajax({
      method: 'GET', 
      url: '/oneUser'
    }).done(function(data){
      self.setState({ 
        user: data,
        activeComponent: 'landing',
        message: null,
        userLoading: false,
      });
      if(!self.state.domainsLoading){ self.runCreateUrlObj(text); }
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
            activeComponent: 'landing',
            message: null,
            rawText: '',
            passwordResetToken: null,
            passwordResetEmail: null,
            emailVerificationCount: 0,
            passwordResetCount: 0,
          });
        })
        self.runCreateUrlObj('dummyData');
      }.bind(self),
      error: function(xhr, status, err){
        console.error('/logout', status, err.toString());
      }
    })
  },

  forgotPassword: function(passwordResetEmail){
    var self = this;
      $.ajax({
        method: 'POST',
        url: '/forgotPassword',
        data: {passwordResetEmail: passwordResetEmail},
        success: function(data){
          self.setState({ 
            activeComponent: data.activeComponent,
            message: data.message,
            passwordResetEmail: data.passwordResetEmail,
          });
        },
        error: function(xhr, status, err){
          console.error('/forgotPassword', status, err.toString())
        }
      })
  },  
 
  forgotPasswordResend: function() {
    var addOne = this.state.passwordResetCount + 1;
    var resendMessage = {};
    if (addOne === 1){
      resendMessage = {message: 'Another password token sent.', alert: 'alert alert-success'}
    } else if (addOne === 2){
      resendMessage = {message: 'And, another password token sent.', alert: 'alert alert-success'}
    } else if (addOne >= 3) {
      resendMessage = {message: 'The last password token has been sent - please check your spam folder', alert: 'alert alert-warning'}
    }
    var self = this;
      $.ajax({
        method: 'PUT',
        url: '/forgotPasswordResend',
        data: {passwordResetEmail: this.state.passwordResetEmail},
        success: function(data){
          self.setState({ 
            activeComponent: data.activeComponent,
            message: (data.message) ? data.message : resendMessage,
            passwordResetEmail: data.passwordResetEmail,
            passwordResetCount: addOne,
          });
        },
        error: function(xhr, status, err){
          console.error('/forgotPasswordResend', status, err.toString())
        }
      })
  },

  verifyPasswordReset: function(passwordResetToken) {
    var self = this;
      $.ajax({
        method: 'GET',
        url: '/verifyPasswordReset/' + passwordResetToken,
        data: { passwordResetToken: passwordResetToken},
        success: function(data){
          self.setState({ 
              activeComponent: data.activeComponent,
              passwordResetToken: data.passwordResetToken ? data.passwordResetToken : null,
              message: data.message,
          });
        },
        error: function(xhr, status, err){
          console.error('/verifyPasswordReset', status, err.toString())
        }
      })
  }, 

  resetPassword: function(password) {
    var passwordResetToken = this.state.passwordResetToken
    var self = this;
      $.ajax({
        method: 'PUT',
        url: '/resetPassword',
        data: { password: password, passwordResetToken: passwordResetToken },
        success: function(data){
          self.setState({ 
              message: data.message,
              activeComponent: data.activeComponent,
          });
        },
        error: function(xhr, status, err){
          console.error('/resetPassword', status, err.toString())
        }
      })
  },

  setActiveComponent: function(componentName) {
    this.setState({
      activeComponent: componentName,
      message: null,
    })
  },

  submitSuggestedDomains: function(arr) {
    var self = this;
      $.ajax({
        method: 'POST',
        url: '/suggest',
        data: { arr: arr},
        success: function(data){
          console.log('submitSuggestedDomains success', data)
        },
        error: function(xhr, status, err){
          console.error('/suggest', status, err.toString())
        }
      })
  },



  componentWillMount: function(){

    // setTimeout(() => {
      this.setState({  
        allDomains: [['amazon', false ],['walmart', true ],['sears', false],['homedepot', true]],
        domainsLoading: false
      });
      if(!this.state.userLoading){
        this.runCreateUrlObj('dummyData');
      }
    // }, 1110);

    // setTimeout(() => {
      this.getOneUserFromServer();
    // }, 1110);
  },

	render: function(){
  	return (
      <div>
  			<Header 
        user={ this.state.user } 
        logoutUser={ this.logoutUser }
        setActiveComponent={ this.setActiveComponent }
        activeComponent={ this.state.activeComponent }
        userLoading={ this.state.userLoading } 
        />
        <ShowWhichComponent 
        userLoading={ this.state.userLoading } 
        domainsLoading={ this.state.domainsLoading } 
        createUrlObj={ this.createUrlObj } 
        user={ this.state.user } 
        message={ this.state.message } 
        allDomains={ this.state.allDomains } 
        allUrls={ this.state.allUrls } 
        activeComponent={ this.state.activeComponent } 
        rawText={ this.state.rawText } 
        onTextChange={ this.onTextChange }
        setActiveComponent={ this.setActiveComponent } 
        loginUserFromServer={ this.loginUserFromServer } 
        signupUserFromServer={ this.signupUserFromServer }
        emailVerification={ this.emailVerification }
        logoutUser={ this.logoutUser } 
        handleUrlSubmit={ this.handleUrlSubmit } 
        verifyPasswordReset={ this.verifyPasswordReset } 
        emailVerificationResend={ this.emailVerificationResend } 
        resetPassword={ this.resetPassword } 
        submitSuggestedDomains={ this.submitSuggestedDomains } 
        forgotPassword={ this.forgotPassword }
        forgotPasswordResend={ this.forgotPasswordResend } 
        passwordResetEmail={ this.state.passwordResetEmail } 
        emailVerificationCount={ this.state.emailVerificationCount } 
        passwordResetCount={ this.state.passwordResetCount } 
        />
      </div>
        // <Footer/>
  	)
	}
});

ReactDOM.render(	<Index />,	document.getElementById('app'));

