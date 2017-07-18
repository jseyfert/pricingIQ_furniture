
var React = require('react');

var ItemRedDashboard = React.createClass({
  handleClick: function(id){
      // console.log("in handleClick", this.props.id)
      this.props.handleSelectUrlToDelete(this.props.id)
  },

  showSpiderName: function(id){
    var showSpiderName = this.props.showSpiderName
    // var showSpiderName = true
    if (showSpiderName){
      return (
        <span className="badge redBackground">{this.props.spiderName} </span>
        )
    } else {
      return null
    }
    
  },


  render: function(){
    var urlCount = this.props.index + 1
    return (
 
           <li className="list-group-item list-group-item-danger smallText" onClick={this.handleClick}>
            {this.showSpiderName()}
             <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;
             {this.props.inputCategoryUrl} 
           </li>
      )
    }
});

module.exports = ItemRedDashboard;
