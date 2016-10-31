// UserAuth
// 	awareOfUser
// 		UserLoginData
// 			UserLoginForm
// 		UserSignupData
// 			UserSignupForm
// 	  UserLogout

var React = require('react');
var ReactDOM = require('react-dom');

var AwareOfUser = require('./awareOfUser.js');

var UserAuth = React.createClass({
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

	test: function() {
    console.log('in test');
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
		this.getOneUserFromServer();
	},



	render: function(){
			var user = this.state.user ? <AwareOfUser user={ this.state.user } activeComponent={ this.state.activeComponent } test={ this.test } setActiveComponent={ this.setActiveComponent } logoutUser={ this.logoutUser } loginUserFromServer={ this.loginUserFromServer } signupUserFromServer={ this.signupUserFromServer }/> : null;
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
	<UserAuth/>,
	document.getElementById('app')
);