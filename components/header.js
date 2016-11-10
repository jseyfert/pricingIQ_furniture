
var React = require('react');
var LogoutUser = require('./userLogout.js');

var Header = React.createClass({

  render: function(){
    var isLoggedIn = (this.props.user.user === 'anonymous') ? null : <p className="navbar-text navbar-right">Welcome { this.props.user.user } - <LogoutUser logoutUser={ this.props.logoutUser } /></p>
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <a className="navbar-brand navbar-left">PricingIQ</a>
              { isLoggedIn }
          </div>
        </nav>
      </div>
    )
  }
});

module.exports = Header;