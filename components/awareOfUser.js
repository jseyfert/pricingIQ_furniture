var React = require('react');


function AwareOfUser(props){
		if(props.user.user !== "anonymous"){
			return (
			<div>
				<h2> Hello { props.user.user.username } </h2>
			</div>
			)
		} else {
			return (
				<div>
				<h1> Welcome Please sign in </h1>
				</div>
				)
		}
		
		

};

module.exports = AwareOfUser;