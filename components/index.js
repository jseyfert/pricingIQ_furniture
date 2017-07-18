
var React = require('react');
var ReactDOM = require('react-dom');
var ShowWhichComponent = require('./showWhichComponent.js');
var Header = require('./partialComps/header.js');
var Footer = require('./partialComps/footer.js');

var validator = require('validator');
var parseDomain = require("parse-domain");
var _ = require("underscore");

// var Fingerprint2 = require('fingerprintjs2');

var Index = React.createClass({
	
  getInitialState: function(){
		return {
      userLoading: true,
      domainsLoading: true,
      customersLoading: true,
      urlsUploading: false,
      urlsDownloading: false,
      showSubmittedUrls: false,

      user: null,
      message: null,
      activeComponent: 'landing',
      
      passwordResetToken: null,
      passwordResetEmail: null,
      emailVerificationCount: 0,
      passwordResetCount: 0,
      
      rawText: '',
      allUrls: [],
      allDomains: [], 
      
      customers: [],

      customerId: null,
      customerName: 'Select Customer',
      urlType: 'Select Url Type',

      // dahsboard vvvv
      customerIdDashboard: null,
      customerNameDashboard: 'Select Customer',
      urlTypeDashboard: 'Select Url Type',
      selectAll: true,
      showSpiderName: false,
      deleteCount: 0,
      // dahsboard ^^^^
      
      allSubmittedUrlsPerCustomer: [],

      sites: [], //i dont thin i need this
    }
	},

  getDomains: function(){
    var self = this;
    $.ajax({
      method: 'GET', 
      url: '/getDomains'
    }).done(function(data){
      var allDomains = [];
      data.map(function(obj){
        var siteDomainUrlLowerCase = obj.siteDomainUrl.toLowerCase()
        if (siteDomainUrlLowerCase === 'https://www.southshorefurniture.com/ca-fr'){
          var getFullDomain = 'southshorefurniture.com/ca-fr'
        } else if (siteDomainUrlLowerCase === 'https://www.southshorefurniture.com/us-en'){
          var getFullDomain = 'southshorefurniture.com/us-en'
        } else if (siteDomainUrlLowerCase === 'uk.insight.com'){
          var getFullDomain = 'uk.insight.com'
        } else {
          var getFullDomain = parseDomain(siteDomainUrlLowerCase).domain + '.' +  parseDomain(siteDomainUrlLowerCase).tld
        }
        allDomains.push([getFullDomain, true, obj.siteId, obj.siteName ])
      })
      self.setState({ 
        allDomains: allDomains,
        domainsLoading: false,
        activeComponent: 'landing',
        message: null,
      });
      if(!self.state.userLoading){
        self.runCreateUrlObj('dummyData', self.state.urlType);
      }
    })
  },

  createUrlObj: function(text, urlType){
    // console.log('process.env', urlType)
    if (this.state.user.user !== 'anonymous'){
      var userLoggedIn = true
      var user = this.state.user
      var countLeftToSubmit = this.state.user.countLeftToSubmit;
    } else {
      var userLoggedIn = false
    }
    var urlArray = text.split("\n");
    var allDomains = this.state.allDomains;
    var domains = allDomains.map(function(arr){ return arr[0]})
    var distinctDomains = [];
    var domainsAndUrls = [];
    var arrOfObj = [];


    urlArray.map(function(url){
        // url = url.toLowerCase().trim()
        url = url.trim()
        // console.log('url', url)
        if (validator.isURL(url) && parseDomain(url)){
          if (url.indexOf('southshorefurniture.com/ca-fr') >= 0) {
            var getFullDomain = 'southshorefurniture.com/ca-fr'
          } else if (url.indexOf('southshorefurniture.com/us-en') >= 0){
            var getFullDomain = 'southshorefurniture.com/us-en'
          } else if (url.indexOf('uk.insight.com') >= 0){
            var getFullDomain = 'uk.insight.com'
          } else {
            var getFullDomain = parseDomain(url).domain + '.' +  parseDomain(url).tld
          }
          domains.push(getFullDomain)
          domainsAndUrls.push([getFullDomain, url])
        } else {
          return null;
        }
    })
    // console.log("domains", domains)
    // console.log("domainsAndUrls", domainsAndUrls)
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

      temp.siteId = function(){
        for(var i = 0; i < allDomains.length ; i++) {
          if (domain === allDomains[i][0]){ return allDomains[i][2];} 
        }
      }()
      
      temp.spiderName = function(){
        if (urlType === "Discovery"){
          var spiderType = "_d"
        } else if (urlType === "Detail"){
          var spiderType = "_detail"
        } else {
          var spiderType = "_?"
        }
        // console.log(spiderType)
        for(var i = 0; i < allDomains.length ; i++) {
          if (domain === allDomains[i][0]){
            // console.log("domain", domain)
            var spiderNameTld = parseDomain(domain).tld
            var spiderNameDomain = parseDomain(allDomains[i][0]).domain
            if (domain === "amazon.com" && spiderType === "_detail"){
              spiderNameDomain = "amazon_detailx"
            } else if (domain === "southshorefurniture.com/ca-fr"){
              spiderNameDomain = "southshore" + spiderType + "ca"
            } else if (domain === "southshorefurniture.com/us-en"){
              spiderNameDomain = "southshore" + spiderType
            } else if (domain === "argos.uk"){
              spiderNameDomain = "argos" + spiderType
            } else if (domain === "uk.insight.com"){
              spiderNameDomain = "insight" + spiderType + "uk"
            } else if (spiderNameTld === 'com'){
              spiderNameDomain = spiderNameDomain + spiderType ;
            } else if (spiderNameTld === 'co.uk') {
              spiderNameDomain = spiderNameDomain + spiderType + "uk" ;
            } else {
              spiderNameDomain = spiderNameDomain + spiderType + spiderNameTld
            }
            // console.log(spiderNameDomain)
            return spiderNameDomain.toLowerCase()
          } 
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
    var allUrls = this.createUrlObj(text, this.state.urlType);
    this.setState({ 
      allUrls: allUrls,
      rawText: text
    })
  },

  handleUrlTypeSelect: function(urlType){
    this.setState({
      urlType: urlType,
    });
    this.runCreateUrlObj(this.state.rawText, urlType);
  },  

  // handleUrlTypeSelectDashboard: function(urlTypeDashboard){
  //   this.setState({
  //     urlTypeDashboard: urlTypeDashboard,
  //     showSubmittedUrls: false
  //   });
  //   // this.runCreateUrlObj(this.state.rawText, urlType);
  // },  

  runCreateUrlObj: function(text, urlType){
    var allUrls = this.createUrlObj(text, urlType);
    this.setState({ 
      allUrls: allUrls,
    })
  },

  handleSelectUrlToDelete: function(urlId){
    // console.log("in index   handleSelectUrlToDelete", urlId)
    
    var newAllSubmittedUrlsPerCustomer = []
    var allSubmittedUrlsPerCustomer = this.state.allSubmittedUrlsPerCustomer
    allSubmittedUrlsPerCustomer.map(function(obj){
      if (obj.id === urlId){
        if (obj.checked === false) {
          obj.checked = true
        } else {
          obj.checked = false
        }
        newAllSubmittedUrlsPerCustomer.push(obj)
        // console.log(obj)
      }
    })
    this.setState({
      allSubmittedUrlsPerCustomer: allSubmittedUrlsPerCustomer,
    });
  }, 

  handleSelectAllUrlToDelete: function(){
    // console.log("in index   handleSelectAllUrlToDelete")
    
    var newAllSubmittedUrlsPerCustomer = []
    var allSubmittedUrlsPerCustomer = this.state.allSubmittedUrlsPerCustomer
    allSubmittedUrlsPerCustomer.map(function(obj){
        obj.checked = true
        newAllSubmittedUrlsPerCustomer.push(obj)
    })
    this.setState({
      allSubmittedUrlsPerCustomer: allSubmittedUrlsPerCustomer,
      selectAll: false
    });
  }, 

  handleShowSpiderName: function(){
    if (this.state.showSpiderName){
      this.setState({
        showSpiderName: false,
      });
    } else {
      this.setState({
        showSpiderName: true,
      });
    }
  }, 

  handleSelectNoneUrlToDelete: function(){
    // console.log("in index   handleSelectAllUrlToDelete")
    
    var newAllSubmittedUrlsPerCustomer = []
    var allSubmittedUrlsPerCustomer = this.state.allSubmittedUrlsPerCustomer
    allSubmittedUrlsPerCustomer.map(function(obj){
        obj.checked = false
        newAllSubmittedUrlsPerCustomer.push(obj)
    })
    this.setState({
      allSubmittedUrlsPerCustomer: allSubmittedUrlsPerCustomer,
      selectAll: true
    });
  }, 

  handleCustomerSelect: function(customerId, customerName){
    this.setState({
      customerId: customerId,
      customerName: customerName,
    });
  },  

  handleUrlTypeSelectDashboard: function(urlTypeDashboard, customerIdDashboard,){
    // console.log("in handleUrlTypeSelectDashboard",urlTypeDashboard, customerIdDashboard)
    this.setState({
      urlTypeDashboard: urlTypeDashboard,
      showSubmittedUrls: false
    });
    this.handleGetSubmitedUrls(urlTypeDashboard, customerIdDashboard)
  },  

  handleCustomerSelectDashboard: function(urlTypeDashboard, customerIdDashboard, customerNameDashboard){
    // console.log("in handleCustomerSelectDashboard",urlTypeDashboard, customerIdDashboard)
    this.setState({
      customerIdDashboard: customerIdDashboard,
      customerNameDashboard: customerNameDashboard,
      showSubmittedUrls: false
    });
    this.handleGetSubmitedUrls(urlTypeDashboard, customerIdDashboard)
  },

  handleGetSubmitedUrls: function(urlTypeDashboard, customerIdDashboard){
    // console.log("in handleGetSubmitedUrls", urlTypeDashboard, customerIdDashboard)
    if (urlTypeDashboard === "Select Url Type" || !customerIdDashboard){
      console.log("DONT RUN")
    } else {
      console.log("RUN")
      this.setState({ 
        urlsDownloading: true,
        selectAll: true,
        showSpiderName: false,
      });
      this.getSubmitedUrls(urlTypeDashboard, customerIdDashboard)
    }

  },

  getSubmitedUrls: function(urlTypeDashboard, customerIdDashboard){
    // console.log("in getSubmitedUrls1111", urlTypeDashboard, customerIdDashboard )

    var self = this;
    $.ajax({
      method: 'POST', 
      url: '/getSubmitedUrls',
      data: { customerIdDashboard: customerIdDashboard, urlTypeDashboard: urlTypeDashboard },
    }).done(function(data){
        // console.log("in getSubmitedUrls2222", data)
        var allSubmittedUrlsPerCustomer = []
        data.map(function(obj){
          obj.checked = false
          allSubmittedUrlsPerCustomer.push(obj)
        })
        // console.log("allSubmittedUrlsPerCustomer", allSubmittedUrlsPerCustomer)
      self.setState({ 
        allSubmittedUrlsPerCustomer: allSubmittedUrlsPerCustomer,
        urlsDownloading: false,
        showSubmittedUrls: true,
      });
    })
  },


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  handleDeleteUrls: function(){
    var urlsToDelete = [];
    var urls = this.state.allSubmittedUrlsPerCustomer
    var self = this;
    self.setState({ 
      urlsDownloading: true,
    });
    urls.map(function(obj){
      if (obj.checked){
        urlsToDelete.push(obj.id)
      }
    })
    $.ajax({
      method: 'POST',
      url: '/deleteUrls',
      data: { urlsToDelete: urlsToDelete },
      success: function(data){
        console.log("data.deleteCount", data)
        self.setState({ 
          deleteCount: data.deleteCount,
          activeComponent: data.activeComponent,
          allSubmittedUrlsPerCustomer: [],
          urlsDownloading: false,
          selectAll: true,
          customerIdDashboard: null,
          urlTypeDashboard: 'Select Url Type',
          customerNameDashboard: 'Select Customer',
        });
      },
      error: function(xhr, status, err){
        console.error('/deleteUrls', status, err.toString())
      }
    })
  },  

  submitUrls: function(user, allUrls){
    var self = this;
    var urlsToSubmit = [];
    allUrls.map(function(obj){
      if (obj.domainActive === true && obj.urlCount > 0){
        obj.urls.map(function(item){
          // console.log(item)
          var newObj = {}
          newObj.customerId = self.state.customerId
          newObj.urlType = self.state.urlType
          newObj.SiteId = obj.siteId
          newObj.spiderName = obj.spiderName
          newObj.inputCategoryUrl = item
          urlsToSubmit.push(newObj)
          // console.log(newObj)
        })
      }
    })

    $.ajax({
      method: 'POST',
      url: '/submitUrls',
      data: { urlsToSubmit: urlsToSubmit },
      success: function(data){
        self.setState({ 
          activeComponent: data.activeComponent,
          message: data.message,
          urlsUploading: true
        });
      },
      error: function(xhr, status, err){
        console.error('/submitUrls', status, err.toString())
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
      var countActiveDomains = 0;
      var countUrlFromActiveDomains = 0;
      allUrls.map(function(obj){
        countUrls += obj.urlCount;
        if(obj.domainActive && obj.urlCount > 0){countActiveDomains += 1};
        if(obj.domainActive && obj.countToSubmitNow > 0){countUrlFromActiveDomains += 1};
      })
      var noUrls = (countUrls <= 0)
      var noActiveDomains = (countActiveDomains <= 0)
      var noUrlsFromActiveDomains = (countUrlFromActiveDomains <= 0)
  
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

      } else if (noActiveDomains || noUrlsFromActiveDomains){
        this.setState({ 
          activeComponent: 'orderIncomplete',
          message: null//{ message: 'You did not submit any online domains.',  alert: "alert alert-danger" }
        })
      } else {
        this.setState({ urlsUploading: true })
        this.submitUrls(this.state.user, allUrls);  /////////////////////////////////////////////////////////
      }
    } else if (!userLoggedIn) {   
      if (noUrls) {
        this.setState({ 
          activeComponent: 'landing',
          message: { message: 'Please submit at least one valid Url',  alert: null }
        })
      } else {
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
        self.runCreateUrlObj(text,null)

        var allUrls = self.state.allUrls
        var verified = data.user.verified

        var countUrls = 0;
        var countActiveDomains = 0;
        var countUrlFromActiveDomains = 0;
   
        allUrls.map(function(obj){
          countUrls += obj.urlCount;
          if(obj.domainActive && obj.urlCount > 0){countActiveDomains += 1};
          if(obj.domainActive && obj.countToSubmitNow > 0){countUrlFromActiveDomains += 1};
        })
   
        var noUrls = (countUrls <= 0)
        var noActiveDomains = (countActiveDomains <= 0)
        var noUrlsFromActiveDomains = (countUrlFromActiveDomains <= 0)

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
        } else if (noActiveDomains || noUrlsFromActiveDomains){
          self.setState({ 
            activeComponent: 'orderIncomplete',
            message: null //{ message: 'You did not submit any active domains',  alert: "alert alert-danger" }
          })
        } else {
          self.setState({ urlsUploading: true })
          self.submitUrls(user, allUrls);  /////////////////////////////////////////////////////////
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      if(!self.state.domainsLoading){ self.runCreateUrlObj(text,null); }
    })
  },

  getCustomers: function(){
    var self = this;
    $.ajax({
      method: 'GET', 
      url: '/getCustomers'
    }).done(function(data){
      self.setState({ 
        customers: data,
        activeComponent: 'landing',
        message: null,
        customersLoading: false,
      });
      // if(!self.state.domainsLoading){ self.runCreateUrlObj(text,null); }
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
            passwordResetToken: null,
            passwordResetEmail: null,
            emailVerificationCount: 0,
            passwordResetCount: 0,

            activeComponent: 'landing',
            rawText: '',
            message: null,
            urlsUploading: false,
            customerIdDashboard: null,
            customerId: null,
            showSubmittedUrls: false,
            urlType: 'Select Url Type',
            customerName: 'Select Customer',
            urlTypeDashboard: 'Select Url Type',
            customerNameDashboard: 'Select Customer'
          });
        })
        self.runCreateUrlObj('dummyData', null);
      }.bind(self),
      error: function(xhr, status, err){
        console.error('/logout', status, err.toString());
      }
    })
  },

  setActiveComponent: function(componentName) {
    if (componentName === 'login' || componentName === 'landing' || componentName === 'dashboard'){
      this.setState({
        activeComponent: componentName,
        rawText: '',
        message: null,
        urlsUploading: false,
        customerIdDashboard: null,
        customerId: null,
        showSubmittedUrls: false,
        urlType: 'Select Url Type',
        customerName: 'Select Customer',
        urlTypeDashboard: 'Select Url Type',
        customerNameDashboard: 'Select Customer',
      })
      this.runCreateUrlObj('dummyData', this.state.urlType);
    } else {
      this.setState({
        activeComponent: componentName,
        message: null,
      })
    }
  },

  componentWillMount: function(){
      this.getCustomers();
      this.getDomains();
      this.getOneUserFromServer();

    // setTimeout(() => {
      // this.setState({  
      //   allDomains: [['amazon.com', false ],['walmart.ca', true ],['sears', true],['homedepot', false]],
      //   domainsLoading: false
      // });
      // if(!this.state.userLoading){
      //   this.runCreateUrlObj('dummyData', null);
      // }
    // }, 1110);

    // setTimeout(() => {
    // }, 1110);
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // NOT USED 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitUrlsID: function(user, allUrls){
    var self = this;

    var urlsToSubmit = [];
    var newCountLeftToSubmit = [];

    allUrls.map(function(obj){
      if (obj.domainActive === true && obj.urlCount > 0 && obj.countToSubmitNow > 0){
        // var temp = []
        // temp.domain = obj.domain
        // temp = obj.urls.slice(0, obj.countToSubmitNow)
        obj.urls.slice(0, obj.countToSubmitNow).map(function(url){
          urlsToSubmit.push(url)
        })
      }
      if (obj.domainOffered === true){
        newCountLeftToSubmit.push({domain: obj.domain, count: obj.countLeftAfterSubmit})
      }
    })

    $.ajax({
      method: 'POST',
      url: '/submitUrlsId',
      data: { user: user, urlsToSubmit: urlsToSubmit, newCountLeftToSubmit: newCountLeftToSubmit },
      success: function(data){
        self.setState({ 
          user: data.user,
          activeComponent: data.activeComponent,
          message: data.message,
          urlsUploading: false
        });
      },
      error: function(xhr, status, err){
        console.error('/submitUrlsId', status, err.toString())
      }
    })
  },  
  submitUrlsNoID: function(allUrls){
    var self = this;
    self.setState({ 
      activeComponent: 'login', 
      message: null,
    })
  },
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
        self.runCreateUrlObj(text,null)
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
  emailVerification: function(){
    var self = this;
    var allUrls = self.state.allUrls

    var countUrls = 0;
    var countActiveDomains = 0;
    var countUrlFromActiveDomains = 0;
    allUrls.map(function(obj){
      countUrls += obj.urlCount;
      if(obj.domainActive && obj.urlCount > 0){countActiveDomains += 1};
      if(obj.domainActive && obj.countToSubmitNow > 0){countUrlFromActiveDomains += 1};
    })
    var noUrls = (countUrls <= 0)
    var noActiveDomains = (countActiveDomains <= 0)
    var noUrlsFromActiveDomains = (countUrlFromActiveDomains <= 0) 

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
      } else if (noUrlsFromActiveDomains || noActiveDomains){
        self.setState({ 
          activeComponent: 'orderIncomplete',
          message: null//{ message: 'You already submitted your allotment these domains',  alert: "alert alert-danger" },
      })
      } else {
        self.setState({ urlsUploading: true })
        self.submitUrls(self.state.user, allUrls);  /////////////////////////////////////////////////////////
      }
    })
  },
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
          // console.log('in success', data)
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
  submitSuggestedDomains: function(arr) {
    var self = this;
      $.ajax({
        method: 'POST',
        url: '/suggest',
        data: { arr: arr},
        success: function(data){
          // console.log('submitSuggestedDomains success', data)
        },
        error: function(xhr, status, err){
          console.error('/suggest', status, err.toString())
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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // NOT USED 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render: function(){
      // console.log(this.state.customerId)
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
        customersLoading={ this.state.customersLoading } 
        domainsLoading={ this.state.domainsLoading } 
        urlsUploading={ this.state.urlsUploading } 
        urlsDownloading={ this.state.urlsDownloading } 
        createUrlObj={ this.createUrlObj } 
        user={ this.state.user } 
        customers={ this.state.customers } 
        message={ this.state.message } 
        customerId={ this.state.customerId } 
        customerName={ this.state.customerName } 
        urlType={ this.state.urlType } 
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
        verifyPasswordReset={ this.verifyPasswordReset } 
        emailVerificationResend={ this.emailVerificationResend } 
        resetPassword={ this.resetPassword } 
        submitSuggestedDomains={ this.submitSuggestedDomains } 
        forgotPassword={ this.forgotPassword }
        forgotPasswordResend={ this.forgotPasswordResend } 
        passwordResetEmail={ this.state.passwordResetEmail } 
        emailVerificationCount={ this.state.emailVerificationCount } 
        passwordResetCount={ this.state.passwordResetCount } 
        
        urlTypeDashboard={ this.state.urlTypeDashboard } 
        selectAll={ this.state.selectAll } 
        customerNameDashboard={ this.state.customerNameDashboard } 
        customerIdDashboard={ this.state.customerIdDashboard } 
        allSubmittedUrlsPerCustomer={ this.state.allSubmittedUrlsPerCustomer } 
        showSubmittedUrls={ this.state.showSubmittedUrls } 
        showSpiderName={ this.state.showSpiderName } 
        deleteCount={ this.state.deleteCount } 

        handleShowSpiderName={ this.handleShowSpiderName} 
        handleDeleteUrls={ this.handleDeleteUrls } 
        handleGetSubmitedUrls={ this.handleGetSubmitedUrls } 
        handleUrlSubmit={ this.handleUrlSubmit } 
        handleSelectUrlToDelete={ this.handleSelectUrlToDelete } 
        handleSelectAllUrlToDelete={ this.handleSelectAllUrlToDelete } 
        handleSelectNoneUrlToDelete={ this.handleSelectNoneUrlToDelete } 
        handleCustomerSelect={ this.handleCustomerSelect } 
        handleCustomerSelectDashboard={ this.handleCustomerSelectDashboard } 
        handleUrlTypeSelect={ this.handleUrlTypeSelect } 
        handleUrlTypeSelectDashboard={ this.handleUrlTypeSelectDashboard } 
        />
      </div>
        // <Footer/>
  	)
	}
});

ReactDOM.render(	<Index />,	document.getElementById('app'));

