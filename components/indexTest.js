
var React = require('react');
var ReactDOM = require('react-dom');

var ShowWhichComponent = require('./showWhichComponent.js');
var Header = require('./header.js');
var Footer = require('./footer.js');
var _ = require("underscore");
// console.log('process.env', process.env);

var InputTest = require('./inputTest.js');

var Index = React.createClass({
  
  getInitialState: function(){
   return {
     email: ''
     }
  },

  handleChange: function(e){
    this.setState({ 
      email: e.target.value
    })
  },

  // inputTest: function(){
  //   return (
  //     <input 
  //     type="text" 
  //     className="form-control" 
  //     name="email"
  //     onBlur={this.handleChange}
  //     />
  //     )
  // },

  formGroupTest: function(){
    return (
      <div className="form-group">
          <label>Email</label>
          <InputTest handleChange={this.handleChange} />
      </div>
      )
  },

  render: function(){
      return (
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">

                      {this.formGroupTest()}

          </div>
        </div>
      )
    }
});

ReactDOM.render(  <Index />,  document.getElementById('app'));

