
var React = require('react');

var GroupGreenDashboard = React.createClass({
  render: function(){

    var SiteId = this.props.SiteId
    var customerId = this.props.customerId
    var id = this.props.id
    var inputCategoryUrl = this.props.inputCategoryUrl
    var spiderName = this.props.spiderName
    var urlType = this.props.urlType
    var index = this.props.index 
    
    var urls = this.props.urls
    return (
      <div className="panel-group" id={"faqAccordion" + index} >
        <div className="panel panel-success">
          <li className="list-group-item list-group-item-success" data-toggle="collapse" data-parent={"#faqAccordion" + index} data-target={"#question" + index}>
            <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
            <strong> {spiderName}</strong>
          </li>
          <div id={"question" + index} className="panel-collapse collapse" style={{height: '0px'}}>
            <ul className="list-group"> 
            { this.props.displayListItem(urls, index) }
            </ul>
          </div>
        </div>
      </div>
            // <span className="badge greenBackground">UrlsSubmitted: {urlCount}</span>
            // <span className="badge greenBackground">SiteId: {siteId}</span>
            // <span className="badge greenBackground">SpiderName: {spiderName}</span>
      )
    }
});

module.exports = GroupGreenDashboard;
