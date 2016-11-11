
var React = require('react');
var _ = require("underscore");

var ConfirmHtml = React.createClass({

  displayRow: function(){
    var rows = [];
    var allUrls = this.props.allUrls;
    var allDomains = this.props.allDomains;

    console.log('in confirm html', allUrls);



    var displayListItem = function(urls, count){
      var listItem = [];
      var count = count;
      urls.map(function(url, index){
        if (index >= 15 ) {
          listItem.push( <li className="list-group-item smallUrlText yellowText" key={ url + index }>{ url } (not processing)</li>)
        } else {
          listItem.push(<li className="list-group-item smallUrlText" key={ url + index }>{ url }</li>)
        }
      })
      return listItem;
    }



    allUrls.map(function(obj){
      var count = obj.urls.length
      var urls = obj.urls
      var domain = obj.domain
      var img = ( _.where(allDomains, {domain: domain}).length > 0 ) ? _.where(allDomains, {domain: domain})[0].img : null;
      if (obj.domainAvailable && count <= 15) {
        rows.push(
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">{ domain } <span className="label label-success label-as-badge" key='success'>{ count }</span></h3>
            </div>
              { displayListItem(urls) }
          </div>
          )
      } 
      else if( obj.domainAvailable && count > 15){
        rows.push(
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">{ domain } <span className="label label-warning label-as-badge" key='danger'>{ count } </span> &nbsp; ( we are only processing the first 15 URLs)</h3>
            </div>
              { displayListItem(urls, count) }
          </div>
          )
      }
      else {
        rows.push(
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h3 className="panel-title">{ domain } <span className="label label-danger label-as-badge" key='danger'>{ count } </span> &nbsp; ( domain unavailable - we are not processing these urls)</h3>
            </div>
              { displayListItem(urls) }
          </div>
          )
      }
    })  
    return rows;
  },

  render: function(){
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
             <h1>Thank You</h1>
             <p>Please check your email to recieve your data</p>
             <hr className="showHr"/>
             { this.displayRow() }
          </div>
        </div>
      </div>
      )
  }
});

module.exports = ConfirmHtml;









