
var React = require('react');
// var SuggestHtml = require('./suggestHtml.js');
var _ = require("underscore");
var Input = require('./input.js');
var validator = require('validator')

var ErrorMessage = require('./errorMessage'); // delete


var SuggestData = React.createClass({
  getInitialState: function(){
    return {
      email: '', 
      password: '',
      confirmPassword: '',
    };
  },

  handleEmailChange: function(e){ this.setState({ email: e.target.value }) },
  handlePasswordChange: function(e){ this.setState({ password: e.target.value }) },  
  handleConfirmPasswordChange: function(e){ this.setState({ confirmPassword: e.target.value }) },

  validate: function(state){
    return {
      email: validator.isEmail(state.email),
      password: (state.password.length >= 8),
      confirmPassword: validator.equals(state.password, state.confirmPassword),
    }
  },

  button: function(){
    var stateValidation = this.validate(this.state)
    if (stateValidation.email === true && stateValidation.password === true && stateValidation.confirmPassword === true){
      return <button className="btn btn-warning btn-lg">Sign up</button>
    } else{
      return <button className="btn btn-warning btn-lg" disabled="disabled">Sign up</button>
    }
  },

  handleSubmit: function(e){
    e.preventDefault();
    this.props.submitSuggestedDomains(this.state) 
    this.setState({ email: '' })
  },

  render: function(){
    var valid = this.validate(this.state);
    return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          <h1><span className="fa fa-sign-in"></span> test</h1>
            <form className="" onSubmit={ this.handleSubmit }>
              <Input 
              valid={valid.email}
              value={this.state.email} 
              onChange={this.handleEmailChange} 
              lable='Email'
              errorMessage={(this.props.message) ? this.props.message.message : '- is not valid'}   //'- is not valid'
              />
              <Input 
              valid={valid.password}
              value={this.state.password}
              onChange={this.handlePasswordChange}
              lable='Password'
              errorMessage='- must contain at least 8 characters'
              />        
              <Input 
              valid={valid.confirmPassword}
              value={this.state.confirmPassword}
              onChange={this.handleConfirmPasswordChange}
              lable='Confirm Password'
              errorMessage='- passwords do not match'
              />
              {this.button()}
            </form>
            <hr/>
          </div>    
        </div>    
      </div>
            // <p>Already have an account? <a onClick={ this.props.setActiveComponent.bind(null, 'login') }>Login</a></p>
    );
  }
});

module.exports = SuggestData;