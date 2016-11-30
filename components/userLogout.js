var React = require('react');

var LogoutUser = React.createClass({
	render: function(){
		return  <a className="navbar-link whiteText" onClick={ this.props.logoutUser }> Logout</a>
	}
});

module.exports = LogoutUser;