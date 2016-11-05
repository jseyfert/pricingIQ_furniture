var React = require('react');
var UploadUrlsForm = React.createClass({

  render: function(){
    return (
			<div>
        <div className="container">
            <div className="jumbotron">
             <h1>PricingIQ</h1>
             <p>Drive data insight with the world's #1 web data platform.</p>
             <form className="form-inline" onSubmit={ this.props.handleUrlSubmit }>
              <div className="form-group">
              <textarea className="form-control" name="url" rows="1" cols="44" id="url" onChange={ this.props.onUrlChange } required/>
              </div>
              <button className="btn btn-warning btn-md">Submit</button>
            </form>
            <br/>
            <div className="row">
              <hr className="showHr"/>
              <br/>
              <div className="col-lg-4 col-md-6 col-xs-12 marginBottom">
                <div className="center">
                  <img className="disabledCustom" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/200px-Amazon.com-Logo.svg.png" alt=""/>
                  { this.props.displayWhichBadge('amazon') }
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-xs-12 marginBottom">
                <div className="center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Wal-Mart_logo.svg/200px-Wal-Mart_logo.svg.png" alt=""/>
                  { this.props.displayWhichBadge('walmart') }
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-xs-12 marginBottom">
                <div className="center">
                  <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sears_logo_2010-present.svg/170px-Sears_logo_2010-present.svg.png" alt=""/>
                  { this.props.displayWhichBadge('sears') }
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-xs-12">
              <p className="text-center">Dont see your domain? <a href="#">Vote for yours.</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = UploadUrlsForm;

