
var React = require('react');
var LogoutUser = require('./userLogout.js');

var Footer = React.createClass({
  render: function(){
    return (
      <div>
        <footer className="navbar-fixed-bottom">
          <div className="container text-center">
            <a href="#">FAQ</a> | Want us to add a new Domain? <a href="#">Suggest One</a>
          </div>
          <br/>
        </footer>
      </div>
    )
  }
});

module.exports = Footer;