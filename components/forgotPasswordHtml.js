var React = require('react');

var ForgotPasswordHtml = React.createClass({

  showErrorMessage: function(){
    var errorMessage = (this.props.errorMessage) ? this.props.errorMessage : null;
    // console.log(errorMessage);
    if (errorMessage){
      return(
        <div>
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error: </span>
              { errorMessage }
          </div>
        </div>
        )
    }
  },

  render: function(){
    console.log(this.props.errorMessage);
    return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          {this.showErrorMessage()}
          <h1><span className="fa fa-sign-in"></span> Forgot Password</h1>
            <form className="" onSubmit={ this.props.handlePasswordReset }>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" name="email" onChange={ this.props.onEmailChange } value={ this.props.email } required/>
              </div>
                <button className="btn btn-warning btn-lg">Reset</button>
            </form>
            <hr/>
            <p>Back to Login? <a onClick={ this.props.setActiveComponent.bind(null, 'login') }>Login</a></p>
          </div>    
        </div>    
      </div>
    )
  }
});

module.exports = ForgotPasswordHtml;