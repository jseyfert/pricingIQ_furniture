
var React = require('react');

var UrlItemRed = React.createClass({
  render: function(){
    return (
          <li className="list-group-item redText hover" data-toggle="collapse" data-parent={"#faqAccordion" + this.props.index} data-target={"#question" + this.props.index} >
            <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
            {this.props.url}  
          </li>
      )
    }
});

module.exports = UrlItemRed;
