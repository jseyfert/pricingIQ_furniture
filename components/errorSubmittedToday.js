
var React = require('react');
var _ = require("underscore");

var ErrorSubmittedToday = React.createClass({

  // displayRow: function(){
  //   var rows = [];
  //   var allUrls = this.props.allUrls;

  //   allUrls.map(function(obj){
  //     var domain = obj.domain
  //     var domainAvailable = obj.domainAvailable
  //     // console.log(domain, domainAvailable, obj);
  //     if (!domainAvailable){
  //       rows.push(
  //               <div className="col-lg-3 col-md-3 col-xs-3" key={ domain }>
  //               <div className="center">
  //                   { domain } unavailable
  //                   </div>
  //               </div>
  //             )
  //     } else {
  //       rows.push(
  //               <div className="col-lg-3 col-md-3 col-xs-3" key={ domain }>
  //               <div className="center">
  //                   { domain } available
  //                   </div>
  //               </div>
  //             )
  //     }
  //   })

  //   return rows;
  // },

  render: function(){
  // var errorMessage = this.props.errorMessage[1]
  // var allUrls = this.props.allUrls
  // // console.log('in error wrapper', errorMessage, allUrls);

    return (
        <div>
          <div className="container">
            <div className="jumbotron">
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error: </span>
                 &nbsp; You already submitted today, please come back tomorrow
              </div>
            </div>
          </div>
        </div>
               // <p className="text-danger">{ errorMessage }</p>
               // <p>domains:</p>
                // { this.displayRow() }
    )
  }
});

module.exports = ErrorSubmittedToday;