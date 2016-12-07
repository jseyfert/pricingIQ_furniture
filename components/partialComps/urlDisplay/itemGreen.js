
var React = require('react');

var UrlItemGreen = React.createClass({
  render: function(){
    return (
          <li className="list-group-item greenText smallText hover" data-toggle="collapse" data-parent={"#faqAccordion" + this.props.index} data-target={"#question" + this.props.index} >
            <span className="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>
            {this.props.url}  
          </li>
      )
    }
});

module.exports = UrlItemGreen;
