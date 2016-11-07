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

var Index = React.createClass({
	getInitialState: function(){
		return {
			user: null,
			submitClicked: false,
			activeComponent: 'login',
			allSubmittedUrls: [],	//allUrls
			allDomains: 
			[
			{domain: 'amazon' , domainAvailable: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/200px-Amazon.com-Logo.svg.png'},
			{domain: 'walmart', domainAvailable: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Wal-Mart_logo.svg/200px-Wal-Mart_logo.svg.png'},
			{domain: 'sears' ,  domainAvailable: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sears_logo_2010-present.svg/170px-Sears_logo_2010-present.svg.png'}
			]
		}
	},

	//domain active
       
	setActiveComponent: function(componentName) {
    this.setState({
      activeComponent: componentName
    })
  },

	loginUserFromServer: function(user){
		var self = this;
		$.ajax({
			method: 'POST',
			url: '/login',
			data: user,
			success: function(data){
				console.log("Login successful.", data);
				self.setState({ user: data });
			},
			error: function(xhr, status, err){
				console.error('/login', status, err.toString())
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
				self.setState({ user: data})
				console.log("Signup successful.", data);
			},
			error: function(xhr, status, err){
				console.error('/signup', status, err.toString())
			}
		})
	},

	submitUrlsToServer: function(urls){
		console.log('in submitUrlsToServer', urls, this.state.user);

	 this.setState({ 
      allSubmittedUrls: urls,
      submitClicked: true
    })
		// var self = this;	
		// $.ajax({
		// 	method: 'POST',
		// 	url: '/signup',
		// 	data: urls, 
		// 	success: function(data){
		// 		self.setState({ urls: data})
		// 		console.log("Signup successful.", data);
		// 	},
		// 	error: function(xhr, status, err){
		// 		console.error('/signup', status, err.toString())
		// 	}
		// })
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
					console.log(data);
					self.setState({ user: data });
				})
			}.bind(self),
			error: function(xhr, status, err){
				console.error('/logout', status, err.toString());
			}
		})
	},

	getOneUserFromServer: function(){
		var self = this;
		$.ajax({
			method: 'GET', 
			url: '/oneUser'
		}).done(function(data){
			console.log(data);
			self.setState({ user: data });
		})
	},	

	componentDidMount: function(){
		// console.log('in componentDidMount');
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
          allSubmittedUrls={ this.state.allSubmittedUrls } 
          allDomains={ this.state.allDomains } 
          logoutUser={ this.logoutUser } 
          submitClicked={ this.state.submitClicked } 
          activeComponent={ this.state.activeComponent } 
          setActiveComponent={ this.setActiveComponent } 
          submitUrlsToServer={ this.submitUrlsToServer } 
          loginUserFromServer={ this.loginUserFromServer } 
          signupUserFromServer={ this.signupUserFromServer }
          />
					<Footer />
				</div>
			)
			}
	}
});

ReactDOM.render(	<Index />,	document.getElementById('app'));

