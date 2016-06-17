var React = require('react');
var ReactDOM = require('react-dom');
var UserLoginData = require('./userLoginData.js');

var UserAuth = React.createClass({
	getInitialState: function(){
		return {
			user: null
		}
	},

	loginUserFromServer: function(user){
		console.log(user);
		$.ajax({
			method: 'POST',
			url: '/login',
			data: user,
			success: function(data){
				console.log(data);
			},
			error: function(xhr, status, err){
				console.error('/login', status, err.toString())
			}
		})
	},

	

	render: function(){
		return (
			<div>
				<div className="container color">
					<h1> data </h1>
					<UserLoginData loginUserFromServer={ this.loginUserFromServer }/>
				</div>
			</div>
			)
	}
});

ReactDOM.render(
	<UserAuth/>,
	document.getElementById('app')
);