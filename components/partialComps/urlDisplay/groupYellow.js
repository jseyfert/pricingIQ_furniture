
var React = require('react');

var UrlGroupYellow = React.createClass({
  render: function(){
    var index = this.props.index 
    var urlCount = this.props.urlCount
    var domain = this.props.domain
    var urls = this.props.urls
    var countLeftToSubmit = this.props.countLeftToSubmit

    return (
          <div className="panel-group" id={"faqAccordion" + index} >
            <div className="panel panel-warning">
              <li className="list-group-item list-group-item-warning" data-toggle="collapse" data-parent={"#faqAccordion" + index} data-target={"#question" + index}>
                <span className="badge yellowBackground">{countLeftToSubmit} of {urlCount} processed</span>
                <span className="badge yellowBackground">Too Many</span>
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

module.exports = UrlGroupYellow;
