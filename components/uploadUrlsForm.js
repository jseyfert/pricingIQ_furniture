
var React = require('react');

var UploadUrlsForm = React.createClass({

  displayUrls: function(){
    var urlArray = this.props.url
    var maxUrl = this.props.maxUrls

    var urlListItems = urlArray.map(function(url ){
        return (
        <div>
          <li style={{ color: 'black' }} > 
              { url } 
          </li> 
        </div>
        )
    })

    

    return urlListItems;
  },


  render: function(){
    var showWarning = this.props.maxUrls ? <div className="alert alert-danger">Only 3 urls can be posted per day </div> : ' '; 
		return (
			<div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
           <div> Welcome { this.props.usernamePass } </div>  <a onClick={ this.props.logoutUser }> Logout</a>
          <h1><span className="fa fa-sign-in"></span> Upload Urls </h1>
            <form className="" onSubmit={ this.props.handleUrlSubmit }>
              <div className="form-group">
               
                <textarea className="form-control" name="url" rows="6" id="url" onChange={ this.props.onUrlChange }  required></textarea>
              </div>
                <button className="btn btn-warning btn-lg">Submit</button>
            </form>
            <hr/>
            { showWarning } 
          </div>    
        </div> 
        <div className="container">
          <div className="col-sm-12 col-sm-offset-0">
          <ol> { this.displayUrls() } </ol>
          </div>    
        </div>       
			</div>
		)
	}
});

module.exports = UploadUrlsForm;

// <input type="password" className="form-control" name="password" onChange={ this.props.onPasswordChange } value={ this.props.password }/>
// <label>Paste Urls here:</label>

//value={ this.props.url }