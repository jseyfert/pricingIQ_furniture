var React = require('react');

var LogoutUser = React.createClass({
	render: function(){
		return  <a className="navbar-link colorBlue" onClick={ this.props.logoutUser }> Logout</a>
	}
});

module.exports = LogoutUser;