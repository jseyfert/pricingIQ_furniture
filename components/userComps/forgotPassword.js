var React = require('react');
var Input = require('../partialComps/input.js');
var Message = require('../partialComps/message');

var _ = require("underscore");
var validator = require('validator')


var ForgotPassword = React.createClass({
	getInitialState: function(){
		return {
			email: '',
			keyCount: 0,
		}
	},

  onEmailChange: function(e){ this.setState({ email: e.target.value }) },

  validate: function(state){
    return {
      email: validator.isEmail(state.email),
    }
  },

	handlePasswordReset: function(e){
		e.preventDefault();

		var stateValidation = this.validate(this.state)
		var allvalid = (
			stateValidation.email === true
		)

		if (allvalid){
			this.props.forgotPassword(this.state.email);
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
          <Message message={this.props.message} />
          <h1><span className="fa fa-sign-in"></span> Forgot Password</h1>
            <form className="" onSubmit={ this.handlePasswordReset }>

              <Input 
              key={this.state.keyCount + 'email'}
              valid={valid.email}
              value={this.state.email} 
              onChange={this.onEmailChange} 
              lable='Email'
              type='email'
              errorMessageClient='Email is not valid'
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

module.exports = ForgotPassword;

			// <div>
			// 	<ForgotPasswordHtml 
			// 	message={ this.props.message } 
			// 	errorMessage={ this.props.errorMessage }
			// 	handlePasswordReset={ this.handlePasswordReset }
			// 	setActiveComponent={ this.props.setActiveComponent }
			// 	onEmailChange={ this.onEmailChange }
			// 	email={ this.state.email }
			// 	/>
			// </div>