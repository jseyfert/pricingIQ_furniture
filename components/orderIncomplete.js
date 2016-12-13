
var React = require('react');
var _ = require("underscore");
var Message = require('./partialComps/message');
var Logo = require('./partialComps/logo');

var OrderIncomplete = React.createClass({

  displayOnline: function(){
    var rows = [];
    var allDomains = this.props.allDomains;

    allDomains.map(function(arr){
      if (arr[1] === true) {
        rows.push( 
          <li className="list-group-item text-center greenHover greenText hover" key={ arr[0] }>
            { arr[0] }
            <span className="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>
          </li> 
          )
      }
    })
    return rows;
  },

  displayOffline: function(){
    var rows = [];
    var allUrls = this.props.allUrls;

    allUrls.map(function(obj){
      // console.log(obj.domainOffered, 'obj')
      if (!obj.domainActive && obj.domainOffered && obj.urlCount > 0){
        rows.push( 
          <li className="list-group-item text-center redText hover" key={ obj.domain }>
            { obj.domain }
            <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
          </li> 
          )
      } 
    })
    if (rows.length > 0){
      return (
        <div className="panel panel-danger"> 
          <div className="panel-heading"> 
            <h3 className="panel-title text-center">
              <strong>Offline Domains:</strong>
            </h3> 
          </div> 
          <div className="list-group"> 
            { rows }
          </div> 
        </div>
      )
    }
  },  

  displayNotOffered: function(){
    var rows = [];
    var allUrls = this.props.allUrls;

    allUrls.map(function(obj){
      // console.log(obj.domainOffered, 'obj')
      if (!obj.domainActive && !obj.domainOffered && obj.urlCount > 0){
        rows.push( 
          <li className="list-group-item text-center redText hover" key={ obj.domain }>
            { obj.domain }
            <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
          </li> 
          )
      } 
    })
    if (rows.length > 0){
      return (
        <div className="panel panel-danger"> 
          <div className="panel-heading"> 
            <h3 className="panel-title text-center">
              <strong>Domains Not Offered:</strong>
            </h3> 
          </div> 
          <div className="list-group"> 
            { rows }
          </div> 
        </div>
      )
    }
  },

 displayLimitReached: function(){
    var rows = [];
    var allUrls = this.props.allUrls;

    allUrls.map(function(obj){
      console.log(obj)
      if (obj.domainActive && obj.countLeftToSubmit === 0 && obj.urlCount > 0){
        rows.push( 
          <li className="list-group-item text-center redText hover" key={ obj.domain }>
            { obj.domain }
            <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
          </li> 
          )
      } 
    })
    if (rows.length > 0){
      return (
        <div className="panel panel-danger"> 
          <div className="panel-heading"> 
            <h3 className="panel-title text-center">
              <strong>Limit Reached:</strong>
            </h3> 
          </div> 
          <div className="list-group"> 
            { rows }
          </div> 
        </div>
      )
    }
  },

  render: function(){
    return (
      <div>
        <Logo delay={true} /> 
        <h3 className="text-center">You have reach your limit or did not submit any online domains.</h3>
        <br/>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
            { this.displayOffline() }
            { this.displayLimitReached() }
            { this.displayNotOffered() }
          </div>
        </div>
      </div>
    )
  }
});

module.exports = OrderIncomplete;