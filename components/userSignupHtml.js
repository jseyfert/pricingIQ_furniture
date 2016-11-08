
var React = require('react');

var UserSignupHtml = React.createClass({

	render: function(){
    
		return (
			<div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          <h1><span className="fa fa-sign-in"></span> Signup</h1>
      			<form className="" onSubmit={ this.props.handleUserSignupSubmit }>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name" onChange={ this.props.onUserChange } value={ this.props.user }/>
              </div>
              <div className="form-group">
                <label>Company</label>
                <input type="text" className="form-control" name="company" onChange={ this.props.onCompanyChange } value={ this.props.company }/>
              </div>
              <div classcompany="form-group">
                <label>Email</label>
                <input type="text" className="form-control" name="email" onChange={ this.props.onEmailChange } value={ this.props.email }/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" onChange={ this.props.onPasswordChange } value={ this.props.password }/>
              </div>
      			    <button className="btn btn-warning btn-lg">Sign up</button>
      			</form>
            <hr/>
            <p>Already have an account? <a onClick={ this.props.setActiveSubComponent.bind(null, 'login') }>Login</a></p>
          </div>    
        </div>    
      </div>
    )
  }
});

module.exports = UserSignupHtml;