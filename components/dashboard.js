var Logo = require('./partialComps/logo');
var Footer = require('./partialComps/footer');
var React = require('react');
var ItemRedDashboard = require('./partialComps/urlDisplay/itemRedDashboard');
var ItemDashboard = require('./partialComps/urlDisplay/itemDashboard');
var ModalDialog = require('./partialComps/modalDialog');

var dashboard = React.createClass({

  // getInitialState: function(){
  //   return {
  //     showSpiderName: true,
  //   }
  // },

  // getInitialState: function(){
  //   return {
  //     domain1: '',
  //   };
  // },

  onClickCustomer: function(customerIdDashboard, customerNameDashboard){
      this.props.handleCustomerSelectDashboard(this.props.urlTypeDashboard, customerIdDashboard, customerNameDashboard)
   },  
  
  onClickUrlType: function(urlTypeDashboard){
      this.props.handleUrlTypeSelectDashboard(urlTypeDashboard ,this.props.customerIdDashboard)
  },

  displaySelectAllButton: function(){
    if (this.props.selectAll){
      return(<div className="btn-group" role="group" aria-label="..."><button onClick={this.props.handleSelectAllUrlToDelete} className="btn btn-warning btn-sm">Select All</button></div> )
    } else {
      return(<div className="btn-group" role="group" aria-label="..."><button onClick={this.props.handleSelectNoneUrlToDelete} className="btn btn-warning btn-sm">Select None</button></div>)
    }
  },

  displaySpiderNameButton: function(){
    // console.log("this.props.showSpiderName",this.props.showSpiderName)
    if (this.props.showSpiderName){
      return(<div className="btn-group" role="group" aria-label="..."><button onClick={this.props.handleShowSpiderName} className="btn btn-warning btn-sm">Hide SpiderName</button></div>)
    } else {
      return(<div className="btn-group" role="group" aria-label="..."><button onClick={this.props.handleShowSpiderName} className="btn btn-warning btn-sm">Show SpiderName</button></div> )
    }
  },

  displayCustomer: function(){

    var UrlType = ["Detail", "Discovery"]
    var UrlTyperows = [];
    var UrlTypeState = this.props.urlTypeDashboard
    UrlType.map(function(arr){
        if (UrlTypeState === arr){
          UrlTyperows.push(  <button type="button" key={arr} className="btn btn-default buttonClicked" onClick={ this.onClickUrlType.bind(null, arr)}>{arr}</button>)
        } else {
          UrlTyperows.push(  <button type="button" key={arr} className="btn btn-default" onClick={ this.onClickUrlType.bind(null, arr)}>{arr}</button>)
        }
      }, this)

    var customers = this.props.customers;
    var rows = [];
    customers.map(function(obj){
        if (this.props.customerIdDashboard === obj.customerId){
          rows.push( <button type="button" className="btn btn-default buttonClicked" key={obj.customerId} onClick={ this.onClickCustomer.bind(null, obj.customerId, obj.Name) } >{obj.Name}</button> )
        } else {
          rows.push( <button type="button" className="btn btn-default" key={obj.customerId} onClick={ this.onClickCustomer.bind(null, obj.customerId, obj.Name) } >{obj.Name}</button> ) 
        }
      }, this)
    
    return(
            <div className="btn-group-vertical" role="group" aria-label="...">
              <button type="submit" className="btn btn-success dissableButton">Select Url Type </button>
              
              {UrlTyperows}
              
              <br/>
              <button type="submit" className="btn btn-success dissableButton">Select Customer</button>
              
              {rows}

            </div>
      )
  },


  displayUrls: function(){
    // console.log("this.props.urlsDownloading", this.props.handleSelectUrlToDelete)
    var handleSelectUrlToDelete = this.props.handleSelectUrlToDelete
    var handleDeleteUrls = this.props.handleDeleteUrls
    var showSpiderName = this.props.showSpiderName
    var rows = [];
    var selectedCount = 0
    var allUrls = this.props.allSubmittedUrlsPerCustomer;
    // console.log("allUrls", allUrls)

    if (this.props.urlsDownloading){
      return(
        <div className="row text-center">
          <i className="fa fa-spinner w3-spin" style={{fontSize:'44px'}}></i>
        </div>
        )
    } else if (!this.props.showSubmittedUrls){
      return <h2 className="text-center">Select Url Type & Customer</h2>
    } else if (allUrls.length === 0) {
      return(

        <div className="container">
        <div className="alert alert-danger text-center">
          <strong>{this.props.customerNameDashboard}</strong> does not have any <strong>{this.props.urlTypeDashboard}</strong> Urls
        </div>
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
        var checked = obj.checked
        // var enableDelete = false ? true : false
        // console.log("enableDelete", enableDelete)

        if (checked){
          selectedCount += 1
          rows.push(<ItemRedDashboard  showSpiderName={showSpiderName} handleSelectUrlToDelete={handleSelectUrlToDelete} SiteId={SiteId} customerId={customerId} id={id} inputCategoryUrl={inputCategoryUrl} spiderName={spiderName} urlType={urlType} index={index} /> )
        } else {
          rows.push(<ItemDashboard showSpiderName={showSpiderName} handleSelectUrlToDelete={handleSelectUrlToDelete} SiteId={SiteId} customerId={customerId} id={id} inputCategoryUrl={inputCategoryUrl} spiderName={spiderName} urlType={urlType} index={index} /> )
        }
      })
      return (
        <div className="panel panel-success">
          <div className="panel-heading">
          <strong>{this.props.customerNameDashboard} > </strong>
          <strong>{this.props.urlTypeDashboard}:</strong>&nbsp;
          <div className="btn-toolbar navbar-right" role="toolbar" aria-label="...">
          {this.displaySpiderNameButton()}
          {this.displaySelectAllButton()}
          <ModalDialog handleDeleteUrls={this.props.handleDeleteUrls}/>
          <div className="btn-group" role="group" aria-label="..."><button className="btn btn-danger btn-sm" disabled={selectedCount > 0 ? false : true } type="button" data-toggle="modal" data-target="#exampleModal">Delete</button></div>
          </div>
          Total {allUrls.length}&nbsp;|
          Selected {selectedCount}&nbsp;&nbsp;
          </div>
          <ul className="list-group">
          {rows}
          </ul>
        </div>
          )
    }
  },

  render: function(){
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
      } else {
        return (
              <div>
                  <div className="row">
                    <div className="col-sm-2">
                     <div className="container">

                      {this.displayCustomer()}

                    </div>
                    </div>
                    <div className="col-sm-10">
                     <div className="container">


                      {this.displayUrls()}

                    </div>
                    </div>
                  </div>
              </div>
        )
  }}
});

module.exports = dashboard;

