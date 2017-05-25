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

  disableButton: function(){
    if (this.props.customerId){
      return false;
    } else {
      return true;
    }
  },

  displayDomainWarning: function(){
      var user = (this.props.user.user !== 'anonymous') ? this.props.user : false
      var allUrls = this.props.allUrls;
      var rows = [];

      allUrls.map(function(obj){
        var domain = obj.domain
        var domainActive = obj.domainActive
        var domainOffered = obj.domainOffered
        var urlCount = obj.urlCount

        if(!domainOffered){
          rows.push( 
           <div>
             <span className="label label-danger">WARNING - {domain} - is not registered</span>
           </div>
           )
        } 
      })  
      return rows;
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

