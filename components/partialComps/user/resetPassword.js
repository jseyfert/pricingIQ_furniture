var React = require('react');
var Input = require('../input.js');
var Message = require('../message');

var _ = require("underscore");
var validator = require('validator')

var ResetPassword = React.createClass({
	getInitialState: function(){
    return {
      password: '',
      confirmPassword: '',
    };
	},

  onPasswordChange: function(e){ this.setState({ password: e.target.value }) },
  onConfirmPasswordChange: function(e){ this.setState({ confirmPassword: e.target.value }) },

	validate: function(state){
	  return {
      password: (state.password.length >= 8),
      confirmPassword: validator.equals(state.password, state.confirmPassword),
	  }
	},

	handlePasswordResetSubmit: function(e){
		e.preventDefault();

		var stateValidation = this.validate(this.state)
		var allvalid = (
			stateValidation.password === true && 
			stateValidation.confirmPassword === true
		)

		if (allvalid){
			this.props.resetPassword(this.state.password);
			// this.setState({ 
			//   password: '',
			//   confirmPassword: ''
			// });
		}
	},

	render: function(){
		var valid = this.validate(this.state);
		return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          <Message message={this.props.message} />
          <h1><span className="fa fa-sign-in"></span>Reset Password</h1>
            <form className="" onSubmit={ this.handlePasswordResetSubmit }>
             
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

                <button className="btn btn-warning btn-lg">Reset</button>
            </form>
            <hr/>
          </div>    
        </div>    
      </div>
			)
	}
});

module.exports = ResetPassword;