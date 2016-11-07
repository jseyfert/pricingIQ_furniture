var React = require('react');
var _ = require("underscore");

var UploadUrlsForm = React.createClass({

  displayWhichDomain: function(domain){
    var rows = [];
    var allDomains = this.props.allDomains;
    var allSubmittedUrls = this.props.allSubmittedUrls;

    var displayWhichBadge = function(domain, serverDomainAvailable){
      var clientDomainAvailable = _.where(allSubmittedUrls, {domain: domain}).length > 0
      var urlCount = (_.where(allSubmittedUrls, {domain: domain}).length > 0) ? _.where(allSubmittedUrls, {domain: domain})[0].urls.length : null;
      if (!serverDomainAvailable){
        return <span className="label label-danger label-as-badge">N/A</span> 
      } else if (clientDomainAvailable && urlCount > 15) {
        return <span className="label label-warning label-as-badge">{ urlCount }</span>
      } else if (clientDomainAvailable & urlCount > 0) {
        return <span className="label label-success label-as-badge">{ urlCount }</span>
      }
    }

    allDomains.map(function(obj){
        rows.push(              
          <div className="col-lg-4 col-md-6 col-xs-12 marginBottom">
              <img src={ obj.img } key={ obj.img } alt=""/>
              { displayWhichBadge(obj.domain, obj.domainAvailable ) }
            <div className="center">
            </div>
          </div>
        )
    })
    return rows;
  },

  render: function(){
    return (
			<div>
        <div className="container">
            <div className="jumbotron">
             <h1>PricingIQ</h1>
             <p>Drive data insight with the world's #1 web data platform.</p>
             <form className="form-inline" onSubmit={ this.props.handleUrlSubmit }>
              <div className="form-group">
              <textarea className="form-control" name="url" rows="10" cols="44" id="url" onChange={ this.props.onUrlChange } required/>
              </div>
              <button className="btn btn-warning btn-md">Submit</button>
            </form>
            <br/>
            <div className="row">
              <hr className="showHr"/>
              <br/>
              { this.displayWhichDomain() }
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

