var React = require('react');
var Input = require('../partialComps/input.js');
var Message = require('../partialComps/message');

var _ = require("underscore");
var validator = require('validator')

var Login = React.createClass({
  getInitialState: function(){
    return {
      email: '',
      password: '',
      keyCount: 0,
    };
  },

  onEmailChange: function(e){ this.setState({ email: e.target.value }) },
  onPasswordChange: function(e){ this.setState({ password: e.target.value }) },

	validate: function(state){
	  return {
	    email: validator.isEmail(state.email),
	    password: (state.password.length >= 8),
	  }
	},

	handleUserLoginSubmit: function(e){
		e.preventDefault();
		var currentTime = new Date().getTime()
		var midnightTonight = new Date().setHours(23,59,59,0);
		var stateValidation = this.validate(this.state)
		var allvalid = (
			stateValidation.email === true && 
			stateValidation.password === true
		)

		if (allvalid){
			var userForm = {};
			userForm.email = this.state.email;
			userForm.password = this.state.password;
			userForm.currentTime = currentTime;
			userForm.newResetCountAfter = midnightTonight;
			userForm.allDomains = this.props.allDomains

			this.props.loginUserFromServer(userForm);
      var addOne = this.state.keyCount +=1
			this.setState({ email:'' , password :'', keyCount: addOne});
		}
	},


	render: function(){
		var valid = this.validate(this.state);
    // console.log('in render 1',this.props.message)
		return (

			<div>

			<div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
            <h1><span className="fa fa-sign-in"></span> Login</h1>
              <Message message={this.props.message} />
      			<form className="" onSubmit={ this.handleUserLoginSubmit }>

              <Input 
              key={this.state.keyCount + 'email'}
              valid={valid.email}
              value={this.state.email} 
              onChange={this.onEmailChange} 
              lable='Email'
              type='email'
              errorMessageClient='Email is not valid'
              />

              <Input 
              key={this.state.keyCount + 'password'}
              valid={valid.password}
              value={this.state.password}
              onChange={this.onPasswordChange}
              lable='Password'
              type='password'
              errorMessageClient='Password must contain at least 8 characters'
              />   

      					<button className="btn btn-warning btn-lg">Login</button>&nbsp;&nbsp;
                <a onClick={ this.props.setActiveComponent.bind(null, 'forgotPassword') } >Forgot your password?</a>
            </form>
            <hr/>
            <p>Need an account? <a onClick={ this.props.setActiveComponent.bind(null, 'signup') } >Signup</a></p>
          </div>
        </div>
      </div>

			</div>
			)
	}
});

module.exports = Login;

