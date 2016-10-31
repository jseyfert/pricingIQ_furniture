
var React = require('react');
var LogoutUser = require('./userLogout.js');

var UploadUrlsForm = React.createClass({
	render: function(){
		return (
			<div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          <h1><span className="fa fa-sign-in"></span> Upload Urls</h1>
      			<form className="" onSubmit={ this.props.handleUrlSubmit }>
      				<div className="form-group">
      					
                <textarea className="form-control" name="url" rows="6" id="url" onChange={ this.props.onUrlChange } value={ this.props.url } required></textarea>
      				</div>
      			    <button className="btn btn-warning btn-lg">Submit</button>
      			</form>
            <hr/>
            <a onClick={ this.props.logoutUser }>Logout</a>
          </div>    
        </div>    
			</div>
		)
	}
});

module.exports = UploadUrlsForm;

// <input type="password" className="form-control" name="password" onChange={ this.props.onPasswordChange } value={ this.props.password }/>
// <label>Paste Urls here:</label>