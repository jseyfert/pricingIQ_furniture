
var React = require('react');

var ItemRedDashboard = React.createClass({
  handleClick: function(id){
      // console.log("in handleClick", this.props.id)
      this.props.handleSelectUrlToDelete(this.props.id)
  },


  render: function(){
    var urlCount = this.props.index + 1
    return (
 
           <li className="list-group-item list-group-item-danger smallText" onClick={this.handleClick}>
             <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
             {urlCount}) {this.props.inputCategoryUrl} 
           </li>
      )
    }
});

module.exports = ItemRedDashboard;
