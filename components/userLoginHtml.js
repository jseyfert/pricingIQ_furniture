
var React = require('react');

var UserLoginHtml = React.createClass({

	render: function(){

		return (
			<div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
            <h1><span className="fa fa-sign-in"></span> Login</h1>
      			<form className="" onSubmit={ this.props.handleUserLoginSubmit }>
      				<div className="form-group">
      					<label>Email</label>
    						<input type="text" className="form-control" name="email" onChange={ this.props.onEmailChange } value={ this.props.email }/>
      				</div>	
      				<div className="form-group">
      					<label>Password</label>
      					<input type="password" className="form-control" name="password" onChange={ this.props.onPasswordChange } value={ this.props.password }/>
      				</div>
      					<button className="btn btn-warning btn-lg">Log in</button>
      			</form>
            <hr/>
            <p>Need an account? <a onClick={ this.props.setActiveSubComponent.bind(null, 'signup') } >Signup</a></p>
          </div>
        </div>
      </div>
      )
  }
});

module.exports = UserLoginHtml;