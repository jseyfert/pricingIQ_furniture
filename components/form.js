
var React = require('react');
// var SuggestHtml = require('./suggestHtml.js');
var _ = require("underscore");
var Input = require('./input.js');
var validator = require('validator')
var ErrorMessage = require('./errorMessage'); // delete


var Form = React.createClass({
  getInitialState: function(){
    return {
      name: '',
      company: '',
      email: '', 
      password: '',
      confirmPassword: '',
      token: '',
    };
  },

  handleNameChange: function(e){ this.setState({ name: e.target.value }) },
  handleCompanyChange: function(e){ this.setState({ company: e.target.value }) },
  handleEmailChange: function(e){ this.setState({ email: e.target.value }) },
  handlePasswordChange: function(e){ this.setState({ password: e.target.value }) },  
  handleConfirmPasswordChange: function(e){ this.setState({ confirmPassword: e.target.value }) },
  handleConfirmToken: function(e){ this.setState({ token: e.target.value }) },

  validate: function(state){
    return {
      name: (state.name.length >= 2),
      company: (state.company.length >= 2),
      email: validator.isEmail(state.email),
      password: (state.password.length >= 8),
      confirmPassword: validator.equals(state.password, state.confirmPassword),
      token: (state.token.length === 32),
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
    var activeComponent = this.props.activeComponent
    console.log('activeComponent',activeComponent)
    var valid = this.validate(this.state);
    if (true)
    return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          <h1><span className="fa fa-sign-in"></span> Login</h1>
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
              {this.button()}
            </form>
            <hr/>
            <p>Already have an account? <a onClick={ this.props.setActiveComponent.bind(null, 'signup') }>Signup</a></p>
          </div>    
        </div>    
      </div>
    );
  }
});

module.exports = Form;