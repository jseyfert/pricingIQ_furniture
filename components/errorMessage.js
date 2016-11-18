
var React = require('react');

var ErrorMessage = React.createClass({

  render: function(){
  // console.log('in errorMessage1', this.props.message);
  if(this.props.message){
    var message = this.props.message.message
    var alert = this.props.message.alert
      return (
        <div>
          <div className={alert} role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error: </span>
           {message}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
});

module.exports = ErrorMessage;