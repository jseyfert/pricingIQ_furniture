
var React = require('react');

var ItemDashboard = React.createClass({
    handleClick: function(id){
        // console.log("in handleClick", this.props.id)
        this.props.handleSelectUrlToDelete(this.props.id)
    },

  render: function(){
    var urlCount = this.props.index + 1
    return (
           <li className="list-group-item blackText smallText hover" onClick={this.handleClick} >
             {urlCount}) {this.props.inputCategoryUrl} 
           </li>

      )
    }
});

module.exports = ItemDashboard;
