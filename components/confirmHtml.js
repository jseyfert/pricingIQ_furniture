
var React = require('react');
var _ = require("underscore");

var ConfirmHtml = React.createClass({

  displayRow: function(){
    var rows = [];
    var allUrls = this.props.allUrls;
    var allDomains = this.props.allDomains;

    var displayListItem = function(urls){
      var listItem = []
      urls.map(function(url){
        listItem.push(<li className="list-group-item smallUrlText">{ url }</li>)
      })
      return listItem;
    }

    allUrls.map(function(obj){
      var count = obj.urls.length
      var urls = obj.urls
      var domain = obj.domain
      var img = ( _.where(allDomains, {domain: domain}).length > 0 ) ? _.where(allDomains, {domain: domain})[0].img : null;
      if (obj.domainAvailable) {
        rows.push(
                <ul className="list-group">
                  <li className="list-group-item">
                    <img src={ img } key={ img } alt=""/>
                    <span className="badge">{ count }</span>
                  </li>
                  { displayListItem(urls) }
                </ul>
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
           <h3>URLs currently being processed</h3>
           <br/>
          { this.displayRow() }
        </div>
        </div>
      </div>
      )
  }
});

module.exports = ConfirmHtml;









