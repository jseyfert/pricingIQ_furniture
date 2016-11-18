var React = require('react');
var ErrorMessage = require('./errorMessage');

var ResetTokenHtml = React.createClass({

  //   showErrorMessage: function(){
  //   var errorMessage = (this.props.errorMessage) ? this.props.errorMessage : null;
  //   // console.log(errorMessage);
  //   if (errorMessage){
  //     return(
  //       <div>
  //         <div className="alert alert-info" role="alert">
  //           <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
  //           <span className="sr-only">Error: </span>
  //             { errorMessage }
  //         </div>
  //       </div>
  //       )
  //   }
  // },

  render: function(){
    
    return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          <ErrorMessage message={this.props.message} />
          <h1><span className="fa fa-sign-in"></span>Enter Token</h1>
            <form className="" onSubmit={ this.props.handleTokenSubmit }>
              <div className="form-group">
                <label>Paste token here</label>
                <input type="text" className="form-control" name="email" onChange={ this.props.onTokenChange} value={ this.props.token } required/>
              </div>
                <button className="btn btn-warning btn-lg">Send</button>
            </form>
            <hr/>
          </div>    
        </div>    
      </div>
    )
  }
});

module.exports = ResetTokenHtml;