
var React = require('react');
var ReactDOM = require('react-dom');

var ShowWhichComponent = require('./showWhichComponent.js');
var Header = require('./header.js');
var Footer = require('./footer.js');
var validator = require('validator');
var parseDomain = require("parse-domain");
var _ = require("underscore");
// console.log('process.env', process.env);

var Index = React.createClass({
	
  getInitialState: function(){
		return {
      user: null,
      message: null,
      passwordResetToken: null,
      activeComponent: 'landing',

      submittedToday: null, //maybe remove
      suggest: null,
      noActiveDomains: null,
      urlsSubmitted: false,

      userLoading: true,
      domainsLoading: true,

      rawText: '',
			allUrls: [],
      allDomains: [], //[['amazon', true ],['walmart', true ],['sears', false]],
			// allDomainsOLD: 
			// [{domain: 'amazon' , domainActive: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/200px-Amazon.com-Logo.svg.png'},
			// {domain: 'walmart', domainActive: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Wal-Mart_logo.svg/200px-Wal-Mart_logo.svg.png'},
			// {domain: 'sears' ,  domainActive: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sears_logo_2010-present.svg/170px-Sears_logo_2010-present.svg.png'}]
		}
	},

  createUrlObj: function(text){
    if (this.state.user.user !== 'anonymous'){
      var userLoggedIn = true
      var user = this.state.user
      var countLeftToSubmit = this.state.user.countLeftToSubmit;
    } else {
      var userLoggedIn = false
    }
    // console.log('userLoggedIn', userLoggedIn)

    var allDomains = this.state.allDomains;
    var urlArray = text.split("\n");
    var domains = allDomains.map(function(arr){ return arr[0]})
    var distinctDomains = [];
    var domainsAndUrls = [];
    var arrOfObj = [];


    urlArray.map(function(url){
        if (validator.isURL(url) && parseDomain(url)){
          var getDomain = parseDomain(url).domain
          domains.push(getDomain)
          domainsAndUrls.push([getDomain, url])
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

  // createUrlObjWithoutUser: function(text){
  //   var allDomains = this.state.allDomains;
  //   var urlArray = text.split("\n");
  //   var domains = [];
  //   var distinctDomains = [];
  //   var domainsAndUrls = [];
  //   var arrOfObj = [];

  //   urlArray.map(function(url){
  //       if (validator.isURL(url) && parseDomain(url)){
  //         var getDomain = parseDomain(url).domain
  //         domains.push(getDomain)
  //         domainsAndUrls.push([getDomain, url])
  //       } else {
  //         return null;
  //       }
  //   })

  //   // use underscore to select only unique domains
  //   distinctDomains = _.uniq(domains) 

  //   // url object factory
  //   var newObj = function(index, domain){
  //     var temp ={}

  //     temp.domain = domain

  //     temp.urls = function(){
  //       var urlArr =  [];
  //       for(var i = 0; i < domainsAndUrls.length ; i++) {
  //         if (domain === domainsAndUrls[i][0]){ urlArr.push(domainsAndUrls[i][1]) } 
  //       }
  //       return urlArr;
  //     }()

  //     temp.urlCount = temp.urls.length

  //     return temp;
  //   }

  //   // create a url obj for each distinct domain
  //   var createObjPerDomain = function(distinctDomains){
  //       for(var j = 0; j < distinctDomains.length ; j++) {
  //         // console.log('test', distinctDomains[i]);
  //         arrOfObj.push(newObj(j, distinctDomains[j]))
  //       }
  //     }

  //   createObjPerDomain(distinctDomains)

  //   return arrOfObj;
  // },  

  onTextChange: function(e){ 
    // var user =  (this.state.user.user !== 'anonymous') ? true : false
    var allUrls = this.createUrlObj(e.target.value);

    this.setState({ 
      allUrls: allUrls,
      rawText: e.target.value
    })

    // if(user){
    // } else {
    //   var urlsNoUser = this.createUrlObjWithoutUser(e.target.value);
    //   this.setState({ 
    //     urlsNoUser: urlsNoUser,
    //     rawText: e.target.value
    //   })
    // }
  },

  setInitialUrls: function(){

    var allUrls = this.createUrlObj('text');

    this.setState({ 
      allUrls: allUrls,
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  submitUrlsID: function(user, allUrls){
    var self = this;
    console.log('in submitUrlsID', user, allUrls)

    // var urlsToSubmit = [];
    // var newCountLeftToSubmit = [];

    // allUrls.filter(function(obj){
    //   if (obj.domainActive === true && obj.urlCount > 0){
    //     urlsToSubmit.push(obj)
    //   }
    //   if (obj.domainOffered === true){
    //     newCountLeftToSubmit.push({domain: obj.domain, count: obj.countLeftAfterSubmit})
    //   }
    // })

    // console.log(urlsToSubmit, 'urlsToSubmit', newCountLeftToSubmit, 'newCountLeftToSubmit')

    // $.ajax({
    //   method: 'POST',
    //   url: '/submitUrlsId',
    //   data: { user: user, urlsToSubmit: urlsToSubmit, newCountLeftToSubmit: newCountLeftToSubmit },
    //   success: function(data){
    //     var activeComponent = data.activeComponent
    //     var user = data.user
    //     self.setState({ 
    //       user: user,
    //       activeComponent: activeComponent,
    //       // suggest: null,
    //       // message: message,
    //     });
    //   },
    //   error: function(xhr, status, err){
    //     console.error('/submitUrlsId', status, err.toString())
    //   }
    // })
  },  

  submitUrlsNoID: function(urls){
    console.log('in submitUrlsNONONONONONID which does nothing right now')
    // *UPDATE* var noActiveDomains = (_.where(urls, {domainActive: true}).length === 0) ? true : false
    // var self = this;
    // console.log('urls2', urls)
    // $.ajax({
    //   method: 'POST',
    //   url: '/submitUrlsNoId',
    //   data: {urls: urls},
    //   success: function(data){
    //     var activeComponent = data.activeComponent
    //     self.setState({ 
    //       activeComponent: 'login', 
    //       suggest: null,
    //       noActiveDomains: noActiveDomains, 
    //       allUrls: urls,
    //       message: null,
    //     })
    //   },
    //   error: function(xhr, status, err){
    //     console.error('/submitUrlsNoId', status, err.toString())
    //   }
    // })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  handleUrlSubmit: function(e){
    e.preventDefault();

    var allUrls = this.state.allUrls
    var countUrls = 0
    var countActiveDomains = 0
    allUrls.map(function(obj){
      countUrls += obj.urlCount;
      if(obj.domainActive){countActiveDomains += obj.urlCount};
    })
    var noUrls = (countUrls <= 0)
    var noActiveDomains = (countActiveDomains <= 0)

    if (this.state.user.user !== 'anonymous'){
      var userLoggedIn = true
      var verified = this.state.user.verified
      var countLeftToSubmit = this.state.user.countLeftToSubmit.reduce(function(a, b) { return a + b.count; }, 0);
      var submittedToday = (countLeftToSubmit == 0)
    } else {
      var userLoggedIn = false
    }

    console.log('userLoggedIn', userLoggedIn)
    console.log('countLeftToSubmit', countLeftToSubmit)
    console.log('submittedToday', submittedToday)

    if(userLoggedIn){
      if (noUrls) {
        this.setState({ 
          activeComponent: 'landing',
          suggest: null,
          allUrls: allUrls,
          message: { message: 'Please submit at least one valid Url',  alert: null }
        })
      } else if (!verified) {
        this.setState({
          activeComponent: 'errorConfirmEmail',
          urlsSubmitted: true,
          suggest: null,
          allUrls: allUrls,
          message: { message: 'You have not yet verified your email. Please check your email.',  alert: "alert alert-danger" }
        })
      } else if (submittedToday) {
        this.setState({
          activeComponent: 'submittedToday',
          urlsSubmitted: true,
          suggest: null,
          allUrls: allUrls
        })
      } else if (noActiveDomains){
        this.setState({ 
          activeComponent: 'noActiveDomains',
          urlsSubmitted: true,
          suggest: null,
          allUrls: allUrls
      })
      } else {
        this.submitUrlsID(this.state.user, allUrls);  /////////////////////////////////////////////////////////
        // this.updateUser(this.state.user, urls);
      }
    } else if (!userLoggedIn) {   
      if (noUrls) {
        this.setState({ 
          activeComponent: 'landing',
          suggest: null, 
          allUrls: allUrls, 
          message: { message: 'Please submit at least one valid Url',  alert: null }
        })
      } else {
        console.log('urls', allUrls)
        this.submitUrlsNoID(allUrls) // *******************************************************************************
      }
    }
  },

  signupUserFromServer: function(user){
    var suggest = this.state.suggest
    var urls = this.state.allUrls
    var self = this;
    // console.log('in signupuser', user)
    $.ajax({
      method: 'POST',
      url: '/signup',
      data: user, 
      success: function(data){
        // console.log('inSSSSuccess', data.user)
        var data = data.user
        // var verified = data.user.verified
        // console.log('data', data, 'verifieeddd', verified)
        // var noActiveDomains = self.state.noActiveDomains;
        // var urlsSubmitted = (self.state.allUrls.length > 0)
        // console.log('in user sign up data',data)
        // // if (!verified) {
          self.setState({ 
            user: data,
            // suggest: null,
            activeComponent: 'errorConfirmEmail',
            // submittedToday: false,
            // noActiveDomains: noActiveDomains,
            message: { message: 'Please check email to verify user.', alert: 'alert alert-info' },
          })
        // } else if (suggest){
        //   self.setState({ 
        //     user: data.user,
        //     suggest: null,
        //     activeComponent: 'suggest',
        //     noActiveDomains: noActiveDomains,
        //     submittedToday: submittedToday,
        //     message: null
        //   })
        // } else if(!urlsSubmitted){
        //   self.setState({ 
        //     user: data.user,
        //     // suggest: null,
        //     activeComponent: 'landing',
        //     submittedToday: false, 
        //     noActiveDomains: noActiveDomains,
        //   })
        // } else if (noActiveDomains){
        //   self.setState({ 
        //     user: data.user,
        //     // suggest: null,
        //     activeComponent: 'noActiveDomains',
        //     submittedToday: false, 
        //     noActiveDomains: noActiveDomains,
        //   })
        // } else {
        //   this.submitUrlsID(data.user, urls);  /////////////////////////////////////////////////////////
        //   // self.updateUser(data.user, urls);
        // }
      },
      error: function(xhr, status, err){
        // console.log('xhr', xhr.responseJSON.message)
        self.setState({ 
          activeComponent: 'signup',
          suggest: null,
          message: {message: xhr.responseJSON.message, alert: 'alert alert-danger' },
        });
      }
    })
  },

  handleEmailConfirm: function(){
    var allUrls = this.state.allUrls
    var suggest = this.state.suggest
    // console.log(this.state.user.countLeftToSubmit)
    var countLeftToSubmit = this.state.user.countLeftToSubmit.reduce(function(a, b) { return a + b.count; }, 0);
    var submittedToday = (countLeftToSubmit == 0)

    var countUrls = 0
    var countActiveDomains = 0
    allUrls.map(function(obj){
      countUrls += obj.urlCount
      if(obj.domainActive){countActiveDomains += obj.urlCount}
    })
    var noUrls = (countUrls <= 0)
    var noActiveDomains = (countActiveDomains <= 0)
    // console.log(noUrls, 'noUrls zzz')    

    var self = this;

    $.ajax({
      method: 'GET', 
      url: '/oneUser'
    }).done(function(data){
      var verified = data.verified
      // console.log(data,'in  handleEmailConfirm')
     
      if (!verified) {
        self.setState({ 
          user: data,
          // suggest: null,
          activeComponent: 'errorConfirmEmail',
          noActiveDomains: noActiveDomains,
          allUrls: allUrls,
          message: { message: 'User has not been verified. Please check your email.', alert: "alert alert-danger" },
        })
      } else if (noUrls) {
        self.setState({ 
          user: data,
          // suggest: null,
          activeComponent: 'landing',
          noActiveDomains: noActiveDomains,
          allUrls: allUrls,
          message: null,
        })
      } else if (suggest){
        self.setState({ 
          user: data,
          suggest: null,
          activeComponent: 'suggest',
          noActiveDomains: noActiveDomains,
          allUrls: allUrls,
          message: null
        })
      }else if (noActiveDomains){
        self.setState({ 
          user: data,
          // suggest: null,
          activeComponent: 'noActiveDomains',
          noActiveDomains: noActiveDomains,
          allUrls: allUrls,
          message: null,
        })
      } else {
        self.submitUrlsID(self.state.user, allUrls);  /////////////////////////////////////////////////////////
        // self.updateUser(self.state.user, urls);
      }
    })
  },

  loginUserFromServer: function(user){
    var allUrls = this.state.allUrls
    var currentTime = new Date().getTime()
    var self = this;
    // console.log('user',user)
    $.ajax({
      method: 'POST',
      url: '/login',
      data: user,
      success: function(data){


        var verified = data.user.verified
        var suggest = self.state.suggest

        var countUrls = 0
        var countActiveDomains = 0
        allUrls.map(function(obj){
          countUrls += obj.urlCount
          if(obj.domainActive){countActiveDomains += obj.urlCount}
        })
        var noUrls = (countUrls <= 0)
        var noActiveDomains = (countActiveDomains <= 0)

        var countLeftToSubmit = data.user.countLeftToSubmit.reduce(function(a, b) { return a + b.count; }, 0);
        var submittedToday = (countLeftToSubmit == 0)
        
        console.log('noUrls',noUrls)
        // var noActiveDomains = self.state.noActiveDomains;
        // var urlsSubmitted = self.state.urlsSubmitted;
        
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
        } else if (noUrls){
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
          self.submitUrlsID(data.user, allUrls);  /////////////////////////////////////////////////////////
          // self.updateUser(data.user, urls);
        }
      },
      error: function(xhr, status, err){
        // console.error('/login', status, err, xhr.responseJSON)
        self.setState({ 
          activeComponent: 'login',
          // suggest: null,
          message: {message: xhr.responseJSON, alert: 'alert alert-danger'},
        });
      }
    })  
  },


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        // allUrls: [],
        // urlsNoUser: [],
        // rawText: null,
        userLoading: false,
      });
      if(!self.state.domainsLoading){
        self.setInitialUrls();
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
            // allUrls: [],
            // urlsNoUser: [],
            // rawText: null,
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

  submitSuggestedDomains: function(domains) {
    var self = this;
      $.ajax({
        method: 'POST',
        url: '/suggest',
        data: { domains: domains},
        success: function(data){
          var activeComponent = data.activeComponent
          var message = data.message
          self.setState({ 
              activeComponent: activeComponent,
              suggest: null,
              message: message,
          });
        },
        error: function(xhr, status, err){
          console.error('/suggest', status, err.toString())
        }
      })
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

  // updateUser: function(user, urls){
  //   var midnightTonight = new Date().setHours(23,59,59,0);
  //   var self = this;
  //     $.ajax({
  //       method: 'PUT',
  //       url: '/updateUser',
  //       data: { user: user, canSubmitAfter: midnightTonight, urls: urls},
  //       success: function(data){
  //         self.setState({ 
  //           user: data,
  //           suggest: null,
  //           activeComponent: 'confirm',
  //           submittedToday: true,
  //           allUrls: urls,
  //           message: null,
  //         });
  //       },
  //       error: function(xhr, status, err){
  //         console.error('/updateUser', status, err.toString())
  //       }
  //     })
  // }, 

  componentWillMount: function(){

    // setTimeout(() => {
      this.setState({  
        allDomains: [['amazon', true ],['walmart', true ],['sears', false]],
        domainsLoading: false
      });
      if(!this.state.userLoading){
        this.setInitialUrls();
      }
    // }, 100);

    // setTimeout(() => {
      this.getOneUserFromServer();
    // }, 600);
  },


	render: function(){
  	return (
  		<div>
  			<Header 
        user={ this.state.user } 
        logoutUser={ this.logoutUser }
        setActiveComponent={ this.setActiveComponent }
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
        forgotPassword={ this.forgotPassword }
        handleEmailConfirm={ this.handleEmailConfirm }
        logoutUser={ this.logoutUser } 
        handleUrlSubmit={ this.handleUrlSubmit } 
        submitResetToken={ this.submitResetToken } 
        submitNewPassword={ this.submitNewPassword } 
        submitSuggestedDomains={ this.submitSuggestedDomains } 
        resendVerifyToken={ this.resendVerifyToken } 
        />
      </div>
  	)
	}
});

ReactDOM.render(	<Index />,	document.getElementById('app'));

