
var React = require('react');
var LogoutUser = require('./userLogout.js');

var Header = React.createClass({

  render: function(){
    var userLoading = this.props.userLoading
    // console.log('userLoading',userLoading);
    if(userLoading) {
      return (
        <div>
            <div className="container">
              <p className="navbar-text navbar-right"><span className="glyphicon glyphicon-refresh spin whiteText" aria-hidden="true"></span></p>
            </div>
        </div>
        )
    } else {
    var isLoggedIn = (this.props.user.user === 'anonymous') ? <p className="navbar-text navbar-right"><a className="navbar-link whiteText" onClick={ this.props.setActiveComponent.bind(null, 'login') }>Login</a></p> : <p className="navbar-text navbar-right whiteText">Welcome { this.props.user.user } - <LogoutUser logoutUser={ this.props.logoutUser } /></p>
    return (
      <div>
          <div className="container">
              { isLoggedIn }
          </div>
      </div>
    )
    }
  }
});

module.exports = Header;