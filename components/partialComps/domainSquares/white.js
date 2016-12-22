
var React = require('react');

var DomainWhite = React.createClass({
  render: function(){
  var domain = this.props.domainInfo
    return (
      <div className="col-lg-3 col-md-6 col-xs-6 thumb noPadding grow">
        <a href={domain.href} className="list-group-item" target="_blank" >
          <img className="img-responsive Absolute-Center"  src={domain.src} alt={domain.alt}/>
        </a>
      </div>  
    )
  }
});

module.exports = DomainWhite;