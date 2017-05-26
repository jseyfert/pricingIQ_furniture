
var React = require('react');

var UrlGroupGreen = React.createClass({
  render: function(){
    var index = this.props.index 
    var urlCount = this.props.urlCount
    var domain = this.props.domain
    var siteId = this.props.siteId
    var spiderName = this.props.spiderName
    var urls = this.props.urls
    var countLeftToSubmit = this.props.countLeftToSubmit
    return (
      <div className="panel-group" id={"faqAccordion" + index} >
        <div className="panel panel-success">
          <li className="list-group-item list-group-item-success" data-toggle="collapse" data-parent={"#faqAccordion" + index} data-target={"#question" + index}>
            <span className="badge greenBackground">UrlsSubmitted: {urlCount}</span>
            <span className="badge greenBackground">SiteId: {siteId}</span>
            <span className="badge greenBackground">SpiderName: {spiderName}</span>
            <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
            <strong> {domain}</strong>
          </li>
          <div id={"question" + index} className="panel-collapse collapse" style={{height: '0px'}}>
            <ul className="list-group"> 
            { this.props.displayListItem(urls, urlCount, countLeftToSubmit, index) }
            </ul>
          </div>
        </div>
      </div>
      )
    }
});

module.exports = UrlGroupGreen;
