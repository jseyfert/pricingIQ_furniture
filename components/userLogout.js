var React = require('react');

var LogoutUser = React.createClass({
	render: function(){
		return  <a href="#" className="navbar-link colorBlue" onClick={ this.props.logoutUser }> Logout</a>
	}
});

module.exports = LogoutUser;