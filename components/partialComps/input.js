
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
      this.prepareToValidate = _.debounce(startValidation, 1200);
    }
  },
  
  handleChange: function(e){
    if (!this.state.validationStarted) {
      this.prepareToValidate();
    }
    this.props.onChange && this.props.onChange(e);
  },
  
  render: function(){
    // console.log('in message', (this.props.message))
    // console.log('in value', (this.props.value === ""))
    if (this.state.validationStarted) {
       if(this.props.valid){
          return (
          <div className="form-group has-success has-feedback">
            <label className="control-label green" for="inputSuccess2">{this.props.lable}</label>
            <input 
            {...this.props}
            onChange={this.handleChange} 
            type={this.props.type} 
            className="form-control" 
            id="inputSuccess2" 
            aria-describedby="inputSuccess2Status"
            required
            />
            <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
            <span id="inputSuccess2Status" className="sr-only">(success)</span>
          </div>
          );
       } else {
        return (
          <div className="form-group has-error has-feedback">
            <label className="control-label red" for="inputError2">{this.props.errorMessageClient}</label>
            <input 
            {...this.props}
            onChange={this.handleChange} 
            type={this.props.type} 
            className="form-control" 
            id="inputError2"
            aria-describedby="inputError2Status"
            required
            />
            <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
            <span id="inputError2Status" className="sr-only">(error)</span>
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
          type={this.props.type}
          className="form-control"
          required 
          />
        </div>
        );
    }
  }
});

module.exports = Input;



