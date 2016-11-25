var React = require('react');
var ErrorMessage = require('./errorMessage');
var _ = require("underscore");

var LandingHtml = React.createClass({

  displayUrlsNoUser: function(domain){
    var user = (this.props.user.user !== 'anonymous')
    if(user){ return null; }
    // console.log('working no user');
    // var urlsUser = this.props.urlsUser;
    // console.log('urlsUser',urlsUser);
    var allDomains = this.props.allDomains;
    var rows = [];
    var urlsNoUser = this.props.urlsNoUser;
    // console.log('urlsNoUser',urlsNoUser);

    var displayWhichBadge = function(domain, domainActive){
      // console.log(domain, domainActive);
      var currentdomainActive = _.where(urlsNoUser, {domain: domain}).length > 0
      // console.log(currentdomainActive);
      var urlCount = (_.where(urlsNoUser, {domain: domain})[0]) ? _.where(urlsNoUser, {domain: domain})[0].urlsCount : null;
      // console.log(urlCount);
      
      if (domainActive){
        return <span className="label label-success label-as-badge" key='success'>{ urlCount }</span>
      } else {
        return <span className="label label-danger label-as-badge" key='success'>N/A</span>
      }

    }

    allDomains.map(function(arr){
        rows.push(              
          <div className="col-lg-4 col-md-6 col-xs-12 marginBottom" key={ arr[0] }>
              { arr[0] } &nbsp;
              { displayWhichBadge(arr[0], arr[1] ) }
            <div className="center">
            </div>
          </div>
        )
    })

    return rows;
  },  

  displayUrlsUser: function(){
    var user = (this.props.user.user !== 'anonymous') ? this.props.user : false
    if(!user){ return null; }
    var urlsUser = this.props.urlsUser;
    var rows = [];

    urlsUser.map(function(arr){
      console.log(arr)
      if(arr.domainOffered){
        if(!arr.domainActive){
          rows.push(              
            <div className="col-lg-4 col-md-6 col-xs-12 marginBottom" key={arr.domain}>
               <h3> {arr.domain}</h3>
              <ul>
                <li>domainActive: {arr.domainActive.toString()}</li>
                <li>count left to submit: </li>
                <li>current url count: </li>
                <li>count we will submit now: </li>
                <li>count after this submit: </li>
              </ul>
            </div>
          )
        } else {
        rows.push(              
          <div className="col-lg-4 col-md-6 col-xs-12 marginBottom" key={arr.domain}>
             <h3> {arr.domain}</h3>
                         <ul>

              <li>domainActive: {arr.domainActive.toString()}</li>
              <li>count left to submit: {arr.countLeftToSubmit}</li>
              <li>current url count: {arr.urlsCount}</li>
              <li>count to submit now: {arr.countToSubmitNow}</li>
              <li>count after this submit: {arr.countLeftToSubmitNow}</li>
            </ul>

          </div>
        )
        }
    }
    })
    return rows;
  },

  showErrorMessage: function(){
    var errorMessage = (this.props.message) ? this.props.message.message : null;
      return(
            <div>
              <p className="text-danger">{errorMessage}</p>
            </div>
        )
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
              <textarea className="form-control" name="rawText" rows="1" cols="44" id="url" onChange={ this.props.onTextChange } value={ this.props.rawText } required/>
              </div>
              <button className="btn btn-warning btn-md">Submit</button>
              {this.showErrorMessage()}
            </form>
            <br/>
            <div className="row">
              <hr className="showHr"/>
              <br/>
              { this.displayUrlsNoUser() }
              { this.displayUrlsUser() }
            </div>
        </div>
             </div>
            <div className="col-lg-12 col-md-12 col-xs-12">
              <p className="text-center">Dont see your domain? <a onClick={ this.props.setActiveComponent.bind(null, 'suggest') }>Suggest one.</a></p>
          </div>
      </div>
    )
  }
});

module.exports = LandingHtml;

