
var React = require('react');
var LogoutUser = require('./userLogout.js');

var Footer = React.createClass({
  render: function(){
    return (
      <div>
        <footer className="navbar-fixed-bottom">
          <div className="container text-center whiteText">
            <a className="colorOrange">FAQ</a> | Want us to add a new Domain? <a className="colorOrange">Suggest One</a>
          </div>
          <br/>
        </footer>
      </div>
    )
  }
});

module.exports = Footer;