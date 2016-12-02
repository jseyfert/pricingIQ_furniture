
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
              <p className="navbar-text navbar-right"><i className="fa fa-spinner w3-spin" style={{fontSize:'14px'}}></i></p>
            </div>
        </div>
        )
    } else {
    var isLoggedIn = (this.props.user.user === 'anonymous') ? <p className="navbar-text navbar-right"><a className="navbar-link navbarLink" onClick={ this.props.setActiveComponent.bind(null, 'login') }>Login</a> <a className="navbar-link navbarLink" onClick={ this.props.setActiveComponent.bind(null, 'landing') }>Home</a></p> : <p className="navbar-text navbar-right navbarLink">Welcome { this.props.user.user } - <LogoutUser logoutUser={ this.props.logoutUser } /> <a className="navbar-link navbarLink" onClick={ this.props.setActiveComponent.bind(null, 'landing') }>Home</a></p>
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