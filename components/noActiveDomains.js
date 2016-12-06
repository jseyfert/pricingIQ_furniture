
var React = require('react');
var _ = require("underscore");
var Message = require('./partialComps/message');
var Logo = require('./partialComps/logo');

var NoActiveDomains = React.createClass({

  displayRowsAvailable: function(){
    var rows = [];
    var allDomains = this.props.allDomains;

    allDomains.map(function(arr){
      if (arr[1] === true) {
        rows.push( 
          <li className="list-group-item text-center greenHover greenText" key={ arr[0] }>
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
          <li className="list-group-item text-center redText" key={ obj.domain }>
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

 displayRowsLimitReached: function(){
    var rows = [];
    var allUrls = this.props.allUrls;

    allUrls.map(function(obj){
      console.log(obj)
      if (obj.domainActive && obj.countLeftToSubmit === 0 && obj.urlCount > 0){
        rows.push( 
          <li className="list-group-item text-center redText" key={ obj.domain }>
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

      <div className="container">
        <br/>

        <div className="container">
            <div className="container-fluid">
              <div className="row">

                <div className="col-lg-12 text-center">
                  <Message message={this.props.message} />
                </div>

                <div className="col-lg-6">
                  { this.displayRowsNotAvailable() }
                  { this.displayRowsLimitReached() }
                </div>  

                <div className="col-lg-6">
                  <div className="panel panel-success"> 
                    <div className="panel-heading"> 
                      <h3 className="panel-title text-center">
                        <strong>Online Domains:</strong>
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

module.exports = NoActiveDomains;