var React = require('react');

var LogoutUser = React.createClass({
	render: function(){
		return (
			<div>
        <a onClick={ this.props.logoutUser }>Logout</a>
			</div>
			)
	}
});

module.exports = LogoutUser;