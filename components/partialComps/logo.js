
var React = require('react');


var Logo = React.createClass({
  render: function(){
    // if (this.props.delay){
    //   return (
    //     <div className="container text-center">
    //       <h1 className="mainLogo">pricingIQ</h1>
    //       <div id="fadeIn"><p className="lead whiteText">Product Pricing Done Right</p></div>
    //       <br/>
    //     </div>
    //   )
    // } else {
      return (
        <div>

          <div className="betaRibbon">Beta Release</div>

          <div className="container text-center">
            <h1 className="mainLogo">pricingIQ</h1>
            <br/>
          </div>

        </div>
            // <div><p className="lead whiteText">Product Pricing Done Right</p></div>
      )
    // }
  }
});

module.exports = Logo;