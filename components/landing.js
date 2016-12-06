var React = require('react');
var _ = require("underscore");

var Message = require('./partialComps/message');
var Logo = require('./partialComps/logo');
var ModalDialog = require('./partialComps/modalDialog');
var Footer = require('./partialComps/footer');
var DomainInfo = require('../userConfig/domainInfo.js');
var DomainRed = require('./partialComps/domainRed');
var DomainWhite = require('./partialComps/domainWhite');
var DomainGreen = require('./partialComps/domainGreen');
var DomainYellow = require('./partialComps/domainYellow');

var Landing = React.createClass({

  displayDomains: function(){
    var user = (this.props.user.user !== 'anonymous') ? this.props.user : false
    var allUrls = this.props.allUrls;
    var rows = [];

    allUrls.map(function(obj){
      var domain = obj.domain
      var domainActive = obj.domainActive
      var domainOffered = obj.domainOffered
      var urlCount = obj.urlCount
      // console.log( 'domainActive', obj.countLeftToSubmit)
      if(user){
        if(domainOffered){
          if(domainActive && obj.countLeftToSubmit > 0){
            if(urlCount === 0){
              rows.push( <DomainWhite obj={obj} domainInfo={DomainInfo[domain]} key={domain}/> )
            } else if (urlCount > 15 || urlCount > obj.countLeftToSubmit) {
              rows.push( <DomainYellow obj={obj} domainInfo={DomainInfo[domain]} key={domain}/> )
            } else {
              rows.push( <DomainGreen obj={obj} domainInfo={DomainInfo[domain]} key={domain}/> )
            }
          } else {
            rows.push( <DomainRed obj={obj} domainInfo={DomainInfo[domain]} key={domain}/> )
          }
        }
      } else {
        if(domainOffered){
          if(domainActive){
            if(urlCount === 0){
              rows.push( <DomainWhite obj={obj} domainInfo={DomainInfo[domain]} key={domain}/> )
            } else if (urlCount > 15) {
              rows.push( <DomainYellow obj={obj} domainInfo={DomainInfo[domain]} key={domain}/> )
            } else {
              rows.push( <DomainGreen obj={obj} domainInfo={DomainInfo[domain]} key={domain}/> )
            }
          } else {
            rows.push( <DomainRed obj={obj} domainInfo={DomainInfo[domain]} key={domain}/> )
          }
        }
      }
    })  
    return rows;
  },

  // showErrorMessage: function(){
  //   var errorMessage = (this.props.message) ? this.props.message.message : null;
  //     return(
  //           <div>
  //             <p className="text-danger">{errorMessage}</p>
  //           </div>
  //       )
  // },

  render: function(){
    // console.log('this.props.submitSuggestedDomains2',this.props.submitSuggestedDomains);
      var domainsLoading= this.props.domainsLoading
      var userLoading = this.props.userLoading
      // console.log('domainsLoading', domainsLoading, 'userLoading', userLoading)
      if (domainsLoading || userLoading){
        return (
          <div>













            
            <Logo delay={true} />
            
            <div className="container text-center">
                <form className="form-inline" onSubmit={ this.props.handleUrlSubmit }>
                  <div className="form-group">
                    <textarea className="form-control" placeholder="Copy and Paste URLs here" style={{textAlign: 'center'}} name="rawText" rows="1" cols="40" id="url" onChange={ this.props.onTextChange } value={ this.props.rawText } disabled/>
                  </div>
                  <button className="btn btn-warning btn-md disabled" disabled>Extract</button>
                </form>
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
                <form className="form-inline" onSubmit={ this.props.handleUrlSubmit }>
                  <div className="form-group">
                    <textarea className="form-control" placeholder="Copy and Paste URLs here" style={{textAlign: 'center'}} name="rawText" rows="1" cols="40" id="url" onChange={ this.props.onTextChange } value={ this.props.rawText } required/>
                  </div>
                  <button className="btn btn-warning btn-md">Extract</button>
                  <Message message={this.props.message} />
                </form>
              <br/>
            </div>





              <br/>
            <div className="container">
              <br/>
              <div className="row">
                {this.displayDomains()}
              </div>
            </div> 
            <Footer setActiveComponent={ this.props.setActiveComponent } />
          </div>
        )
      }
    }
});

module.exports = Landing;

