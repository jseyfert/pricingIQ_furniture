
var React = require('react');
var _ = require("underscore");

var ErrorNoActiveDomains = React.createClass({

  displayRowsAvailable: function(available){
    var rows = [];
    var allDomains = this.props.allDomains;
    
    allDomains.map(function(obj){
      var domain = obj.domain
      if (obj.domainAvailable === true) {
        rows.push( <li className="list-group-item text-success text-center greenHover">{ domain }</li> )
      }
    })
    return rows;
  },

  displayRowsNotAvailable: function(available){
    var rows = [];
    var allUrls = this.props.allUrls;

    allUrls.map(function(obj){
      var domain = obj.domain
      var domainAvailable = obj.domainAvailable
      if (!domainAvailable){
        rows.push( <li className="list-group-item text-danger text-center redHover">{ domain }</li> )
      } 
    })
    return rows;
  },

  render: function(){

    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error: </span>
               &nbsp; You did not submit any active domains
            </div>
            <hr className="showHr"/>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6">
                  <ul className="list-group">
                    <h4 className="text-danger text-center">Inactive Domains you submitted:</h4>
                     { this.displayRowsNotAvailable() }
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul className="list-group">
                    <h4 className="text-success text-center">Active Domains you can submit:</h4>
                    { this.displayRowsAvailable() }
                  </ul>
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