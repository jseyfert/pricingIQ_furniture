
var React = require('react');
// var LogoutUser = require('./userLogout.js');

var Header = React.createClass({

  render: function(){
    var userLoading = this.props.userLoading
    var activeComponent = this.props.activeComponent
    var user = this.props.user
    if(userLoading) {
      return (
        <div>
            <div className="container">
              <p className="navbar-text navbar-right"><i className="fa fa-spinner w3-spin" style={{fontSize:'14px'}}></i></p>
            </div>
        </div>
        )
    } else if(this.props.user.user == 'anonymous') {
        return(
          <div className="container">
            <p className="navbar-text navbar-right">
              <a className="navbar-link navbarLink" onClick={ this.props.setActiveComponent.bind(null, 'login') }>Login</a>
            </p> 
          </div>
        )
    } else {
        if(activeComponent == 'landing') {
            return(
              <div className="container">
                <p className="navbar-text navbar-left navbarLink">
                  <a className="navbar-link selected"onClick={ this.props.setActiveComponent.bind(null, 'landing') }>Home</a>
                  <span className="makeOrange"> | </span>
                  <a className="navbar-link navbarLink" onClick={ this.props.setActiveComponent.bind(null, 'dashboard') }>Url Admin</a>
                  <span className="makeOrange"> | </span>
                  <a className="navbar-link navbarLink" onClick={ this.props.setActiveComponent.bind(null, 'custAdmin') }>Customer Admin</a>
                </p>
                <p className="navbar-text navbar-right navbarLink">
                  Welcome { this.props.user.user }&nbsp;
                  <a className="navbar-link navbarLink" onClick={ this.props.logoutUser }>Logout</a>
                </p>
              </div>
            )
        } else if(activeComponent == 'dashboard') {
            return(
              <div className="container">
                <p className="navbar-text navbar-left navbarLink">
                  <a className="navbar-link navbarLink"onClick={ this.props.setActiveComponent.bind(null, 'landing') }>Home</a>
                  <span className="makeOrange"> | </span>
                  <a className="navbar-link selected" onClick={ this.props.setActiveComponent.bind(null, 'dashboard') }>Url Admin</a>
                  <span className="makeOrange"> | </span>
                  <a className="navbar-link navbarLink" onClick={ this.props.setActiveComponent.bind(null, 'custAdmin') }>Customer Admin</a>
                </p>
                <p className="navbar-text navbar-right navbarLink">
                  Welcome { this.props.user.user }&nbsp;
                  <a className="navbar-link navbarLink" onClick={ this.props.logoutUser }>Logout</a>
                </p>
              </div>
            )
        } else if(activeComponent == 'custAdmin') {
            return(
              <div className="container">
                <p className="navbar-text navbar-left navbarLink">
                  <a className="navbar-link navbarLink"onClick={ this.props.setActiveComponent.bind(null, 'landing') }>Home</a>
                  <span className="makeOrange"> | </span>
                  <a className="navbar-link navbarLink" onClick={ this.props.setActiveComponent.bind(null, 'dashboard') }>Url Admin</a>
                  <span className="makeOrange"> | </span>
                  <a className="navbar-link selected" onClick={ this.props.setActiveComponent.bind(null, 'custAdmin') }>Customer Admin</a>
                </p>
                <p className="navbar-text navbar-right navbarLink">
                  Welcome { this.props.user.user }&nbsp;
                  <a className="navbar-link navbarLink" onClick={ this.props.logoutUser }>Logout</a>
                </p>
              </div>
            )
        } else {
          return(
            <div className="container">
              <p className="navbar-text navbar-left navbarLink">
                <a className="navbar-link navbarLink"onClick={ this.props.setActiveComponent.bind(null, 'landing') }>Home</a>
                <span className="makeOrange"> | </span>
                <a className="navbar-link navbarLink" onClick={ this.props.setActiveComponent.bind(null, 'dashboard') }>Url Admin</a>
                <span className="makeOrange"> | </span>
                <a className="navbar-link navbarLink" onClick={ this.props.setActiveComponent.bind(null, 'custAdmin') }>Customer Admin</a>
              </p>
              <p className="navbar-text navbar-right navbarLink">
                Welcome { this.props.user.user }&nbsp;
                <a className="navbar-link navbarLink" onClick={ this.props.logoutUser }>Logout</a>
              </p>
            </div>
          )

        }
    }
  }
});

module.exports = Header;
