
var React = require('react');
var _ = require("underscore");

var ErrorPage1 = React.createClass({

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
               <h2>in error page 1  - already submitted today</h2>
              <div className="row">
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

module.exports = ErrorPage1;