var React = require('react');

var LogoutUser = React.createClass({
	render: function(){
		return (
			<div>
				<button className="btn btn-primary right" onClick={ this.props.logoutUser }>Log out</button>
			</div>
			)
	}
});

module.exports = LogoutUser;