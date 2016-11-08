
var React = require('react');

var ErrorPage = React.createClass({
  render: function(){
    return (
        <div>
          <div className="container">
            <div className="jumbotron">
             <h2>Sorry...</h2>
             <p>You have already submitted Urls today</p>
             <p>Please come back tomorrow</p>
            </div>
          </div>
        </div>
    )
  }
});

module.exports = ErrorPage;