
var React = require('react');
var _ = require("underscore");

var Input = React.createClass({

  getInitialState: function(){
    // we don't want to validate the input until the user starts typing
    return {
      validationStarted: false
    };
  },
  
  prepareToValidate: function(){},

  componentWillMount: function(){
    var startValidation = function(){
      this.setState({
        validationStarted: true
      })
    }.bind(this);

    // if non-blank value: validate now
    if (this.props.value) {
      startValidation();
    }
    // wait until they start typing, and then stop
    else {
      this.prepareToValidate = _.debounce(startValidation, 1500);
    }
  },
  
  handleChange: function(e){
    if (!this.state.validationStarted) {
      this.prepareToValidate();
    }
    this.props.onChange && this.props.onChange(e);
  },
  
  render: function(){
    var className = "";
    if (this.state.validationStarted) {
       if(this.props.valid){
        return (
        <div className="form-group has-success has-feedback">
          <label className="control-label" for="inputSuccess2">{this.props.lable}</label>
          <input 
          {...this.props}
          onChange={this.handleChange} 
          type="text" 
          className="form-control" 
          id="inputSuccess2" 
          aria-describedby="inputSuccess2Status"
          />
          <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
          <span id="inputSuccess2Status" className="sr-only">(success)</span>
        </div>
        );
       } else {
        return (
        <div className="form-group has-error">
          <label className="control-label" for="inputError1">{this.props.lable} {this.props.errorMessage}</label>
          <input 
          {...this.props}
          onChange={this.handleChange} 
          type="text" 
          className="form-control" 
          id="inputError1"
          />
        </div>
        );
       }
    } else {
        return (
        <div className="form-group">
          <label>{this.props.lable}</label>
          <input 
          {...this.props}
          onChange={this.handleChange} 
          type="text" 
          className="form-control" 
          />
        </div>
        );
    }
  }
});



module.exports = Input;



