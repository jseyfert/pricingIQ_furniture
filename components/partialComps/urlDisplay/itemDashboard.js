
var React = require('react');

var ItemDashboard = React.createClass({
  handleClick: function(id){
      // console.log("in handleClick", this.props.id)
      this.props.handleSelectUrlToDelete(this.props.id)
  },

  showSpiderName: function(id){
    var showSpiderName = this.props.showSpiderName
    // var showSpiderName = true
    if (showSpiderName){
      return (
        <span className="badge greenBackground">{this.props.spiderName} </span>
        )
    } else {
      return null
    }
    
  },


  render: function(){
    var urlCount = this.props.index + 1
    return (
           <li className="list-group-item blackText smallText hover" onClick={this.handleClick} >
           {this.showSpiderName()}
             {this.props.inputCategoryUrl} 
           </li>

      )
    }
});

module.exports = ItemDashboard;
