
var React = require('react');

var Message = React.createClass({

  render: function(){
  if(this.props.message){
    var alert = this.props.message.alert
    var message = this.props.message.message

    var link = <a className="alert-link" > test</a>
      return (
        <div>
          <div className={alert} role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error: </span>&nbsp; 
           {message}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
});

module.exports = Message;