
var React = require('react');

var ModalDialog = React.createClass({

  // getInitialState: function(){
  //   return {
  //     domain1: '',
  //     domain2: '',
  //     domain3: '',
  //     domain4: '',
  //   };
  // },

  // onDomain1Change: function(e){ this.setState({ domain1: e.target.value }) },
  // onDomain2Change: function(e){ this.setState({ domain2: e.target.value }) },
  // onDomain3Change: function(e){ this.setState({ domain3: e.target.value }) },
  // onDomain4Change: function(e){ this.setState({ domain4: e.target.value }) },

  // handleUserLoginSubmit: function(e){
  //   e.preventDefault();
  //   var arr = [];
  //   if (this.state.domain1) {arr.push(this.state.domain1)}
  //   if (this.state.domain2) {arr.push(this.state.domain2)}
  //   if (this.state.domain3) {arr.push(this.state.domain3)}
  //   if (this.state.domain4) {arr.push(this.state.domain4)}
  //   if (arr.length > 0){
  //     this.props.submitSuggestedDomains(arr);
  //     this.setState({ domain1:'', domain2: '', domain3: '', domain4: ''});
  //   }  
  // },

  render: function(){
    return (
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title blackText" id="exampleModalLabel">You sure?</h4>
            </div>
            <div className="modal-body">
                <button onClick={ console.log("working")} type="submit" className="btn btn-danger" data-dismiss="modal" aria-label="Close" >Yes</button>
                &nbsp;
                <button onClick={ console.log("working")} type="submit" className="btn btn-success" data-dismiss="modal" aria-label="Close" >No</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ModalDialog;