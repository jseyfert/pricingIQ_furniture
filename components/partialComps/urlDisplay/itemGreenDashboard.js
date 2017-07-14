
var React = require('react');

var ItemGreenDashboard = React.createClass({
    test: function(id){
        console.log("in test", id)
    },

  render: function(){
    var urlCount = this.props.index + 1
    return (
          <button onClick={this.test} className="list-group-item greenText smallText hover" >
           {urlCount}) {this.props.inputCategoryUrl}  
          </button>
      )
    }
});

module.exports = ItemGreenDashboard;
