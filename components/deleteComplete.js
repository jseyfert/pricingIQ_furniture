
var React = require('react');

var DeleteComplete = React.createClass({

  render: function(){
    return (
      <div>
        <h1 className="text-center">{this.props.deleteCount} Url(s) Deleted</h1>
      </div>
    )
  }
});

module.exports = DeleteComplete;

