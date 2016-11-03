// index *State*
//   header
//     UserLogout
//   body
//     awareOfUser
//       UserLoginData *State*
//         UserLoginForm
//       UserSignupData *State*
//         UserSignupForm
//       UploadUrlsData *State*
//         UploadUrlsForm
//   footer



var React = require('react');
var ReactDOM = require('react-dom');
var AwareOfUser = require('./awareOfUser.js');
var Header = require('./header.js');

var Index = React.createClass({
	getInitialState: function(){
		return {
			user: null,
			activeComponent: 'login'
		}
	},

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

	loginUserFromServer2: function(user){
		var self = this;
		$.ajax({
			method: 'POST',
			url: '/login',
			data: user,
			success: function(data){
				console.log("Login successful - in loginUserFromServer2", data);
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
		console.log('in submitUrlsToServer', urls);
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


        // <Header />

			// var user = this.state.user ? <AwareOfUser user={ this.state.user } activeComponent={ this.state.activeComponent } setActiveComponent={ this.setActiveComponent } logoutUser={ this.logoutUser } submitUrlsToServer={ this.submitUrlsToServer } loginUserFromServer={ this.loginUserFromServer } loginUserFromServer2={ this.loginUserFromServer2 } signupUserFromServer={ this.signupUserFromServer }/> : null;
	render: function(){
		var user = null;
			return (
			<div>
				<div className="container">
					{ user }
					
				</div>
			</div>
			)
	}
});

ReactDOM.render(
	<Index />,
	document.getElementById('app')
);