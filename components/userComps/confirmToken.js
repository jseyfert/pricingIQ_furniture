var React = require('react');
var Input = require('../partialComps/input.js');
var Message = require('../partialComps/message');

var _ = require("underscore");
var validator = require('validator')

var ConfirmToken = React.createClass({
	getInitialState: function(){
		return {
			token: '',
			keyCount: 0,
		}
	},

  onTokenChange: function(e){ this.setState({ token: e.target.value }) },

  validate: function(state){
    return {
      token: (state.token.length >= 32),
    }
  },

	handleTokenSubmit: function(e){
		e.preventDefault();
		
		var stateValidation = this.validate(this.state)
		var allvalid = (
			stateValidation.token === true
		)

		if (allvalid){
			this.props.verifyPasswordReset(this.state.token);
			var addOne = this.state.keyCount +=1
			this.setState({ 
			  token: '',
			  keyCount: addOne,
			});
		}
	},

	render: function(){
		var valid = this.validate(this.state);
		var forgotPasswordResend = this.props.forgotPasswordResend;
    var passwordResetCount= this.props.passwordResetCount;
    // console.log('passwordResetCount', passwordResetCount)
    var displayPasswordResend = (this.props.passwordResetCount <= 2) ? <p>Didn't recieve an email? <a onClick={ this.props.forgotPasswordResend } >Send Again</a></p> : null;
    
		return (
			<div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          <Message message={this.props.message} />
          <h1><span className="fa fa-sign-in"></span>Verify User</h1>
            <form className="" onSubmit={ this.handleTokenSubmit }>

              <Input 
              key={this.state.keyCount + 'token'}
              valid={valid.token}
              value={this.state.token} 
              onChange={this.onTokenChange} 
              lable='Token'
              type='text'
              errorMessageClient='This token is too short'
              />

             	<button className="btn btn-warning btn-lg">Send</button>
            </form>
            <hr/>
            {displayPasswordResend}
          </div>    
        </div>    
      </div>
			)
	}
});

module.exports = ConfirmToken;
