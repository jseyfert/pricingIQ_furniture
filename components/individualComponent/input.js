
var React = require('react');

var Input = React.createClass({

    handleChange: function(e){
      var self = this
      const value = e.target.value
      console.log('in handleChange', value);
      self.props.changeValue(value)

    },

    render: function(){
      var lable = this.props.lable
      var type = this.props.type || 'text'
      var name = this.props.name;
      var changeValue = this.props.changeValue
      var value = this.props.value
      var valid = this.props.valid
      var errorMessage = (this.props.errorMessage) ? this.props.errorMessage : null;

      if (valid === null){
        return(
          <div className="form-group">
            <label>{lable}</label>
            <input 
            type={type}
            name={name}
            value={this.props.value}
            className="form-control" 
            onBlur={this.handleChange}
            // onChange={this.props.onEmailChange}
            // onFocus={this.props.onEmailFocus}
            required/>
          </div>
          )
      } else if (valid) {
        return(
          <div className="form-group has-success">
            <label className="control-label" for="inputSuccess1">{lable}</label>
            <input
            type={type}
            name={name}
            value={this.props.value}
            className="form-control" 
            id="inputSuccess1" 
            onBlur={this.handleChange}
            // onChange={this.props.onEmailChange}
            // onFocus={this.props.onEmailFocus}
            required/>
          </div>
          )
      } else {
        return(
          <div className="form-group has-error">
            <label className="control-label" for="inputError1">{lable} - {errorMessage}</label>
            <input 
            type={type}
            name={name}
            value={this.props.value}
            className="form-control" 
            id="inputError1" 
            onBlur={this.handleChange}
            // onChange={this.props.onEmailChange}
            // onFocus={this.props.onEmailFocus}
            required/>
          </div>
          )
      }
  }

});



module.exports = Input;