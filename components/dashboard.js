var Logo = require('./partialComps/logo');
var Footer = require('./partialComps/footer');
var React = require('react');
var ItemRedDashboard = require('./partialComps/urlDisplay/itemRedDashboard');
var ItemDashboard = require('./partialComps/urlDisplay/itemDashboard');
var ModalDialog = require('./partialComps/modalDialog');

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

  onClickCustomer: function(customerIdDashboard, customerNameDashboard){
      this.props.handleCustomerSelectDashboard(this.props.urlTypeDashboard, customerIdDashboard, customerNameDashboard)
      // console.log("onClickCustomer", this.props.urlTypeDashboard, customerIdDashboard, customerNameDashboard)
   },  
  
  onClickUrlType: function(urlTypeDashboard){
      this.props.handleUrlTypeSelectDashboard(urlTypeDashboard ,this.props.customerIdDashboard)
    // console.log("onClickUrlType", urlTypeDashboard,this.props.customerIdDashboard)
  },

  buttonClicked: function(){
    // return "btn btn-default"
    console.log("buttonClicked", this.props.urlTypeDashboard)
    if (this.props.urlTypeDashboard === "Detail"){
      return "btn btn-default buttonClicked"
    } else if (this.props.urlTypeDashboard === "Discovery"){
      return "btn btn-default buttonClicked"
    } else {
      return "btn btn-default"
    }
  },


  displayCustomer: function(){


    var UrlType = ["Detail", "Discovery"]
    var UrlTyperows = [];
    var UrlTypeState = this.props.urlTypeDashboard
    // console.log("this.props.urlTypeDashboard", this.props.urlTypeDashboard)
    UrlType.map(function(arr){
      // console.log("UrlTypeState", UrlTypeState)
        if (UrlTypeState === arr){
          UrlTyperows.push(  <button type="button" key={arr} className="btn btn-default buttonClicked" onClick={ this.onClickUrlType.bind(null, arr)}>{arr}</button>)
          // console.log("one")
        } else {
          UrlTyperows.push(  <button type="button" key={arr} className="btn btn-default" onClick={ this.onClickUrlType.bind(null, arr)}>{arr}</button>)
          // console.log("two")
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

              <br/>
              <button type="submit" className="btn btn-success dissableButton">Filter By Spider</button>

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

  disableDeleteButton: function(){
    return false
    // if (this.props.customerIdDashboard && this.props.urlTypeDashboard !== "Select Url Type"){
    //   return false;
    // } else {
    //   return true;
    // }
  },

  displaySelectAllButton: function(){
    if (this.props.selectAll){
      return(<div className="btn-group" role="group" aria-label="..."><button onClick={this.props.handleSelectAllUrlToDelete} className="btn btn-warning btn-sm">Select All</button></div> )
    } else {
      return(<div className="btn-group" role="group" aria-label="..."><button onClick={this.props.handleSelectNoneUrlToDelete} className="btn btn-warning btn-sm">Select None</button></div>)
    }
  },

  displayUrls: function(){
    // console.log("this.props.urlsDownloading", this.props.handleSelectUrlToDelete)
    var handleSelectUrlToDelete = this.props.handleSelectUrlToDelete
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
      return null
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

        if (checked){
          selectedCount += 1
          rows.push(<ItemRedDashboard handleSelectUrlToDelete={handleSelectUrlToDelete} SiteId={SiteId} customerId={customerId} id={id} inputCategoryUrl={inputCategoryUrl} spiderName={spiderName} urlType={urlType} index={index} /> )
        } else {
          rows.push(<ItemDashboard handleSelectUrlToDelete={handleSelectUrlToDelete} SiteId={SiteId} customerId={customerId} id={id} inputCategoryUrl={inputCategoryUrl} spiderName={spiderName} urlType={urlType} index={index} /> )
        }
      })
      return (
        <div className="panel panel-success">
          <div className="panel-heading">
          {this.props.urlTypeDashboard}&nbsp;|&nbsp;
          {this.props.customerNameDashboard}&nbsp;|&nbsp;
          All Spiders

          <div className="btn-toolbar navbar-right" role="toolbar" aria-label="...">
          {this.displaySelectAllButton()}
            <div className="btn-group" role="group" aria-label="..."><button className="btn btn-danger btn-sm">Delete</button></div>
          </div>
          <div className="btn-toolbar navbar-right" >
          Total {allUrls.length}&nbsp;|
          Selected {selectedCount}&nbsp;&nbsp;
          </div>



           </div>

          <ul className="list-group">
          {rows}
            </ul>
          </div>
          )
    }

  },


  render: function(){
    // console.log("this.props.allSubmittedUrlsPerCustomer",this.props.allSubmittedUrlsPerCustomer)
      var handleGetSubmitedUrls = this.props.handleGetSubmitedUrls
      var handleDeleteUrls = this.props.handleDeleteUrls
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
        // <div className="container text-center">
        //       <div >
        //         {this.displayCustomerDropDown()}
        //         &nbsp;
        //         {this.displayUrlTypeDropDown()}
        //         &nbsp;
        //         <button onClick={handleGetSubmitedUrls}  className="btn btn-warning btn-md" disabled={this.disableButton()}>Query</button>
        //       </div>
        //       <br/>
        //       <div >
        //         {this.displaySelectAllButton()}
        //         &nbsp;
        //         <ModalDialog/>
        //         <button onClick={handleDeleteUrls}  className="btn btn-danger btn-md" disabled={this.disableDeleteButton()} type="button" data-toggle="modal" data-target="#exampleModal">Delete Selected</button>
        //       </div>
        // </div>
<div>
  <Logo delay={false} />
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

