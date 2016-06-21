var React = require('react');

var LogoutUser = React.createClass({
	render: function(){
		return (
			<div>
				<button type="submit" className="btn btn-primary" onClick={ this.props.logoutUser }>Log out</button>
			</div>
			)
	}
});

module.exports = LogoutUser;