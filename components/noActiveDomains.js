
var React = require('react');
var _ = require("underscore");
var Message = require('./partialComps/message');

var ErrorNoActiveDomains = React.createClass({

  displayRowsAvailable: function(){
    var rows = [];
    var allDomains = this.props.allDomains;

    allDomains.map(function(arr){
      if (arr[1] === true) {
        rows.push( 
          <li className="list-group-item text-center greenHover greenText">
            { arr[0] }
            <span className="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>
          </li> 
          )
      }
    })
    return rows;
  },

  displayRowsNotAvailable: function(){
    var rows = [];
    var allUrls = this.props.allUrls;

    allUrls.map(function(obj){
      if (!obj.domainActive && obj.urlCount > 0){
        rows.push( 
          <li className="list-group-item text-center redText">
            { obj.domain }
            <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
          </li> 
          )
      } 
    })
    return rows;
  },

  render: function(){

    return (
    <div>
      <div className="container">

        <div className="container text-center">
          <h1 className="mainLogo">pricingIQ</h1>
          <div id="fadeIn"><p className="lead whiteText">Product Pricing Done Right</p></div>
          <br/>
        </div>

        <br/>

        <div className="container">
            <div className="container-fluid">
              <div className="row">

                <div className="col-lg-12 text-center">
                  <Message message={this.props.message} />
                </div>

                <div className="col-lg-6">
                  <div className="panel panel-danger"> 
                    <div className="panel-heading"> 
                      <h3 className="panel-title text-center">
                        <strong>Inactive Domains you submitted:</strong>
                      </h3> 
                    </div> 
                    <div className="list-group"> 
                      { this.displayRowsNotAvailable() }
                    </div> 
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="panel panel-success"> 
                    <div className="panel-heading"> 
                      <h3 className="panel-title text-center">
                        <strong>Active Domains you can submit:</strong>
                      </h3> 
                    </div> 
                    <div className="list-group"> 
                      { this.displayRowsAvailable() }
                    </div> 
                  </div>
                </div>

              </div>
            </div>
        </div>

      </div>
    </div>

    )
  }
});

module.exports = ErrorNoActiveDomains;