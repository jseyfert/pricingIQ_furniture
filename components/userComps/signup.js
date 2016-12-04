var React = require('react');
var Input = require('../partialComps/input.js');
var Message = require('../partialComps/message');

var _ = require("underscore");
var validator = require('validator')

var Signup = React.createClass({
  getInitialState: function(){
    return {
      user: '',
      company: '',
      email: '',
      password: '',
      confirmPassword: '',
      keyCount: 0,
    };
  },

  onUserChange: function(e){ this.setState({ user: e.target.value }) },
  onCompanyChange: function(e){ this.setState({ company: e.target.value }) },
  onEmailChange: function(e){ this.setState({ email: e.target.value }) },
  onPasswordChange: function(e){ this.setState({ password: e.target.value }) },  
  onConfirmPasswordChange: function(e){ this.setState({ confirmPassword: e.target.value }) },

  validate: function(state){
    return {
      user: (state.user.length >= 1),
      company: (state.company.length >= 1),
      email: validator.isEmail(state.email),
      password: (state.password.length >= 8),
      confirmPassword: validator.equals(state.password, state.confirmPassword),
    }
  },

	handleUserSignupSubmit: function(e){
		e.preventDefault();
		var midnightTonight = new Date().setHours(23,59,59,0);
		var stateValidation = this.validate(this.state)
		var allvalid = (
			stateValidation.user === true && 
			stateValidation.company === true && 
			stateValidation.email === true && 
			stateValidation.password === true && 
			stateValidation.confirmPassword === true
		)

		if (allvalid){
			var userForm = {};

			userForm.user = this.state.user;
			userForm.company = this.state.company;
			userForm.email = this.state.email;
			userForm.password = this.state.password;
			userForm.resetCountAfter = midnightTonight;
			userForm.allDomains = this.props.allDomains

			this.props.signupUserFromServer(userForm);
      var addOne = this.state.keyCount +=1
			this.setState({ 
			  email: '',
        keyCount: addOne,
			});
		}
	},

	render: function(){
		var valid = this.validate(this.state);
		return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          <h1><span className="fa fa-sign-in"></span> Signup</h1>
          <Message message={this.props.message} />
            <form className="" onSubmit={ this.handleUserSignupSubmit }>

              <Input 
              valid={valid.user}
              value={this.state.user} 
              onChange={this.onUserChange} 
              lable='Name'
              type='text'
              errorMessageClient='Name is required'
              />
              <Input 
              valid={valid.company}
              value={this.state.company} 
              onChange={this.onCompanyChange} 
              lable='Company'
              type='text'
              errorMessageClient='Company is required'
              />
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
              valid={valid.password}
              value={this.state.password}
              onChange={this.onPasswordChange}
              lable='Password'
              type='password'
              errorMessageClient='Password must contain at least 8 characters'
              />   
              <Input 
              valid={valid.confirmPassword}
              value={this.state.confirmPassword}
              onChange={this.onConfirmPasswordChange}
              lable='Confirm Password'
              type='password'
              errorMessageClient='Passwords do not match'
              />   

            	<button className="btn btn-warning btn-lg">Sign up</button>
            </form>
            <hr/>
            <p>Already have an account? <a onClick={ this.props.setActiveComponent.bind(null, 'login') }>Login</a></p>
          </div>    
        </div>    
      </div>
    )
	}
});

module.exports = Signup;
