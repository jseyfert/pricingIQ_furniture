
var React = require('react');
var LogoutUser = require('./userLogout.js');

var Header = React.createClass({

  render: function(){
    var userLoading = this.props.userLoading
    // console.log('userLoading',userLoading);
    if(userLoading) {
      return (
        <div>
          <nav className="navbar navbar-default">
            <div className="container">
              <a className="navbar-brand navbar-left">PricingIQ</a>
              <p className="navbar-text navbar-right"><span className="glyphicon glyphicon-refresh spin" aria-hidden="true"></span></p>
            </div>
          </nav>
        </div>
        )
    } else {
    var isLoggedIn = (this.props.user.user === 'anonymous') ? <p className="navbar-text navbar-right"><a className="navbar-link colorBlue" onClick={ this.props.setActiveComponent.bind(null, 'login') }>Login</a></p> : <p className="navbar-text navbar-right">Welcome { this.props.user.user } - <LogoutUser logoutUser={ this.props.logoutUser } /></p>
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
  }
});

module.exports = Header;