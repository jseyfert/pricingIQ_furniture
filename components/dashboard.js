var Logo = require('./partialComps/logo');
var Footer = require('./partialComps/footer');
var React = require('react');
var ItemGreenDashboard = require('./partialComps/urlDisplay/itemGreenDashboard');
var GroupGreenDashboard = require('./partialComps/urlDisplay/groupGreenDashboard');

var dashboard = React.createClass({

  displayCustomerDropDown: function(){
    var customers = this.props.customers;
    var rows = [];
    customers.map(function(obj){
      rows.push( <li key={obj.customerId}><a  onClick={ this.props.handleCustomerSelectDashboard.bind(null, obj.customerId, obj.Name)  } >{obj.Name}</a></li> )
    }, this)

    return(
           <div className="btn-group" role="group">
            <button type="button" className="btn btn-warning btn-md dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             {this.props.customerNameDashboard} &nbsp;
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
      // console.log(arr);
      rows.push( <li key={arr}><a  onClick={ this.props.handleUrlTypeSelectDashboard.bind(null, arr)  } >{arr}</a></li> )
    }, this)

    return(
           <div className="btn-group" role="group">
            <button type="button" className="btn btn-warning btn-md dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             {this.props.urlTypeDashboard} &nbsp;
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
             {rows}
            </ul>
          </div>
      )
  },

  disableButton: function(){
    if (this.props.customerIdDashboard && this.props.urlTypeDashboard !== "Select Url Type"){
      return false;
    } else {
      return true;
    }
  },

  displayUrls: function(){
    console.log("this.props.urlsDownloading", this.props.urlsDownloading)
    var rows = [];
    var allUrls = this.props.allSubmittedUrlsPerCustomer;
    console.log("allUrls", allUrls)

    if (this.props.urlsDownloading){
      return(
        <div className="row text-center">
          <i className="fa fa-spinner w3-spin" style={{fontSize:'44px'}}></i>
        </div>
        )
    } else if (!this.props.showSubmittedUrls){
      return null
    } else if (allUrls.length === 0) {
      return(
        <div className="row text-center">
          {this.props.customerNameDashboard} does not have any {this.props.urlTypeDashboard} Urls
        </div>
        )
    }else {

      allUrls.map(function(obj, index){

        var SiteId = obj.SiteId
        var customerId = obj.customerId
        var id = obj.id
        var inputCategoryUrl = obj.inputCategoryUrl
        var spiderName = obj.spiderName
        var urlType = obj.urlType

        rows.push(<ItemGreenDashboard SiteId={SiteId} customerId={customerId} id={id} inputCategoryUrl={inputCategoryUrl} spiderName={spiderName} urlType={urlType} index={index} /> )
      })
      return rows;
    }

  },


  render: function(){
    console.log("this.props.allSubmittedUrlsPerCustomer",this.props.allSubmittedUrlsPerCustomer)
      var handleGetSubmitedUrls = this.props.handleGetSubmitedUrls
      var domainsLoading = this.props.domainsLoading
      var userLoading = this.props.userLoading
      var customersLoading = this.props.customersLoading
      var urlsUploading = this.props.urlsUploading
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
            <Footer />
          </div>
        )
      } else{
    return (
      <div>
        <Logo delay={false} />
        <div className="container text-center">
              {this.displayCustomerDropDown()}
              &nbsp;
              {this.displayUrlTypeDropDown()}
              &nbsp;
              <button onClick={handleGetSubmitedUrls}  className="btn btn-warning btn-md" disabled={this.disableButton()}>Query</button>
              <br/>
          <br/>
        </div>
        <div className="container">
          <br/>
          <div className="row">
          
          {this.displayUrls()}

      

          </div>
        </div> 
        <Footer />
      </div>

    )
  }}
});

module.exports = dashboard;

