// index *State*
//   header/*/
//    userLogout/*/
//    showWhichComponent
//     UserLoginData *State*
//       UserLoginForm/*/
//     UserSignupData *State*
//       UserSignupForm
//     UploadUrlsData *State*
//       UploadUrlsForm
//    footer/*/

var React = require('react');
var ReactDOM = require('react-dom');
var ShowWhichComponent = require('./showWhichComponent.js');
var Header = require('./header.js');
var Footer = require('./footer.js');
var _ = require("underscore");

var Index = React.createClass({
	getInitialState: function(){
		return {
      submitClick: false,
      submitedToday: null,
      submitUrlError: null,
			errorMessage: null,
			user: null,
      activeSubComponent: 'login',
			allUrls: [],
			allDomains: 
			[
			{domain: 'amazon' , domainAvailable: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/200px-Amazon.com-Logo.svg.png'},
			{domain: 'walmart', domainAvailable: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Wal-Mart_logo.svg/200px-Wal-Mart_logo.svg.png'},
			{domain: 'sears' ,  domainAvailable: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sears_logo_2010-present.svg/170px-Sears_logo_2010-present.svg.png'}
			]
		}
	},

	getOneUserFromServer: function(){
		var currentTime = new Date().getTime()
		var self = this;
		$.ajax({
			method: 'GET', 
			url: '/oneUser'
		}).done(function(data){
   //    console.log( 'in getOneUser', data);
			self.setState({ 
				submitedToday: data.canSubmitAfter ? (currentTime < data.canSubmitAfter) : null,
        submitUrlError: null,
        errorMessage: null,
        user: data,
        activeSubComponent: 'login',
				 });
		})
	},

  loginUserFromServer: function(user){
    var currentTime = new Date().getTime()
    console.log(this.state.allUrls);
    var self = this;
    $.ajax({
      method: 'POST',
      url: '/login',
      data: user,
      success: function(data){
        console.log("in loginUserFromServer1", data.user);
        self.setState({ 
          user: data.user,
          submitedToday: (currentTime < data.user.canSubmitAfter)
           });
      },
      error: function(xhr, status, err){
        console.error('/login', status, err)
        self.setState({ 
          errorMessage: 'Email or password incorrect'
         });
      }
    })
  },	

	signupUserFromServer: function(user){
		var self = this;	
		$.ajax({
			method: 'POST',
			url: '/signup',
			data: user, 
			success: function(data){
				self.setState({ 
					user: data.user,
					submitedToday: false
				})
			},
			error: function(xhr, status, err){
				console.error('/signup', status, err)
				self.setState({ 
					errorMessage: 'That email is taken'
				});
			}
		})
	},

	logoutUser: function(user){
		// console.log('in logoutUser');
		var self = this;
		$.ajax({
			url: '/logout',
			method: 'GET', 
			success: function(data){
				$.ajax({
					method: 'GET', 
					url: '/oneUser'
				}).done(function(data){
					// console.log('in loggout', data);
					self.setState({ 
            submitClick: false,
            submitedToday: null,
            submitUrlError: null,
            errorMessage: null,
            activeSubComponent: 'login',
            user: data,
						 });
				})
			}.bind(self),
			error: function(xhr, status, err){
				console.error('/logout', status, err.toString());
			}
		})
	},

	submitUrlsToServer: function(urls){
    var noUrls = (urls.length === 0) ? true : false;
    var submitedToday = this.state.submitedToday
    var noActiveDomains = (_.where(urls, {domainAvailable: true}).length === 0) ? true : false
    // var midnight = new Date().setHours(23,59,59,0);

    if (noUrls) {
      this.setState({ 
        submitClick: false,
        errorMessage: 'Submit at least 1 valid url'
      })
    }  else if (submitedToday) {
      console.log('in submitedToday');
      this.setState({ 
        allUrls: urls,
        submitClick: true,
        submitUrlError: true,
        errorMessage: null
      })
    } else if (noActiveDomains){
      console.log('in noActiveDomains');
      this.setState({ 
        allUrls: urls,
        submitClick: true,
        submitUrlError: true,
        errorMessage: null
      })
    } else {
      this.setState({ 
        allUrls: urls,
        submitClick: true,
        errorMessage: null
      })
    }

		// $.ajax({
		// 	method: 'PUT',
		// 	url: '/updateUser',
		// 	data: this.state.user,
		// 	success: function(data){
		// 		// console.log("in loginUserFromServer1", data.user);
		// 		// console.log("in loginUserFromServer2", currentTime, data.user.canSubmitAfter );
		// 		console.log("in submitUrls to server", data);
		// 		// self.setState({ 
		// 		// 	user: data.user,
		// 		// 	submitedToday: (currentTime > data.user.canSubmitAfter)
		// 		// 	 });
		// 	},
		// 	error: function(xhr, status, err){
		// 		console.error('/updateUser', status, err.toString())
		// 	}
		// })
	},

  setActiveSubComponent: function(componentName) {
    // console.log('in setActiveSubComponent', componentName);
    this.setState({
      activeSubComponent: componentName,
      errorMessage: null,
    })
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
          />
					<ShowWhichComponent 
          user={ this.state.user } 
          submitedToday={ this.state.submitedToday } 
          submitUrlError={ this.state.submitUrlError } 
          submitClick={ this.state.submitClick } 
          errorMessage={ this.state.errorMessage } 
          allUrls={ this.state.allUrls } 
          allDomains={ this.state.allDomains } 
          logoutUser={ this.logoutUser } 
          activeSubComponent={ this.state.activeSubComponent } 
          setActiveSubComponent={ this.setActiveSubComponent } 
          submitUrlsToServer={ this.submitUrlsToServer } 
          loginUserFromServer={ this.loginUserFromServer } 
          signupUserFromServer={ this.signupUserFromServer }
          />
        </div>
					// <Footer />
			)
			}
	}
});

ReactDOM.render(	<Index />,	document.getElementById('app'));

