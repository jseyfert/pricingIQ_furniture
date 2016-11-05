
var React = require('react');
var LogoutUser = require('./userLogout.js');

var Footer = React.createClass({
  render: function(){
    return (
      <div>
       <footer className="navbar-fixed-bottom">
        <hr/>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p className="textWhite">&copy; 2016 PricingIQ</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
});

module.exports = Footer;