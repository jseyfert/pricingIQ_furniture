
var React = require('react');

var ModalDialog = React.createClass({

  getInitialState: function(){
    return {
      domain1: null,
      domain2: null,
      domain3: null,
      domain4: null,
    };
  },

  onDomain1Change: function(e){ this.setState({ domain1: e.target.value }) },
  onDomain2Change: function(e){ this.setState({ domain2: e.target.value }) },
  onDomain3Change: function(e){ this.setState({ domain3: e.target.value }) },
  onDomain4Change: function(e){ this.setState({ domain4: e.target.value }) },

  handleUserLoginSubmit: function(e){
    e.preventDefault();
    var arr = [];
    if (this.state.domain1) {arr.push(this.state.domain1)}
    if (this.state.domain2) {arr.push(this.state.domain2)}
    if (this.state.domain3) {arr.push(this.state.domain3)}
    if (this.state.domain4) {arr.push(this.state.domain4)}
    if (arr.length > 0){
      this.props.submitSuggestedDomains(arr);
      this.setState({ domain1:null, domain2: null, domain3: null, domain4: null});
    }  
  },

  render: function(){
    return (
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title blackText" id="exampleModalLabel">Enter suggested domains:</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Domain" onChange={this.onDomain1Change} value={this.state.domain1} required/>
                </div>        
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Domain" onChange={this.onDomain2Change} value={this.state.domain2}/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Domain" onChange={this.onDomain3Change} value={this.state.domain3}/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Domain" onChange={this.onDomain4Change} value={this.state.domain4}/>
                </div>
                <div className="modal-footer">
                  <button onClick={ this.handleUserLoginSubmit} type="submit" className="btn btn-primary" data-dismiss="modal" aria-label="Close" >Send Suggestions</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ModalDialog;