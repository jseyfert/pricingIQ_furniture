
var React = require('react');

var ModalDialog = React.createClass({

  handleUserLoginSubmit: function(e){
    this.props.handleDeleteUrls()
  },

  render: function(){
    return (
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title blackText" id="exampleModalLabel">Delete Selected Urls?</h4>
            </div>
            <div className="modal-footer">
                   <button  type="submit" onClick={this.handleUserLoginSubmit} className="btn btn-danger" data-dismiss="modal" aria-label="Close" >Yes</button>
                   <button  type="submit" className="btn btn-success" data-dismiss="modal" aria-label="Close" >No</button>
                 </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ModalDialog;