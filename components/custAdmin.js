var React = require('react');
var Logo = require('./partialComps/logo');
var Footer = require('./partialComps/footer');
var ItemRedDashboard = require('./partialComps/urlDisplay/itemRedDashboard');
var ItemDashboard = require('./partialComps/urlDisplay/itemDashboard');
var ModalDialog = require('./partialComps/modalDialog');

var Input = require('./partialComps/input.js');

// var Input = require('../input.js');
// var Message = require('../message');

var custAdmin = React.createClass({

  // onClickCustomer: function(customerIdDashboard, customerNameDashboard){
  //     this.props.handleCustomerSelectDashboard(this.props.urlTypeDashboard, customerIdDashboard, customerNameDashboard)
  //  },  
  
  // onClickUrlType: function(urlTypeDashboard){
  //     this.props.handleUrlTypeSelectDashboard(urlTypeDashboard ,this.props.customerIdDashboard)
  // },

  // displaySelectAllButton: function(){
  //   if (this.props.selectAll){
  //     return(<div className="btn-group" role="group" aria-label="..."><button onClick={this.props.handleSelectAllUrlToDelete} className="btn btn-warning btn-sm">Select All</button></div> )
  //   } else {
  //     return(<div className="btn-group" role="group" aria-label="..."><button onClick={this.props.handleSelectNoneUrlToDelete} className="btn btn-warning btn-sm">Select None</button></div>)
  //   }
  // },

  // displaySpiderNameButton: function(){
  //   if (this.props.showSpiderName){
  //     return(<div className="btn-group" role="group" aria-label="..."><button onClick={this.props.handleShowSpiderName} className="btn btn-warning btn-sm">Hide SpiderName</button></div>)
  //   } else {
  //     return(<div className="btn-group" role="group" aria-label="..."><button onClick={this.props.handleShowSpiderName} className="btn btn-warning btn-sm">Show SpiderName</button></div> )
  //   }
  // },

  // displayCustomer: function(){
  //   var UrlType = ["Detail", "Discovery"]
  //   var UrlTyperows = [];
  //   var UrlTypeState = this.props.urlTypeDashboard
  //   UrlType.map(function(arr){
  //       if (UrlTypeState === arr){
  //         UrlTyperows.push(  <button type="button" key={arr} className="btn btn-default buttonClicked" onClick={ this.onClickUrlType.bind(null, arr)}>{arr}</button>)
  //       } else {
  //         UrlTyperows.push(  <button type="button" key={arr} className="btn btn-default" onClick={ this.onClickUrlType.bind(null, arr)}>{arr}</button>)
  //       }
  //     }, this)

  //   var customers = this.props.customers;
  //   var rows = [];
  //   customers.map(function(obj){
  //       if (this.props.customerIdDashboard === obj.customerId){
  //         rows.push( <button type="button" className="btn btn-default buttonClicked" key={obj.customerId} onClick={ this.onClickCustomer.bind(null, obj.customerId, obj.Name) } >{obj.Name}</button> )
  //       } else {
  //         rows.push( <button type="button" className="btn btn-default" key={obj.customerId} onClick={ this.onClickCustomer.bind(null, obj.customerId, obj.Name) } >{obj.Name}</button> ) 
  //       }
  //     }, this)
    
  //   return(
  //     <div className="btn-group-vertical" role="group" aria-label="...">
  //       <button type="submit" className="btn btn-success dissableButton justify">Select Url Type </button>
  //       {UrlTyperows}
  //       <br/>
  //       <button type="submit" className="btn btn-success dissableButton">Select Customer</button>
  //       {rows}
  //     </div>
  //     )
  // },


  // displayUrls: function(){
  //   // console.log("this.props.urlsDownloading", this.props.handleSelectUrlToDelete)
  //   var handleSelectUrlToDelete = this.props.handleSelectUrlToDelete
  //   var handleDeleteUrls = this.props.handleDeleteUrls
  //   var showSpiderName = this.props.showSpiderName
  //   var rows = [];
  //   var selectedCount = 0
  //   var allUrls = this.props.allSubmittedUrlsPerCustomer;

  //   if (this.props.urlsDownloading){
  //     return(
  //       <div className="row text-center">
  //         <i className="fa fa-spinner w3-spin" style={{fontSize:'44px'}}></i>
  //       </div>
  //       )
  //   } else if (!this.props.showSubmittedUrls){
  //     return <h2 className="text-center">Select Url Type & Customer</h2>
  //   } else if (allUrls.length === 0) {
  //     return(
  //       <div className="container">
  //         <div className="alert alert-danger text-center">
  //           <strong>{this.props.customerNameDashboard}</strong> does not have any <strong>{this.props.urlTypeDashboard}</strong> Urls
  //         </div>
  //       </div>
  //       )
  //   }else {
  //     allUrls.map(function(obj, index){
  //       var SiteId = obj.SiteId
  //       var customerId = obj.customerId
  //       var id = obj.id
  //       var inputCategoryUrl = obj.inputCategoryUrl
  //       var spiderName = obj.spiderName
  //       var urlType = obj.urlType
  //       var checked = obj.checked

  //       if (checked){
  //         selectedCount += 1
  //         rows.push(<ItemRedDashboard  showSpiderName={showSpiderName} handleSelectUrlToDelete={handleSelectUrlToDelete} SiteId={SiteId} customerId={customerId} id={id} inputCategoryUrl={inputCategoryUrl} spiderName={spiderName} urlType={urlType} index={index} /> )
  //       } else {
  //         rows.push(<ItemDashboard showSpiderName={showSpiderName} handleSelectUrlToDelete={handleSelectUrlToDelete} SiteId={SiteId} customerId={customerId} id={id} inputCategoryUrl={inputCategoryUrl} spiderName={spiderName} urlType={urlType} index={index} /> )
  //       }
  //     })
  //     return (
  //       <div className="panel panel-success">
  //         <div className="panel-heading">
  //           <strong>{this.props.customerNameDashboard} > </strong>
  //           <strong>{this.props.urlTypeDashboard}:</strong>&nbsp;
  //           <div className="btn-toolbar navbar-right" role="toolbar" aria-label="...">
  //             {this.displaySpiderNameButton()}
  //             {this.displaySelectAllButton()}
  //             <ModalDialog handleDeleteUrls={this.props.handleDeleteUrls}/>
  //             <button className="btn btn-danger btn-sm" disabled={selectedCount > 0 ? false : true } type="button" data-toggle="modal" data-target="#exampleModal">Delete</button>
  //         </div>
  //           Total {allUrls.length}&nbsp;|
  //           Selected {selectedCount}&nbsp;&nbsp;
  //         </div>
  //         <ul className="list-group">
  //           {rows}
  //         </ul>
  //       </div>
  //     )
  //   }
  // },

  currentCustomers: function(){
    // var rows = [];
    // var allUrls = this.props.allUrls;

    // allUrls.map(function(obj){
    //   // console.log(obj.domainOffered, 'obj')
    //   if (!obj.domainActive && !obj.domainOffered && obj.urlCount > 0){
    //     rows.push( 
    //       <li className="list-group-item text-center redText hover" key={ obj.domain }>
    //         { obj.domain }
    //         <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
    //       </li> 
    //       )
    //   } 
    // })
    // if (rows.length > 0){
      return (
        <div className="panel panel-success"> 
          <div className="panel-heading"> 
            <h3 className="panel-title text-center">
            <span className="pull-left" aria-hidden="true">ID</span>
              <strong>Current Customers</strong>
            </h3> 
          </div> 
          <div className="list-group"> 

          <li className="list-group-item text-center blackText hover">
           customer 1
            <span className="pull-left" aria-hidden="true">1</span>
          </li> 

          <li className="list-group-item text-center blackText hover">
           customer 2
            <span className="pull-left" aria-hidden="true">2</span>
          </li> 

          <li className="list-group-item text-center blackText hover">
           customer 3
            <span className="pull-left" aria-hidden="true">2</span>
          </li> 

          </div> 
        </div>
      )
    // }
  },

  render: function(){
    // var domainsLoading = this.props.domainsLoading
    // var userLoading = this.props.userLoading
    // var customersLoading = this.props.customersLoading
    // var urlsUploading = this.props.urlsUploading
    // if (domainsLoading || userLoading || customersLoading || urlsUploading){
    //   return (
    //     <div>
    //       <Logo delay={true} />
    //       <div className="container text-center">
    //         <br/>
    //       </div>
    //         <br/>
    //       <div className="container">
    //         <br/>
    //         <br/>
    //         <br/>
    //         <div className="row text-center">
    //         <i className="fa fa-spinner w3-spin" style={{fontSize:'44px'}}></i>
    //         </div>
    //       </div> 
    //     </div>
    //   )
    // } else {
      return (        
        <div>
          <div className="container">
          <br/>
          <br/>
          <div className="row">

            <div className="col-sm-6">
              <h1></h1>
            { this.currentCustomers() }
            </div>

            <div className="col-sm-6">
              <br/>
              <form className="" onSubmit={ this.handleUserLoginSubmit }>
               <div className="form-group">
                 <label>Add Customer:</label>
                 <input 
                 placeholder="Customer Name"
                 onChange={this.handleChange} 
                 type="email"
                 className="form-control"
                 required 
                 />
               </div>
                <button className="btn btn-warning btn-md" disabled="true">Add</button>&nbsp;&nbsp;
              </form>
            </div>



          </div>
          </div>
        </div>
      )
  }
});

module.exports = custAdmin;

