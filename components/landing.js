var React = require('react');
var _ = require("underscore");

var Message = require('./partialComps/message');
var Logo = require('./partialComps/logo');
var ModalDialog = require('./partialComps/modalDialog');
var Footer = require('./partialComps/footer');
var DomainInfo = require('../config/domainInfo.js');
var DomainRed = require('./partialComps/domainSquares/red');
var DomainWhite = require('./partialComps/domainSquares/white');
var DomainGreen = require('./partialComps/domainSquares/green');
var DomainYellow = require('./partialComps/domainSquares/yellow');

var Landing = React.createClass({

  displayCustomerDropDown: function(){
    var customers = this.props.customers;
    var rows = [];
    customers.map(function(obj){
      rows.push( <li key={obj.customerId}><a  onClick={ this.props.handleCustomerSelect.bind(null, obj.customerId, obj.Name)  } >{obj.Name}</a></li> )
    }, this)

    return(
           <div className="btn-group" role="group">
            <button type="button" className="btn btn-warning btn-md dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             {this.props.customerName} &nbsp;
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
             {rows}
            </ul>
          </div>
      )
  },

  displayUrlTypeDropDown: function(){
    var UrlType = ["Detail", "Discovery"]
    var rows = [];
    UrlType.map(function(arr){
      console.log(arr);
      rows.push( <li key={arr}><a  onClick={ this.props.handleUrlTypeSelect.bind(null, arr)  } >{arr}</a></li> )
    }, this)

    return(
           <div className="btn-group" role="group">
            <button type="button" className="btn btn-warning btn-md dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             {this.props.urlType} &nbsp;
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
             {rows}
            </ul>
          </div>
      )
  },

  disableButton: function(){
    if (this.props.customerId && this.props.urlType !== "Select Url Type"){
      return false;
    } else {
      return true;
    }
  },

  displayDomainWarning: function(){
      var user = (this.props.user.user !== 'anonymous') ? this.props.user : false
      var allUrls = this.props.allUrls;
      var rowsOffered = [];
      var rowsNotOffered = [];

      allUrls.map(function(obj){
        var domain = obj.domain
        var siteId = obj.siteId
        var spiderName = obj.spiderName
        var domainActive = obj.domainActive
        var domainOffered = obj.domainOffered
        var urlCount = obj.urlCount

        if(!domainOffered){
          rowsNotOffered.push( 
            <div key={domain} >
                <span className="label label-danger"  >WARNING - {domain} - is not registered</span>
            </div>
           )
        } else if (domainOffered && urlCount >= 1){
          rowsOffered.push( 
             <div key={domain} >
               <span className="label label-success" >Domain: {domain}, Name: {spiderName}, SiteId: {siteId}, UrlCount: {urlCount}</span>
             </div>
           )
        }
      }) 
      if (rowsOffered.length > 0 && rowsNotOffered.length > 0){
        return (
            <div className="row">
              <div className="col-sm-6">
              The following domains will not be submitted:
                  {rowsNotOffered}
              </div>
              <div className="col-sm-6">
              To be submitted:
                  {rowsOffered}
              </div>
            </div>
          )
      } else if (rowsOffered.length > 0){
        return (
            <div>
                  To be submitted:
                  {rowsOffered}
            </div>
          )
      } else if (rowsNotOffered.length > 0){
        return (
            <div>
                  The following domains will not be submitted:
                  {rowsNotOffered}
            </div>
          )
      }
    },



  render: function(){
    // console.log('this.props.submitSuggestedDomains2',this.props.customers);
      var domainsLoading= this.props.domainsLoading
      var userLoading = this.props.userLoading
      var customersLoading = this.props.customersLoading
      var urlsUploading = this.props.urlsUploading
      // console.log('urlsUploading', urlsUploading)
      if (domainsLoading || userLoading || customersLoading || urlsUploading){
        return (
          <div>
            <Logo delay={true} />
            <div className="container text-center">
              <br/>
            </div>
              <br/>
            <div className="container">
              <br/>
              <br/>
              <br/>
              <div className="row text-center">
                <i className="fa fa-spinner w3-spin" style={{fontSize:'44px'}}></i>
              </div>
            </div> 
            <ModalDialog/>
            <Footer setActiveComponent={ this.props.setActiveComponent } />
          </div>
        )
      } else{
        return (
          <div>
            <ModalDialog submitSuggestedDomains={ this.props.submitSuggestedDomains }/>
            <Logo delay={false} />
            <div className="container text-center">
                  {this.displayCustomerDropDown()}
                  &nbsp;
                  {this.displayUrlTypeDropDown()}
                  <br/>
                  <br/>
                <form className="form-inline" onSubmit={ this.props.handleUrlSubmit }>
                  <Message message={this.props.message} />
                  <div className="form-group">
                    <textarea className="form-control" placeholder="Paste URLs here"  name="rawText" rows="13" cols="130" id="url" onChange={ this.props.onTextChange } value={ this.props.rawText } required/>
                  </div>
                 <br/>
                 <br/>
                  <button className="btn btn-warning btn-md" disabled={this.disableButton()}>Submit</button>
                </form>

                  {this.displayDomainWarning()}
                
              <br/>
            </div>
            <div className="container">
              <br/>
              <div className="row">
              </div>
            </div> 
          </div>
            // <Footer setActiveComponent={ this.props.setActiveComponent } />
        )
      }
    }
});

module.exports = Landing;

