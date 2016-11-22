
var React = require('react');
var ErrorMessage = require('./errorMessage');
var Input = require('./individualComponent/input');

var UserLoginHtml = React.createClass({

  render: function(){
    return (
      <input 
      type="text" 
      className="form-control" 
      name="email"
      onBlur={this.props.handleChange}
      />
      )
  }
});

module.exports = UserLoginHtml;