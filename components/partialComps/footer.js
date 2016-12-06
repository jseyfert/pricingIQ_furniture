
var React = require('react');
// var LogoutUser = require('./userLogout.js');

var Footer = React.createClass({
  render: function(){
    return (
      <footer className="navbar-fixed-bottom">
        <div className="container text-center whiteText">
          <a onClick={ this.props.setActiveComponent.bind(null, 'faq') } >FAQ</a> | Want us to add a new Domain? <a data-toggle="modal" data-target="#exampleModal">Suggest One</a>
        </div>
        <br/>
      </footer>
    )
  }
});

module.exports = Footer;