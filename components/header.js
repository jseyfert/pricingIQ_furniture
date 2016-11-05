
var React = require('react');
var LogoutUser = require('./userLogout.js');

var Header = React.createClass({
  render: function(){
    var user = this.props.user.user
    var showLoggout = (this.props.user.user === "anonymous") ? null : <LogoutUser logoutUser={ this.props.logoutUser } /> 
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <a className="navbar-brand navbar-left" href="#">PricingIQ</a>
            <p className="navbar-text navbar-right">{ user } { showLoggout }</p>
          </div>
        </nav>
      </div>
    )
  }
});

module.exports = Header;